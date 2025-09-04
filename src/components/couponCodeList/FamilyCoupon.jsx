import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import { applyFamilyCouponCode } from '../../features/cart/cart';
import { Loader } from 'lucide-react';

// Import confetti library - make sure to install: npm install canvas-confetti
// import confetti from 'canvas-confetti';

const FamilyCoupon = memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { couponCodeApplied } = useSelector((state) => state.cart);
  const [isApplied, setIsApplied] = React.useState(false);
  const [appliedCode, setAppliedCode] = React.useState('');

  // Confetti animation function with dynamic import for better performance
  const triggerConfetti = useCallback(async () => {
    try {
      // Dynamic import to reduce initial bundle size
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default;
      
      // Custom confetti with your theme colors
      const colors = ['#7A2E1D', '#9B7A2F', '#6B8E23', '#D87C45'];
      
      // Main confetti burst
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle', 'square'],
        gravity: 0.8,
        drift: 0,
        ticks: 300
      });
      
      // Side bursts for extra celebration
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 200);
    } catch (error) {
      console.warn('Confetti animation failed to load:', error);
    }
  }, []);

  // Optimized submit handler with useCallback to prevent unnecessary re-renders
  const handleCouponCodeSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
    const trimmedCode = values.couponCode?.trim();
    
    if (!trimmedCode) {
      toast.error('Please provide a valid coupon code');
      setSubmitting(false);
      return;
    }

    const payload = { 
      phoneNumber: user?.phoneNumber || '', 
      couponCode: trimmedCode 
    };

    try {
      await dispatch(applyFamilyCouponCode(payload)).unwrap();
      
      // Success actions
      toast.success("🎉 Coupon code successfully applied!");
      setAppliedCode(trimmedCode);
      setIsApplied(true);
      resetForm();
      await triggerConfetti();
      
    } catch (error) {
      toast.error(error || "Coupon code is not valid!");
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, user?.phoneNumber, triggerConfetti]);

  // Function to reset the applied state
  // const handleRemoveCoupon = useCallback(() => {
  //   setIsApplied(false);
  //   setAppliedCode('');
  // }, []);

  // Memoized initial values to prevent unnecessary re-renders
  const initialValues = useMemo(() => ({ couponCode: "" }), []);

  return (
    <div className="w-full max-w-md mx-auto">
      {isApplied || couponCodeApplied.length>0 ? (
        // Success state - show applied message
        <div className="flex items-center justify-between p-4 mb-3 bg-gradient-to-r from-[#6B8E23]/10 to-[#6B8E23]/5 rounded-lg border-2 border-[#6B8E23]/30 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#6B8E23] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#3E2C1B]">
                Coupon Code Applied Successfully!
              </p>
              {/* <p className="text-xs text-[#3E2C1B]/70">
                Code: <span className="font-medium text-[#7A2E1D]">{appliedCode}</span>
              </p> */}
            </div>
          </div>
          {/* <button
            onClick={handleRemoveCoupon}
            className="p-2 text-[#3E2C1B]/60 hover:text-[#7A2E1D] transition-colors duration-200 hover:bg-[#7A2E1D]/10 rounded-full"
            title="Remove coupon"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button> */}
        </div>
      ) : (
        // Form state - show input and apply button
        <Formik
          // ref={formikRef}
          initialValues={initialValues}
          onSubmit={handleCouponCodeSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="flex items-stretch gap-2 p-1 bg-gradient-to-r from-[#F5EFE6] to-[#DCD2C0] rounded-lg shadow-sm border border-[#DCD2C0] transition-all duration-300 hover:shadow-md focus-within:shadow-md focus-within:border-[#9B7A2F] focus-within:bg-gradient-to-r focus-within:from-[#F5EFE6] focus-within:to-[#F5EFE6] mb-3">
                <Field
                  type="text"
                  name="couponCode"
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-3 bg-white border-0 rounded-md text-[#3E2C1B] placeholder-[#3E2C1B]/60 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#9B7A2F]/30 text-sm font-medium shadow-inner"
                  disabled={isSubmitting}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !values.couponCode?.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-[#7A2E1D] to-[#7A2E1D]/90 hover:from-[#7A2E1D]/90 hover:to-[#7A2E1D] text-[#F5EFE6] font-semibold rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] min-w-[80px] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <Loader className="animate-spin w-4 h-4 text-[#F5EFE6]" />
                  ) : (
                    <span className="text-sm">Apply</span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      
      {/* Helpful text - only show when form is visible */}
      {/* {!isApplied && (
        <div className="mt-3 text-center">
          <p className="text-xs text-[#3E2C1B]/70 font-medium">
            Enter your coupon code to save on your order
          </p>
        </div>
      )} */}
    </div>
  );
});


export default FamilyCoupon;
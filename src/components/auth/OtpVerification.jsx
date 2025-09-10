import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import { verifyOTP } from '../../features/auth/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

// const Button = ({ children, onClick, type = 'button', disabled = false, className = '' }) => (
//   <motion.button
//     type={type}
//     onClick={onClick}
//     disabled={disabled}
//     className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 ${className}`}
//     whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
//     whileTap={{ scale: 0.98 }}
//   >
//     {children}
//   </motion.button>
// );


const OtpInput = ({ otpInputs, handleOtpChange, handleOtpKeyDown, handleOtpPaste }) => (
    <div className="flex justify-center gap-3 mb-3">
        {Array(4).fill(0).map((_, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
            >
                <input
                    ref={otpInputs[index]}
                    type="text"
                    maxLength={1}
                    className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] shadow-sm"
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    onPaste={index === 0 ? handleOtpPaste : null}
                    inputMode="numeric"
                />
            </motion.div>
        ))}
    </div>
);



const  OtpVerification = ({isCheckout=false,phoneNumber,showOtpInput,getDataAfterLogin}) => {

    const dispatch=useDispatch()
    const otpInputs = Array(4).fill(0).map(() => useRef(null));

   const handleOtpChange = (index, value) => {
      if (value.length === 1) {
        // Store the value in the current input
        otpInputs[index].current.value = value;
  
        if (index < 3) {
          // Move to next input if not the last one
          otpInputs[index + 1].current.focus();
        } else if (index === 3) {
          // If it's the last digit, collect the full OTP and verify
          const otpValue = otpInputs.map(input => input.current.value).join('');
          if (otpValue.length === 4) {
            const payload = {
              phoneNumber: phoneNumber,
              otp: otpValue
            }
            dispatch(verifyOTP(payload))
              .then((value) => {
                if (value.meta.requestStatus === "fulfilled") {
                  const token = value.payload.accessToken;
                  if (token) {
                    getDataAfterLogin();
                  }
                } else {
                  toast.error(value.payload);
                }
              }
              );
          }
        }
      }
    };

      const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && otpInputs[index].current.value === '') {
          otpInputs[index - 1].current.focus();
        }
      };

      const handleOtpPaste = (e) => {
        e.preventDefault();
        const otp = e.clipboardData.getData('text');
        
        // Check if pasted data is exactly 4 digits
        if (otp.length === 4 && /^\d+$/.test(otp)) {
          // Fill all inputs with the pasted digits
          for (let i = 0; i < 4; i++) {
            otpInputs[i].current.value = otp[i];
          }
          
          const payload = {
            phoneNumber,
            otp
          }
          dispatch(verifyOTP(payload))
            .then((value) => {
              if (value.meta.requestStatus === "fulfilled") {
                const token = value.payload.accessToken;
                if (token) {
                  getDataAfterLogin();
                }
              } else {
                toast.error(value.payload);
              }
            }
            );

        }
      };


      useEffect(() => {
        // Focus first OTP input when OTP inputs appear
        if (showOtpInput && otpInputs[0]?.current) {
          setTimeout(() => {
            otpInputs[0].current.focus();
          }, 300); // Short delay to ensure component is fully rendered
        }
      }, [showOtpInput]);

    return (
        <motion.div
            className="mb-6"
            variants={slideUp}
            initial="hidden"
            animate="visible"
        >
            <h3 className={`font-medium mb-3 text-lg ${isCheckout && 'text-gray-400 text-center text-[var(--text-color)]'}`}>Enter OTP sent to your phone</h3>
            <OtpInput
                otpInputs={otpInputs}
                handleOtpChange={handleOtpChange}
                handleOtpKeyDown={handleOtpKeyDown}
                handleOtpPaste={handleOtpPaste}
            />
            <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
            >
                {/* <Button onClick={handleOtpSubmit}>
                    Verify OTP
                </Button> */}
                <motion.p
                    className="text-sm text-gray-500 mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                >
                    Didn't receive the code? <motion.button
                        className="text-[var(--text-color)] font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Resend</motion.button>
                </motion.p>
            </motion.div>
        </motion.div>
    )
}

export default OtpVerification;

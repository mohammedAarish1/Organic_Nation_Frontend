import React, { useState, useEffect } from 'react';

const ResendOTP = ({ phoneNumber, handleResendOTP }) => {
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleResend = () => {
        handleResendOTP()
        // Add resend logic here
        setTimeLeft(30);
    };


    if (!phoneNumber) return null;

    return (

        <div className="text-sm text-slate-500 text-center">
            {timeLeft > 0 ? (
                `Resend available in ${timeLeft} seconds`
            ) : (
                <>
                    Didn't receive code?{' '}
                    <button type='submit' onClick={handleResend} className="font-medium text-indigo-500 hover:text-indigo-600">
                        Resend
                    </button>
                </>
            )}
        </div>
    );
};

export default ResendOTP;
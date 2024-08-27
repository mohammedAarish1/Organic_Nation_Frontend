import React, { useEffect, useRef, useState } from 'react';

const OtpInput = ({ length = 6, handleOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleOnChange = (index, e) => {
        const value = e.target.value;

        if (!value.match(/^[0-9]*$/)) return;  // Ensure only numeric input

        const newOtp = [...otp];
        if (value.length > 1) {
            // Handle paste
            value.split('').forEach((char, i) => {
                if (index + i < length) {
                    newOtp[index + i] = char;
                }
            });
            setOtp(newOtp);

            const nextIndex = index + value.length >= length ? length - 1 : index + value.length - 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        } else {
            // Handle single input
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }

        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) {
            handleOtpSubmit(combinedOtp);
        }
    };

    const handleOnKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();

            const newOtp = [...otp];
            if (otp[index] !== '') {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOnPaste = (index, e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, length - index).split('');
        const newOtp = [...otp];

        pasteData.forEach((char, i) => {
            if (index + i < length) {
                newOtp[index + i] = char;
            }
        });
        setOtp(newOtp);

        if (inputRefs.current[index + pasteData.length - 1]) {
            inputRefs.current[index + pasteData.length - 1].focus();
        }

        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) {
            handleOtpSubmit(combinedOtp);
        }
    };

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <form className='flex gap-4' onSubmit={(e) => e.preventDefault()}>
            {otp.map((value, index) => (
                <input
                    key={index}
                    type='text'
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => handleOnChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(index, e)}
                    onPaste={(e) => handleOnPaste(index, e)}
                    // autoComplete="one-time-code"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    inputmode="numeric"
                    name={`otp-${index}`}
                    maxLength="1"
                    className='w-10 h-10 text-center rounded-md bg-[var(--bgColorSecondary)] text-[#712522]'
                />
            ))}
        </form>
    );
};

export default OtpInput;

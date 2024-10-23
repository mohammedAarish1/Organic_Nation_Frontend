// import React, { useEffect, useRef, useState } from 'react';

// const OtpInput = ({ length = 6, handleOtpSubmit = () => { } }) => {
//     const [otp, setOtp] = useState(new Array(length).fill(''));
//     const inputRefs = useRef([]);

//     const handleOnChange = (index, e) => {
//         const value = e.target.value;

//         if (!value.match(/^[0-9]*$/)) return;  // Ensure only numeric input

//         const newOtp = [...otp];
//         if (value.length > 1) {
//             // Handle paste
//             value.split('').forEach((char, i) => {
//                 if (index + i < length) {
//                     newOtp[index + i] = char;
//                 }
//             });
//             setOtp(newOtp);

//             const nextIndex = index + value.length >= length ? length - 1 : index + value.length - 1;
//             if (inputRefs.current[nextIndex]) {
//                 inputRefs.current[nextIndex].focus();
//             }
//         } else {
//             // Handle single input
//             newOtp[index] = value;
//             setOtp(newOtp);

//             if (value && index < length - 1 && inputRefs.current[index + 1]) {
//                 inputRefs.current[index + 1].focus();
//             }
//         }

//         const combinedOtp = newOtp.join('');
//         if (combinedOtp.length === length) {
//             handleOtpSubmit(combinedOtp);
//         }
//     };

//     const handleOnKeyDown = (index, e) => {
//         if (e.key === 'Backspace') {
//             e.preventDefault();

//             const newOtp = [...otp];
//             if (otp[index] !== '') {
//                 newOtp[index] = '';
//                 setOtp(newOtp);
//             } else if (index > 0) {
//                 inputRefs.current[index - 1].focus();
//             }
//         }
//     };

//     const handleOnPaste = (index, e) => {
//         e.preventDefault();
//         const pasteData = e.clipboardData.getData('text').slice(0, length - index).split('');
//         const newOtp = [...otp];

//         pasteData.forEach((char, i) => {
//             if (index + i < length) {
//                 newOtp[index + i] = char;
//             }
//         });
//         setOtp(newOtp);

//         if (inputRefs.current[index + pasteData.length - 1]) {
//             inputRefs.current[index + pasteData.length - 1].focus();
//         }

//         const combinedOtp = newOtp.join('');
//         if (combinedOtp.length === length) {
//             handleOtpSubmit(combinedOtp);
//         }
//     };

//     useEffect(() => {
//         if (inputRefs.current[0]) {
//             inputRefs.current[0].focus();
//         }
//     }, []);

//     return (
//         <form className='flex xs:justify-start justify-between gap-4' onSubmit={(e) => e.preventDefault()}>
//             {otp.map((value, index) => (
//                 <input
//                     key={index}
//                     type='text'
//                     ref={(input) => (inputRefs.current[index] = input)}
//                     value={value}
//                     onChange={(e) => handleOnChange(index, e)}
//                     onKeyDown={(e) => handleOnKeyDown(index, e)}
//                     onPaste={(e) => handleOnPaste(index, e)}
//                     // autoComplete="one-time-code"
//                     autoComplete={index === 0 ? "one-time-code" : "off"}
//                     inputMode="numeric"
//                     name={`otp-${index}`}
//                     maxLength="1"
//                     className='xs:w-10 xs:h-10 w-7 h-7 text-center rounded-md bg-[var(--bgColorSecondary)] text-[#712522]'
//                 />
//             ))}
//         </form>
//     );
// };

// export default OtpInput;



import React, { useEffect, useRef, useState } from 'react';

const OtpInput = ({ length = 6, handleOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);
    const formRef = useRef(null);

    // Handle OTP auto-fill
    useEffect(() => {
        const handleInput = (e) => {
            const input = e.target;
            if (input.value.length === length) {
                const otpArray = input.value.split('');
                setOtp(otpArray);
                handleOtpSubmit(input.value);
            }
        };

        // Add event listener to the first input
        if (inputRefs.current[0]) {
            inputRefs.current[0].addEventListener('input', handleInput);
        }

        return () => {
            if (inputRefs.current[0]) {
                inputRefs.current[0].removeEventListener('input', handleInput);
            }
        };
    }, [length, handleOtpSubmit]);

    const handleOnChange = (index, e) => {
        const value = e.target.value;
        
        if (!value.match(/^[0-9]*$/)) return;

        const newOtp = [...otp];
        if (value.length > 1) {
            // Handle paste
            const otpArray = value.slice(0, length).split('');
            const updatedOtp = [...otp];
            otpArray.forEach((char, i) => {
                if (index + i < length) {
                    updatedOtp[index + i] = char;
                }
            });
            setOtp(updatedOtp);

            const nextIndex = Math.min(index + value.length, length - 1);
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
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleOnPaste = (index, e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, length - index).split('');
        const newOtp = [...otp];

        pasteData.forEach((char, i) => {
            if (index + i < length && char.match(/^[0-9]$/)) {
                newOtp[index + i] = char;
            }
        });
        setOtp(newOtp);

        const lastIndex = Math.min(index + pasteData.length - 1, length - 1);
        if (inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
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
        <form 
            ref={formRef}
            className="flex xs:justify-start justify-between gap-4" 
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
        >
            {otp.map((value, index) => (
                <input
                    key={index}
                    type={index === 0 ? "text" : "number"}
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => handleOnChange(index, e)}
                    onKeyDown={(e) => handleOnKeyDown(index, e)}
                    onPaste={(e) => handleOnPaste(index, e)}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={index === 0 ? length : 1}
                    aria-label={`OTP digit ${index + 1}`}
                    name={index === 0 ? "otp" : `otp-${index}`}
                    className="xs:w-10 xs:h-10 w-10 h-10 text-center rounded-md bg-[var(--bgColorSecondary)] text-[#712522]"
                    // style={{
                    //     WebkitTextSecurity: index === 0 ? "none" : "disc"
                    // }}
                />
            ))}
        </form>
    );
};

export default OtpInput;

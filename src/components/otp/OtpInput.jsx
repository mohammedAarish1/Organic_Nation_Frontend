import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ length = 6, handleOtpSubmit = () => { } }) => {

    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleOnChange = (index, e) => {
        const value = e.target.value;

        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // automatically move to next input field
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

        // trigger handleOtpSubmit function
        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === length) {
            handleOtpSubmit(combinedOtp);
        }
    };

    // below code is optional, it consist of more validation like if one of the input field is empty or not
    // const handleOnClick = (index) => {
    //     if (index > 0 && !otp[index - 1]) {
    //         inputRefs.current[otp.indexOf('')].focus();
    //     }
    // };

    // for deleting the input field values using backspace
    const handleOnKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };


    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])

    return (
        <div className='flex gap-4'>
            {otp.map((value, index) => (
                <input
                    key={index}
                    type='text'
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => handleOnChange(index, e)}
                    // onClick={() => handleOnClick(index)}
                    onKeyDown={(e) => handleOnKeyDown(index, e)}
                    className='w-10 h-10 text-center rounded-md bg-[var(--bgColorSecondary)] text-[#712522]'
                />
            ))}
        </div>
    )
}

export default OtpInput

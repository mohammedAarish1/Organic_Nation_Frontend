// import React, { useEffect, useState } from 'react';

// const Maintanence = () => {
//   // Set your launch date here (25th May 2025, midnight)
//   const launchDate = new Date(2025, 4, 9, 0, 0, 0); // Note: Months are 0-indexed in JavaScript

//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   });

//   useEffect(() => {
//     const calculateTimeLeft = () => {
//       const difference = launchDate - new Date();
//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         });
//       }
//     };

//     calculateTimeLeft();
//     const timer = setInterval(calculateTimeLeft, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-4">
//       <div className="bg-white p-8 md:p-4 rounded-xl shadow-xl max-w-4xl w-full mx-4">
//         <div className="text-center">
//           {/* Company Logo */}
//           <div className="mb-6">
//             <img src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp" alt="Company Logo" className="mx-auto mb-4 w-32" />
//           </div>

//           <div className="mb-6">
//             <h1 className="text-4xl md:text-5xl font-bold text-[var(--themeColor)] mb-4">Exciting Updates in Progress!</h1>
//             <p className="text-lg md:text-xl text-gray-600">
//               New product designs launching soon. We're enhancing our look to serve you better.
//             </p>
//           </div>

//           {/* Countdown Timer */}
//           <div className="my-8">
//             <h2 className="text-2xl font-semibold text-gray-700 mb-6">New Designs Launching In:</h2>
//             <div className="flex justify-center gap-4 md:gap-6">
//               <div className="bg-indigo-50 rounded-lg p-3 md:p-4 w-16 md:w-20">
//                 <div className="text-2xl md:text-3xl font-bold text-[var(--themeColor)]">{timeLeft.days}</div>
//                 <div className="text-xs md:text-sm text-gray-500 font-medium">Days</div>
//               </div>
//               <div className="bg-indigo-50 rounded-lg p-3 md:p-4 w-16 md:w-20">
//                 <div className="text-2xl md:text-3xl font-bold text-[var(--themeColor)]">{timeLeft.hours}</div>
//                 <div className="text-xs md:text-sm text-gray-500 font-medium">Hours</div>
//               </div>
//               <div className="bg-indigo-50 rounded-lg p-3 md:p-4 w-16 md:w-20">
//                 <div className="text-2xl md:text-3xl font-bold text-[var(--themeColor)]">{timeLeft.minutes}</div>
//                 <div className="text-xs md:text-sm text-gray-500 font-medium">Minutes</div>
//               </div>
//               <div className="bg-indigo-50 rounded-lg p-3 md:p-4 w-16 md:w-20">
//                 <div className="text-2xl md:text-3xl font-bold text-[var(--themeColor)]">{timeLeft.seconds}</div>
//                 <div className="text-xs md:text-sm text-gray-500 font-medium">Seconds</div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 space-y-4">
//             {/* <p className="text-gray-600">All features will remain available during this transition.</p> */}
//             <div className="animate-pulse">
//               <span className="inline-block bg-[var(--themeColor)] text-white font-medium py-3 px-6 rounded-full">
//                 Stay Tuned!
//               </span>
//             </div>
//           </div>

//           <div className="mt-10 border-t border-gray-200 pt-6">
//             <p className="text-sm text-gray-500">
//               Questions? Contact our customer support.
//             </p>
//             <p className="text-center">
//               <span className="font-semibold">Phone:</span> <a href="tel:+919999532041" className="underline underline-offset-2">9999532041</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Maintanence;

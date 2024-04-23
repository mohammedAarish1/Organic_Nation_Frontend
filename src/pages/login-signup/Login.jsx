import React, { useState } from 'react';
import Logo from '../../components/logo/Logo';

const Login = () => {
  const [user, setUser] = useState(true);
  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0'>
      <div className='lg:w-[80%] h-auto py-2 bg-opacity-35 mx-auto'>
      <h2 className="text-4xl text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] ">Welcome Back !</h2>
        <div className='md:w-[90%] py-10  flex sm:flex-row flex-col shadow-xl shadow-black justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] '>
          {/* right side  */}
          <div className='sm:w-[40%] mt-3 sm:mt-0 flex justify-center items-center'>
            <div className='flex justify-center items-center sm:flex-col gap-3 '>
              <div>
                <Logo />
              </div>
              <div className='flex flex-col justify-center items-center'>
                <span className='sm:text-2xl uppercase text-[var(--bgColorSecondary)]'>Login to</span>
                <span className='sm;text-2xl uppercase text-[var(--bgColorSecondary)]'>Organic Nation</span>
              </div>
            </div>
          </div>
          {/* left side  */}
          <div className='sm:w-[60%]'>
            <div className="sm:w-[80%]  mx-auto">

              <h2 className='px-8 text-[var(--bgColorSecondary)] mb-2  text-2xl'>{!user ? "Sign up" : "Log in"}</h2>
              {!user ? (
                <p className='px-8 text-gray-400'>Already have an account ? <span className='text-white hover:border-b-2 cursor-pointer' onClick={() => setUser(true)}>Log in</span></p>
              ) : (
                <p className='px-8 text-gray-400'>Don't have an account ? <span className='text-white hover:border-b-2 cursor-pointer' onClick={() => setUser(false)}>Sign up</span></p>
              )}

              <form onSubmit="" className="  rounded px-8 pt-6 pb-2 mb-4">
                {/* name input  */}
                {!user && (
                  <div className="mb-4">
                    <label className="block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Enter your Name"
                      // value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Email input  */}
                <div className="mb-4">
                  <label className="block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* password input  */}
                <div className="mb-6">
                  <label className="block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className='text-end text-[var(--bgColorSecondary)] text-[11px] hover:underline cursor-pointer'>Forgot Password</p>
                </div>
                {/* confirm password input  */}
                {!user && (
                  <div className="mb-6">
                    <label className="block text-[var(--bgColorSecondary)] text-sm font-bold mb-2" htmlFor="cPassword">
                      Confirm Password
                    </label>
                    <input
                      className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="cPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <button
                    className="bg-[var(--bgColorSecondary)] hover:bg-green-700 hover:text-white text-[var(--bgColorPrimary)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    {!user ? "Sign up" : "Log in"}
                  </button>
                </div>
              </form>
              {/* horizontal line */}
              <div className='flex justify-center gap-4 items-center mb-4'>
                <div className='h-1 md:w-[40%] xs:w-[20%] w-[30%] bg-gradient-to-r from-[#6D613B] to-[#D3BB71]'></div>
                <span className='text-[var(--bgColorSecondary)]'>or</span>
                <div className='h-1 md:w-[40%] xs:w-[20%] w-[30%] bg-gradient-to-r from-[#D3BB71] to-[#6D613B]'></div>
              </div>
              {/* other login options */}

              <div className='flex flex-col px-8 gap-3'>
                {/* google  */}
                <div className='flex justify-center items-center gap-3 py-1 border text-[var(--bgColorSecondary)]'>
                  <img src="images/logo/google.png" alt="google-Logo" className='w-7' />
                  <a href="#" className=''>Continue with Google</a>
                </div>
                {/* facebook  */}
                <div className='flex justify-center items-center gap-2 py-1 border bg-[var(--bgColorSecondary)] text-[var(--bgColorPrimary)]'>
                  <img src="images/logo/facebook.png" alt="google-Logo" className='w-7' />
                  <a href="#" className=''>Continue with Facebook</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

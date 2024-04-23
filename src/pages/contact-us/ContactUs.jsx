import React from 'react';
// react icons 
import Logo from '../../components/logo/Logo';
import { HiBuildingOffice2 } from "react-icons/hi2";
import { BiSolidPhoneCall } from "react-icons/bi";
import { GrLinkedin } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagramSquare } from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className='xs:px-10 px-2 pb-20 mt-5 sm:mt-0'>

      <div className='lg:w-[90%] h-auto py-2 bg-opacity-35 mx-auto'>
        <h2 className="text-4xl text-center sm:mt-6 mt-10 sm:mb-2 mb-6 text-[var(--bgColorPrimary)] ">Contact us</h2>
        <div className='md:w-[95%] pb-16 pt-16 flex sm:gap-0 gap-20 sm:flex-row flex-col  justify-center h-[100%] mx-auto  my-auto bg-[var(--bgColorPrimary)] '>

          {/* right side  */}
          <div className='sm:w-[40%] mt-3 sm:mt-0  '>
            <div className='flex flex-col gap-5 text-gray-400  text-sm justify-center h-full items-center '>
              <Logo />
              <h2 className="text-lg font-semibold ">Company Information</h2>
              <HiBuildingOffice2 className='text-5xl' />
              <p className='text-center w-[90%]'><span className='font-semibold'>Work Address:</span> M/s Earthy Foods Private Limited Bailparao,
                Ramnagar Road, Nainital, Uttarakhand-263159</p>
              <BiSolidPhoneCall className='text-5xl animate-pulse' />
              <p><span className='font-semibold'>Phone</span> +91-9999532041 (For Bulk Queries)</p>
              <p><span className='font-semibold'>Email:</span> info@earthyfoods.net</p>
              {/* follow us  */}
              <div className='flex justify-center items-center gap-3'>
                <h2>Follow us on:</h2>
                <a href=" https://www.linkedin.com/company/earthyfoods-pvt-ltd" target='_blank'><GrLinkedin className='text-[30px] hover:text-[var(--bgColorSecondary)]' /></a>
                <a href="https://twitter.com/organicnation_" target='_blank'><FaSquareXTwitter className='text-[33px] hover:text-[var(--bgColorSecondary)]' /></a>
                <a href="https://www.facebook.com/organicnation/" target='_blank'><ImFacebook2 className='text-[29px] hover:text-[var(--bgColorSecondary)]' /></a>
                <a href="https://www.instagram.com/organicnationadmin/" target='_blank'><FaInstagramSquare className='text-[33px] hover:text-[var(--bgColorSecondary)]' /></a>

              </div>
            </div>


          </div>

          {/* left side  */}
          <div className='sm:w-[60%] '>
            <div className="sm:w-[90%]  mx-auto">

              <h2 className='px-8 text-[var(--bgColorSecondary)] mb-2  text-2xl'><span className=''>Have Questions ?</span> Get in touch with us today</h2>
              <p className='px-8 text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum, sequi. </p>

              <form onSubmit="" className="  rounded px-8 pt-6 pb-2 mb-4">
                {/* name input  */}
                <div className="mb-4">
                  <label className="block text-[var(--bgColorSecondary)] uppercase text-sm font- mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className="shadow appearance-none border bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Email input  */}
                <div className="mb-4">
                  <label className="block text-[var(--bgColorSecondary)] uppercase text-sm  mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* phone no. input  */}
                <div className="mb-4">
                  <label className="block text-[var(--bgColorSecondary)] uppercase text-sm  mb-2" htmlFor="phone">
                    Phone No.
                  </label>
                  <input
                    className="shadow appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="phone"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {/* message input  */}
                <div className="mb-4">
                  <label className="block text-[var(--bgColorSecondary)] uppercase text-sm  mb-2" htmlFor="phone">
                    Your Message
                  </label>
                  <textarea name="message" id="message" cols="30" rows="10" className='appearance-none border  bg-[var(--bgColorSecondary)] w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></textarea>
                </div>
                {/* captcha */}
                <div className=' flex justify-end' >
                <div  className='xs:w-[80%] w-full flex  justify-between xs:py-5 py-2 xs:px-4 px-2 text-sm bg-[var(--bgColorSecondary)] '>
                  <div className='flex gap-2 justify-center items-center'>
                    <input type="checkbox" className='' />
                    <p>I'm not a robot</p>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <img src="images/captcha.png" alt="captcha image" className='w-9' />
                    <span>re-Captcha</span>
                  </div>
                </div>
                </div>
                {/* submit button  */}
                <div className="flex items-center justify-end mt-6">
                  <button
                    className="bg-[var(--bgColorSecondary)] w-full hover:bg-green-700 hover:text-white text-[var(--bgColorPrimary)] font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

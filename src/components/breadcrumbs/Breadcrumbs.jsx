import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineHome } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";


const Breadcrumbs = () => {

    const { pathname } = useLocation();

    // from below code we are getting the array that excludes empty string ('') and id's (which is non numeric value)
    const pathSegments = pathname.split('/').filter(segment => segment !== ''); // Remove empty segments

    const pathNames = pathSegments.map(segment => {
        const num = parseInt(segment);
        return isNaN(num) ? segment : null; // Return null for non-numeric segments
    }).filter(Boolean); // Filter out null values
    let breadcrumbPath = '';



    return (
        <div className={`${pathNames.length > 0 && 'pt-8 pb-2'}  max-w-max sm:px-10 px-2`}>
            <div className='flex  items-center justify-center'>

                {pathNames.length > 0 && (<Link to='/'><MdOutlineHome className='text-[var(--themeColor)] text-xl' /></Link>)}

                {pathNames.map((path, index) => {
                    breadcrumbPath += `/${path}`;
                    const isLast = index === pathNames.length - 1;


                    return isLast ? <span key={breadcrumbPath} className='flex justify-center text-xs xs:text-sm items-center capitalize text-gray-400 '> <FaAngleRight /> {path}</span> :
                        <Link to={breadcrumbPath} key={breadcrumbPath} ><span className='flex  items-center capitalize hover:underline underline-offset-4'><FaAngleRight /> {path}</span></Link>
                })}
            </div>
        </div>
    )
}

export default Breadcrumbs;

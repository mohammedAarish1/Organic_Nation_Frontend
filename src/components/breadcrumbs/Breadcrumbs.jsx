import React, { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';

const Breadcrumbs = () => {

    const { pathname } = useLocation();



    // Function to check if the current path should hide breadcrumbs
    const shouldHideBreadcrumbs = (path) => {
        // Array of path patterns where breadcrumbs should be hidden
        const hiddenPathPatterns = [
            '/shop/all/[\\w-]+', , // Dynamic product pages, e.g., /product/123
        ];

        // Check if the current path matches any of the hidden patterns
        return hiddenPathPatterns.some(pattern =>
            new RegExp(pattern).test(path)
        );
    };

    // If the current pathname matches a hidden pattern, don't render anything
    if (shouldHideBreadcrumbs(pathname)) {
        return null;
    }

    // from below code we are getting the array that excludes empty string ('') and id's (which is non numeric value)
    const pathSegments = pathname.split('/').filter(segment => segment !== ''); // Remove empty segments

    const pathNames = pathSegments.map(segment => {
        const num = parseInt(segment);
        return isNaN(num) ? segment : null; // Return null for non-numeric segments
    }).filter(Boolean); // Filter out null values
    let breadcrumbPath = '';

    return (
        <div className='bg-[var(--background-color)] '>
            <div className={`${pathNames.length > 0 && 'pt-8 pb-2'}  max-w-7xl mx-auto sm:px-10 px-2 text-sm text-[#3E2C1B]`}>
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className=''
                >

                    {pathNames.length > 0 && (<Link to='/'>Home</Link>)}

                    {pathNames.map((path, index) => {
                        breadcrumbPath += `/${path}`;
                        const isLast = index === pathNames.length - 1;
                        if (path === 'shop') {
                            return (<Link key={breadcrumbPath} to={breadcrumbPath} className='text-[var(--themeColor)] text-xl' ></Link>)
                        }

                        return isLast ? <span key={breadcrumbPath} className='text-sm capitalize font-semibold text-[var(--themeColor)] '>  <span className="mx-2">/</span> {path.replaceAll('-',' ')}</span> :
                            <Link to={breadcrumbPath} key={breadcrumbPath} ><span className=' capitalize hover:underline underline-offset-4'>  <span className="mx-2">/</span> {path}</span></Link>
                    })}
                </motion.nav>
            </div>
        </div>
    )
}

export default memo(Breadcrumbs);

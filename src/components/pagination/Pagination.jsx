import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setPrev, setNext } from '../../features/pagination/pagination';
// react icons 
import { AiOutlineBackward, AiOutlineForward } from "react-icons/ai";

const Pagination = ({ totalPost, postPerPage }) => {

    const { currentPage } = useSelector((state) => state.pagination)

    const dispatch = useDispatch()
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i)
    }
    return (
        <div className='flex justify-center flex-wrap xs:gap-2'>

            <button
                className=' px-3 py-1 border'
                onClick={() => {
                    dispatch(setPrev({ currentPage, totalPages: pages.length }))
                    window.scrollTo(0, 0);
                }}
            >
                <AiOutlineBackward />
            </button>

            {/* number buttons  */}
            {pages.map((pageNo, index) => {
                return <button
                    className={`hover:bg-[var(--themeColor)] hover:text-white px-3 py-1 border rounded-lg ${currentPage == pageNo ? "bg-[var(--themeColor)] text-white" : ""} `}
                    onClick={() => {
                        dispatch(setCurrentPage(pageNo));
                        window.scrollTo(0, 0);
                    }}
                    key={index}
                >
                    {pageNo}
                </button>
            })}
            {/* number buttons end */}

            <button
                className=' px-3 py-1 border'
                onClick={() => {
                    dispatch(setNext({ currentPage, totalPages: pages.length }))
                    window.scrollTo(0, 0);
                }}
            >
                <AiOutlineForward />
            </button>

        </div>
    )
}

export default Pagination;

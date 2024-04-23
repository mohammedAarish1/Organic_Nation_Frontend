import React from 'react'
import { BsFillGridFill, BsList } from "react-icons/bs";

const SortSection = ({setGridView,gridView}) => {
  return (
    <div className=' py-1'>
      <div className='flex gap-2'>
        <button className={`${gridView ? "bg-gray-400 p-2 ":"bg-[var(--bgColorPrimary)] text-white p-2"}`} onClick={()=>setGridView(false)}><BsFillGridFill className='' /></button>
        <button className={`${gridView ? "bg-[var(--bgColorPrimary)] text-white p-2 ":"bg-gray-400 p-2 "}`} onClick={()=>setGridView(true)}><BsList className="" /></button>
      </div>
    </div>
  )
}

export default SortSection

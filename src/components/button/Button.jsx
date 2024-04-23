import React from 'react'
import './Style.css';

const Button = ({title}) => {
  return (
    <a className='btn' href="#">
        <span></span><span></span>
        <span></span><span></span>
        {title }
    </a>
  )
}

export default Button;

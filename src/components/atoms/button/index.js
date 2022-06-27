import React from 'react';

const Button = ({title, ...rest}) => {
  return (
    <>
      <button className='btn btn-info text-white px-5' {...rest}>{title}</button>
    </>
  )
}

export default Button;

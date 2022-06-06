import React from 'react';
import './input.scss';

const Input = ({label, ...rest}) => {
  return (
    <div>
      <p className='form-label'>{label}</p>
      <input className='form-control' {...rest} />
    </div>
  )
}

export default Input

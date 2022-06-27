import React from 'react';

const Input = ({label, ...rest}) => {
  return (
    <div className='mb-1'>
      <label for={label} className='form-label'>{label}</label>
      <input id={label} className='form-control' required {...rest} />
    </div>
  )
}

export default Input;

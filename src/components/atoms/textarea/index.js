import React from 'react';

const TextArea = ({label, ...rest}) => {
  return (
    <div>
      <label for={label} className='form-label'>{label}</label>
      <textarea id={label} className='form-control' required style={{height: '150px'}} {...rest}></textarea>
    </div>
  )
}

export default TextArea;

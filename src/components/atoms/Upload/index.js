import React from 'react';
import './upload.scss';

const Upload = ({img, ...rest}) => {
  return (
    <div className='upload mb-2'>
        <label for="uploadFile" class="form-label">Upload Image</label>
        <input type='file' id='uploadFile' className='form-control' {...rest} />
        {img && <img className='preview' src={img} alt='preview' />}
    </div>
  )
}

export default Upload;

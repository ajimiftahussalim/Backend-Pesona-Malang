import React from 'react';
import { Gap } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { saveToAPI, setForm, setImgPreview } from '../../config/redux/action';
import { withRouter, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './createTour.scss';

const CreateTour = () => {
  let history = useHistory();
  const backIcon = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const {form, imgPreview} = useSelector(state => state.tourReducer);
  const dispatch = useDispatch();

  const onSubmitData = (e) => {
      e.preventDefault();
      saveToAPI(form);
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm('image', file))
    dispatch(setImgPreview(URL.createObjectURL(file)))
  }

  return (
    <div>
      <Gap height={120} />
      <div className='container d-flex justify-content-end mt-0'>
        <button className='btn btn-none p-2 px-3 text-muted fs-3' onClick={history.goBack}>{backIcon}</button>
      </div>
      <form onSubmit={onSubmitData} className='container card p-5 mt-2'>
        <h2 tabIndex={0} className='fs-2 mx-auto text-info text-center'>Form Create New Tour</h2>
        <div className='row mt-4'>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='name'>Name</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='name'
              onChange={(e) => dispatch(setForm('name', e.target.value))}
              required
            />
          </div>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='category'>Category</label>
            <select 
              id='category' 
              name='category' 
              className='form-select mt-2' 
              onChange={(e) => dispatch(setForm('category', e.target.value))} 
            >
              <option selected>Select Category</option>
              <option value='Wisata Alam'>Wisata Alam</option>
              <option value='Wisata Pantai'>Wisata Pantai</option>
              <option value='Wisata Rekreasi / Buatan'>Wisata Rekreasi / Buatan</option>
              <option value='Desa / Kampung Wisata'>Desa / Kampung Wisata</option>
              <option value='Wisata Budaya dan Sejarah'>Wisata Budaya dan Sejarah</option>
              <option value='Wisata Edukasi'>Wisata Edukasi</option>
            </select>
          </div>
        </div>
        <div className='form-group mb-2'>
          <label tabIndex={0} for='address'>Address</label>
          <input 
            type='text' 
            className='form-control mt-2' 
            id='address' 
            onChange={(e) => dispatch(setForm('address', e.target.value))}
            required
          />
        </div>
        <div className='row'>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='operationalHour'>Operational Hour</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='operationalHour' 
              onChange={(e) => dispatch(setForm('operationalHour', e.target.value))}
              required
            />
          </div>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='ticket'>Ticket</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='ticket' 
              onChange={(e) => dispatch(setForm('ticket', e.target.value))}
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='latitude'>Latitude</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='latitude' 
              onChange={(e) => dispatch(setForm('lat', e.target.value))}
              required
            />
          </div>
          <div className='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='longitude'>Longitude</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='longitude' 
              onChange={(e) => dispatch(setForm('long', e.target.value))}
              required
            />
          </div>
          <div className='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='rating'>Rating</label>
            <select id='rating' 
              nameName='rating' 
              className='form-select mt-2' 
              onChange={(e) => dispatch(setForm('rating', e.target.value))} 
            >
              <option selected>Select Rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
        <div className='form-group mb-2'>
          <div className='upload mb-2'>
            <label tabIndex={0} for='uploadFile' class='form-label'>Upload Image</label>
            <input type='file' id='uploadFile' className='form-control' onChange={(e) => onImageUpload(e)} required />
            {imgPreview && <img className='preview' src={imgPreview} alt='preview' />}
          </div>
        </div>
        <div className='form-group mb-2'>
          <label tabIndex={0} for='description'>Description</label>
          <textarea 
            className='form-control mt-2' 
            id='description' 
            style={{height: '150px'}}
            onChange={(e) => dispatch(setForm('description', e.target.value))}
            required
          >
          </textarea>
        </div>
        <button type='submit' className='btn btn-info text-white mt-2 py-2 fs-5'>Create</button>
      </form>
      <Gap height={20} />
    </div>
  )
}

export default withRouter(CreateTour);

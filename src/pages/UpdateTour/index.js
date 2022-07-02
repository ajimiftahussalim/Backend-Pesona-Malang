import React, { useEffect } from 'react';
import { Gap } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setForm, setImgPreview, updateToAPI } from '../../config/redux/action';
import { withRouter, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import './updateTour.scss';

const UpdateTour = (props) => {
  let history = useHistory();
  const backIcon = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const {form, imgPreview} = useSelector(state => state.tourReducer);
  const {name, category, address, operationalHour, ticket, description, lat, long, rating} = form;
  const dispatch = useDispatch();

  useEffect(() => {
    const id = props.match.params.id;
    if(id) {
      Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
      .then(res => {
        const data = res.data.data;
        dispatch(setForm('name', data.name));
        dispatch(setForm('category', data.category));
        dispatch(setForm('address', data.address));
        dispatch(setForm('operationalHour', data.operationalHour));
        dispatch(setForm('ticket', data.ticket));
        dispatch(setForm('description', data.description));
        dispatch(setForm('lat', data.lat));
        dispatch(setForm('long', data.long));
        dispatch(setForm('rating', data.rating));
        dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
      })
      .catch(err => {
        console.log('error:', err);
      })
    }
  }, [dispatch, props]);

  const onSubmitData = (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    updateToAPI(form, id);
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
        <h2 tabIndex={0} className='fs-2 mx-auto text-info'>Form Update Tour</h2>
        <div className='row mt-4'>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='name'>Name</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='name' 
              value={name} 
              onChange={(e) => dispatch(setForm('name', e.target.value))}
            />
          </div>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='category'>Category</label>
            <input
              type='text'
              id='category' 
              className='form-control mt-2' 
              value={category} 
              onChange={(e) => dispatch(setForm('category', e.target.value))}
            />
          </div>
        </div>
        <div className='form-group mb-2'>
          <label tabIndex={0} for='address'>Address</label>
          <input 
            type='text' 
            className='form-control mt-2' 
            id='address'  
            value={address} 
            onChange={(e) => dispatch(setForm('address', e.target.value))}
          />
        </div>
        <div className='row'>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='operationalHour'>Operational Hour</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='operationalHour'  
              value={operationalHour} 
              onChange={(e) => dispatch(setForm('operationalHour', e.target.value))}
            />
          </div>
          <div className='form-group col-md-6 mb-2'>
            <label tabIndex={0} for='ticket'>Ticket</label>
            <input 
              type='text' 
              className='form-control mt-2' 
              id='ticket' 
              value={ticket} 
              onChange={(e) => dispatch(setForm('ticket', e.target.value))}
            />
          </div>
        </div>
        <div className='row'>
          <div className='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='latitude'>Latitude</label>
            <input 
              type='number' 
              className='form-control mt-2' 
              id='latitude' 
              value={lat} 
              onChange={(e) => dispatch(setForm('lat', e.target.value))}
            />
          </div>
          <div className='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='longitude'>Longitude</label>
            <input 
              type='number' 
              className='form-control mt-2' 
              id='longitude'  
              value={long} 
              onChange={(e) => dispatch(setForm('long', e.target.value))}
            />
          </div>
          <div class='form-group col-md-4 mb-2'>
            <label tabIndex={0} for='rating'>Rating</label>
            <input 
              type='text' 
              class='form-control mt-2' 
              id='rating' 
              value={rating} 
              onChange={(e) => dispatch(setForm('rating', e.target.value))}
            />
          </div>
        </div>
        <div className='form-group mb-2'>
          <div className='upload mb-2'>
            <label tabIndex={0} for='uploadFile' class='form-label'>Upload Image</label>
            <input type='file' id='uploadFile' className='form-control' onChange={(e) => onImageUpload(e)} />
            {imgPreview && <img tabIndex={0} className='preview' src={imgPreview} alt={`gambar preview destinasi wisata ${name}`} />}
          </div>
        </div>
        <div className='form-group mb-2'>
          <label tabIndex={0} for='description'>Description</label>
          <textarea 
            className='form-control mt-2' 
            id='description'  
            style={{height: '150px'}}
            value={description} 
            onChange={(e) => dispatch(setForm('description', e.target.value))}>
          </textarea>
        </div>
        <button type='submit' className='btn btn-info text-white mt-2 py-2 fs-5'>Update</button>
      </form>
      <Gap height={20} />
    </div>
  )
}

export default withRouter(UpdateTour);

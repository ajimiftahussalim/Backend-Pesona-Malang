import React, { useEffect, useState } from 'react'
import { Button, Gap, Input, Upload} from '../../components'
import TextArea from '../../components/atoms/textarea'
import './createBlog.scss';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postToAPI, setForm, setImgPreview, updateToAPI } from '../../config/redux/action';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const CreateTour = (props) => {
  const backIcon = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const {form, imgPreview} = useSelector(state => state.createTourReducer);
  const {name, category, address, operationalHour, ticket, description} = form;
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id;
    if(id) {
      setIsUpdate(true)
      Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
      .then(res => {
        const data = res.data.data;
        dispatch(setForm('name', data.name))
        dispatch(setForm('category', data.category));
        dispatch(setForm('address', data.address));
        dispatch(setForm('operationalHour', data.operationalHour));
        dispatch(setForm('ticket', data.ticket));
        dispatch(setForm('description', data.description));
        dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
      })
      .catch(err => {
        console.log('error:', err);
      })
    }
  }, [dispatch, props])

  const onSubmit = () => {
    const id = props.match.params.id;
    if(isUpdate) {
      updateToAPI(form, id);
    } else {
      postToAPI(form)
    }
  }

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm('image', file))
    dispatch(setImgPreview(URL.createObjectURL(file)))
  }
  return (
    <div>
      <Gap height={20} />
      <div className='container blog-post card p-5'>
        <h2 className='fs-2 mx-auto text-info'>Form {isUpdate ? 'Update': 'Create New'} Tour</h2>
        <Input label='Name' value={name} onChange={(e) => dispatch(setForm('name', e.target.value))} />
        <Input label='Category' value={category} onChange={(e) => dispatch(setForm('category', e.target.value))} />
        <Input label='Address' value={address} onChange={(e) => dispatch(setForm('address', e.target.value))} />
        <Input label='Operational Hour' value={operationalHour} onChange={(e) => dispatch(setForm('operationalHour', e.target.value))} />
        <Input label='Ticket' value={ticket} onChange={(e) => dispatch(setForm('ticket', e.target.value))} />
        <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
        <TextArea label='Description' value={description} onChange={(e) => dispatch(setForm('description', e.target.value))} />
        <Gap height={20} />
        <div className='mx-auto'>
          <Button title={isUpdate ? 'Update' : 'Simpan'} onClick={onSubmit} />
        </div>
      </div>
      <Gap height={20} />
      <div className='container d-flex justify-content-end'>
        <button className='btn btn-warning px-3 fs-5 text-white' onClick={() => history.push('/')}>{backIcon}</button>
      </div>
      <Gap height={20} />
    </div>
    
  )
}

export default withRouter(CreateTour);

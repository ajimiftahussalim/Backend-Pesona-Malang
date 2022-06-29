import Axios from "axios";
import Swal from 'sweetalert2';

export const setForm = (formType, formValue) => {
  return {type: 'SET_FORM_DATA', formType, formValue}
}

export const setImgPreview = (payload) => {
  return {type: 'SET_IMG_PREVIEW', payload}
}

export const saveToAPI = (form) => {
  const data = new FormData();
  data.append('name', form.name);
  data.append('category', form.category);
  data.append('address', form.address);
  data.append('operationalHour', form.operationalHour);
  data.append('ticket', form.ticket);
  data.append('description', form.description);
  data.append('image', form.image);
  data.append('lat', form.lat);
  data.append('long', form.long);
  data.append('rating', form.rating);

  Axios.post('http://localhost:4000/v1/pesona-malang/tour', data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  .then(() => {
    Swal.fire(
      'Good job!',
      'Create Tour Successful',
      'success'
    )
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err}`,
    })
  })
}

export const updateToAPI = (form, id) => {
  const data = new FormData();
  data.append('name', form.name);
  data.append('category', form.category);
  data.append('address', form.address);
  data.append('operationalHour', form.operationalHour);
  data.append('ticket', form.ticket);
  data.append('description', form.description);
  data.append('image', form.image);
  data.append('lat', form.lat);
  data.append('long', form.long);
  data.append('rating', form.rating);

  Axios.put(`http://localhost:4000/v1/pesona-malang/tour/${id}`, data, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  })
  .then(() => {
    Swal.fire(
      'Good job!',
      'Update Tour Successful',
      'success'
    )
  })
  .catch(err => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err}`,
    })
  })
}
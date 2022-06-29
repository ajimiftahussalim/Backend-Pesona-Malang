const initialState = {
  form: {
    name: '',
    category: '',
    address: '',
    operationalHour: '',
    ticket: '',
    description: '',
    image: '',
    lat: '',
    long: '',
    rating: '',
  },
  imgPreview: null
}

const tourReducer = (state = initialState, action) => {
  if(action.type === 'SET_FORM_DATA') {
    return {
      ...state,
      form: {
        ...state.form,
        [action.formType]: action.formValue
      }
    }
  }
  if(action.type === 'SET_IMG_PREVIEW') {
    return {
      ...state,
      imgPreview: action.payload
    }
  }
  return state;
}

export default tourReducer;
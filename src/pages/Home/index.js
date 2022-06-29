import React, { useEffect, useState } from 'react';
import { Gap } from '../../components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataTour } from '../../config/redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Swal from 'sweetalert2';

const Home = () => {
  const viewIcon = <FontAwesomeIcon icon={faEye} />
  const updateIcon = <FontAwesomeIcon icon={faPenToSquare} />
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />
  const [counter, setCounter] = useState(1);
  const {dataTour, page} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataTour(counter))
  }, [counter, dispatch])
  const history = useHistory();

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
    console.log(counter);
  }

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
    console.log(counter);
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Apakah kamu ingin menghapus data wisata ini?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
          .then(res => {
            console.log('success delete: ', res.data);
            dispatch(setDataTour(counter))
          })
          .catch(err => {
            console.log('error: ', err)
          })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div className='container'>
      <Gap height={120} />
      <button 
        className='btn btn-success' 
        style={{padding: '10px 16px'}} 
        onClick={() => history.push('/create-tour')}
      >Create New Tour</button> 
      <Gap height={20} />
      <div className='table-responsive'>
      <table className="table text-center">
        <thead className="table-dark">
          <tr>
            <th tabIndex={0} scope="col">No</th>
            <th tabIndex={0} scope="col">Image</th>
            <th tabIndex={0} scope="col">Name</th>
            <th tabIndex={0} scope="col">Category</th>
            <th tabIndex={0} scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataTour.length !== 0 ?
          dataTour.map((tour, index) => {
            return (
              <tr className='align-middle text-center'>
                <td tabIndex={0}>{(index + 1) + (page.currentPage - 1) * 10}</td>
                <td>
                  <img
                    tabIndex={0} 
                    src={`http://localhost:4000/${tour.image}`} 
                    style={{width: '50px', height: '50px'}} 
                    className='img-thumbnail' 
                    alt={`gambar destinasi wisata ${tour.name}`}
                  />
                </td>
                <td tabIndex={0}>{tour.name}</td>
                <td tabIndex={0}>{tour.category}</td>
                <td>
                  <button 
                    className='btn btn-primary m-1 py-2 px-3' 
                    onClick={() => history.push(`/detail-tour/${tour._id}`)}
                  >{viewIcon}</button>
                  <button 
                    className='btn btn-warning m-1 py-2 px-3' 
                    onClick={() => history.push(`/update-tour/${tour._id}`)}
                  >{updateIcon}</button>  
                  <button 
                    className='btn btn-danger m-1 py-2 px-3' 
                    onClick={() => confirmDelete(tour._id)}
                  >{deleteIcon}</button>
                </td>
              </tr>
            )
          })
          :
            <tr>
              <td></td>
              <td></td>
              <td tabIndex={0} className='text-danger'>Data kosong</td>
              <td></td>
              <td></td>
            </tr> 
          }
          </tbody>
        </table>
        <div className='container text-center'>
          <button 
            className='btn btn-outline-light btn-floating text-secondary py-2' 
            onClick={previous}><ArrowBackIosIcon />
          </button>
          <span tabIndex={0} className='px-2 align-middle pw-bold'>{page.currentPage} / {page.totalPage}</span>
          <button 
            className='btn btn-outline-light btn-floating text-secondary py-2' 
            onClick={next}><ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <Gap height={20} />
    </div>
  )
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Gap } from '../../components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataTour } from '../../config/redux/action';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Apakah anda yakin ingin menghapus data wisata ini?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
            .then(res => {
              console.log('success delete: ', res.data);
              dispatch(setDataTour(counter))
            })
            .catch(err => {
              console.log('error: ', err)
            })
          }
        },
        {
          label: 'No',
          onClick: () => console.log('Delete data failed')
        }
      ]
    });
  }

  return (
    <div className='container'>
      <Gap height={120} />
      <button className='btn btn-success' onClick={() => history.push('/create-tour')}>Create New Tour</button> 
      <Gap height={20} />
      <div className='table-responsive'>
      <table className="table text-center">
        <thead className="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataTour.length !== 0 ?
          dataTour.map((tour, index) => {
            return (
              <tr className='align-middle text-center'>
                <td>{(index + 1) + (page.currentPage - 1) * 10}</td>
                <td><img src={`http://localhost:4000/${tour.image}`} style={{width: '50px', height: '50px'}} className="img-thumbnail" alt=""/></td>
                <td>{tour.name}</td>
                <td>{tour.category}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => history.push(`/detail-tour/${tour._id}`)}>{viewIcon}</button>
                  <button className='btn btn-warning ms-1' onClick={() => history.push(`/create-tour/${tour._id}`)}>{updateIcon}</button>  
                  <button className='btn btn-danger ms-1' onClick={() => confirmDelete(tour._id)}>{deleteIcon}</button>
                </td>
              </tr>
            )
          })
          :
          <tr>
            <td></td>
            <td></td>
            <td className='text-danger'>Data kosong</td>
            <td></td>
            <td></td>
          </tr> 
          }
          </tbody>
        </table>
        <div className='container text-center'>
          <button className='btn btn-outline-light btn-floating text-secondary' onClick={previous}><ArrowBackIosIcon /></button>
          <span className='px-2'>{page.currentPage} / {page.totalPage}</span>
          <button className='btn btn-outline-light btn-floating text-secondary' onClick={next}><ArrowForwardIosIcon /></button>
        </div>
      </div>
      <Gap height={20} />
    </div>
  )
}

export default Home;

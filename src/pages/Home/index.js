import React, { useEffect, useState } from 'react';
import { Gap, TourItem } from '../../components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDataTour } from '../../config/redux/action';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';

const Home = () => {
  const [counter] = useState(1);
  const {dataTour} = useSelector(state => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDataTour(counter))
  }, [counter, dispatch])
  const history = useHistory();

  const confirmDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Apakah anda yakin akan menghapus data wisata ini?',
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
      <Gap height={20} />
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
          {dataTour.map((tour, index) => {
            return (
              <TourItem 
                key={tour._id}
                image={`http://localhost:4000/${tour.image}`}
                name={tour.name}
                category={tour.category}
                address={tour.address}
                operationalHour={tour.operationalHour}
                ticket={tour.ticket}
                description={tour.description}
                date={tour.createdAt}
                body={tour.body}
                _id={tour._id}
                onDelete={confirmDelete} 
                index={index + 1}
              />
            )
          })}
        </table>
      </div>
      <Gap height={20} />
    </div>
  )
}

export default Home;

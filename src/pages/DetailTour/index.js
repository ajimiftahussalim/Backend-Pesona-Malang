import React, { useEffect, useState } from 'react';
import { Gap } from '../../components';
import { withRouter, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const DetailTour = (props) => {
  let history = useHistory();
  const backIcon = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const [data, setData] = useState({})
  useEffect(() => {
    const id = props.match.params.id;
    Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
    .then(res => {
      setData(res.data.data);
    })
    .catch(err => {
      console.log('error: ', err);
    })
  })

  const showFormattedDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    return new Date(date).toLocaleDateString("id-ID", options)
  }

  return (
  <div>
    <Gap height={120} />
    <div className='container col-xxl-8 px-4'>
      <div className='d-flex justify-content-end mt-0'>
        <button className='btn btn-none p-2 px-3 text-muted fs-3' onClick={history.goBack}>{backIcon}</button>
      </div>
      <h2 tabIndex={0} className='text-info mt-2'>Detail data destinasi wisata {data.name}</h2>
        <div className='row flex-lg-row-reverse g-5 py-5'>
          <div className='col-10 col-sm-8 col-lg-6 mt-2'>
            <img 
              tabIndex={0}
              src={`http://localhost:4000/${data.image}`} 
              className='d-block img-fluid align-top' 
              alt={`gambar destinasi wisata ${data.name}`} 
              width='700' height='500' loading='lazy' 
            />
          </div>
          <div className='col-lg-6 mt-3'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <tbody>
                  <tr className='fw-bold'>
                    <td tabIndex={0}>ID</td>
                    <td tabIndex={0}>{data._id}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Created at</td>
                    <td tabIndex={0}>{showFormattedDate(data.createdAt)}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Update at</td>
                    <td tabIndex={0}>{showFormattedDate(data.updatedAt)}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Name</td>
                    <td tabIndex={0}>{data.name}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Category</td>
                    <td tabIndex={0}>{data.category}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Address</td>
                    <td tabIndex={0}>{data.address}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Operational Hour</td>
                    <td tabIndex={0}>{data.operationalHour}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Ticket</td>
                    <td tabIndex={0}>{data.ticket}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Latitude</td>
                    <td tabIndex={0}>{data.lat}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Longitude</td>
                    <td tabIndex={0}>{data.long}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Rating</td>
                    <td tabIndex={0}>{data.rating}</td>
                  </tr>
                  <tr>
                    <td tabIndex={0}>Description</td>
                    <td tabIndex={0}>{data.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default withRouter(DetailTour);
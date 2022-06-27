import React, { useEffect, useState } from 'react';
import { Gap } from '../../components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const DetailTour = (props) => {
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
    <div className="container col-xxl-8 px-4">
      <div className='d-flex justify-content-end mt-0'>
        <a href='/' className='p-2 px-3 text-muted fs-3'>{backIcon}</a>
      </div>
      <h2 className='text-info mt-2'>Detail data destinasi wisata {data.name}</h2>
        <div className="row flex-lg-row-reverse g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 mt-2">
              <img src={`http://localhost:4000/${data.image}`} className="d-block img-fluid align-top" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6 mt-3">
            <div className='table-responsive'>
              <table class="table table-bordered">
                <tbody>
                  <tr className='fw-bold'>
                    <td>ID</td>
                    <td>{data._id}</td>
                  </tr>
                  <tr>
                    <td>Created at</td>
                    <td>{showFormattedDate(data.createdAt)}</td>
                  </tr>
                  <tr>
                    <td>Update at</td>
                    <td>{showFormattedDate(data.updatedAt)}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{data.category}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{data.address}</td>
                  </tr>
                  <tr>
                    <td>Operational Hour</td>
                    <td>{data.operationalHour}</td>
                  </tr>
                  <tr>
                    <td>Ticket</td>
                    <td>{data.ticket}</td>
                  </tr>
                  <tr>
                    <td>Rating</td>
                    <td>{data.rating}</td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>{data.description}</td>
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
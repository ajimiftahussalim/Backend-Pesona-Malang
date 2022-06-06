import React, { useEffect, useState } from 'react'
import { Gap } from '../../components';
import './detailBlog.scss';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const DetailTour = (props) => {
  const backIcon = <FontAwesomeIcon icon={faArrowCircleLeft} />
  const [data, setData] = useState({})
  useEffect(() => {
    const id = props.match.params.id;
    Axios.get(`http://localhost:4000/v1/pesona-malang/tour/${id}`)
    .then(res => {
      setData(res.data.data)
    })
    .catch(err => {
      console.log('error: ', err);
    })
  })
  const history = useHistory();
    return (
    <div>
      <Gap height={30} />
       <div className='container'>
       <div className='row'>
        <div className='col'>
          <img className="rounded mx-auto d-block" height={450} src={`http://localhost:4000/${data.image}`} alt='thumb' />
        </div>
        <div className="col">
          <h2 className="fs-2 text-info">{data.name}</h2>
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td className='fw-bold'>Category</td>
                <td>{data.category}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Address</td>
                <td>{data.address}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Operational Hour</td>
                <td>{data.operationalHour}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Ticket</td>
                <td>{data.ticket}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Description</td>
                <td>{data.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
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

export default withRouter(DetailTour);
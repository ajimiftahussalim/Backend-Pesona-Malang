import React from 'react'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const viewIcon = <FontAwesomeIcon icon={faEye} />
const updateIcon = <FontAwesomeIcon icon={faPenToSquare} />
const deleteIcon = <FontAwesomeIcon icon={faTrash} />

const TourItem = (props) => {
  const history = useHistory();
  const {image, name, category, _id, index, onDelete} = props;
  return (
    <tbody>
      <tr className='align-middle'>
        <td>{index}</td>
        <td><img src={image} width="50" class="img-thumbnail" alt=""/></td>
        <td>{name}</td>
        <td>{category}</td>
        <td>
          <button className='btn btn-primary' onClick={() => history.push(`/detail-tour/${_id}`)}>{viewIcon}</button>
          <button className='btn btn-warning ms-1' onClick={() => history.push(`/create-tour/${_id}`)}>{updateIcon}</button>  
          <button className='btn btn-danger ms-1' onClick={() => onDelete(_id)}>{deleteIcon}</button>
        </td>
      </tr>
    </tbody>
  )
}

export default TourItem;

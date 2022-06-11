import React from 'react';
import { LoginBg } from '../../assets';
import { Input, Button, Gap } from '../../components';
import { useHistory } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const history = useHistory();
  return (
    <div className='main-page'>
      <div className='left'>
        <img src={LoginBg} className="bg-image" alt="imageBG" />
      </div>
      <div className='right'>
        <p className='title'>Login Admin</p>
        <Input label="Email" placeholder="Email" />
        <Gap height={18} />
        <Input label="Password" placeholder="Password" />
        <Gap height={50} />
        <Button title="Login" onClick={() => history.push('/')} />
        <Gap height={60} />
      </div>
    </div>
  )
}

export default Login;

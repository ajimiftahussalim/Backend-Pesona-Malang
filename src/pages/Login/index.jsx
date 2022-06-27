import { useState } from "react";
import axios from "axios";
import { LoginImg } from "../../assets";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:4000/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className='container container-height mx-auto pt-5'>
			<div className='row flex-lg-row-reverse align-items-center'>
        <div className="col-lg-7 p-5">
          <img src={LoginImg} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="500" loading="lazy" />
        </div>
        <div className='col-lg-5 p-5'>
          <form onSubmit={handleSubmit}>
            <h2 className='mb-3 text-info'>Selamat Datang !</h2>
            <p>Silahkan login untuk melanjutkan ke dalam aplikasi.</p>
            <label for='email' className='fw-bold'>Email</label>
            <input
              type='email'
              id='email'
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className='form-control mb-3'
            />
            <label for='password' className='fw-bold'>Password</label>
            <input
              type="password"
              id='password'
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className='form-control mb-3'
            />
            {error && <div className='text-danger mb-3'>{error}</div>}
            <button type='submit' className='btn btn-info text-white fw-bold px-5'>
              Login
            </button>
          </form>
        </div>
			</div>
		</div>
	);
};

export default Login;
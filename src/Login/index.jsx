import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
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
			<div className='row flex-lg-row-reverse align-items-center card'>
			<div className="col-lg-6 p-5 bg-secondary">
                <img src={LoginImg} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
            </div>
				<div className='col-lg-6 p-5'>
					<form className='' onSubmit={handleSubmit}>
						<h1 className="mb-3 text-success">Login Admin</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className='form-control mb-3'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className='form-control mb-3'
						/>
						{error && <div className='text-danger mb-3'>{error}</div>}
						<button type="submit" className='btn btn-success px-5'>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
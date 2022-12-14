import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import authImg from '../../images/auth_vector.svg';

const Login = () => {
	const { handleLogin } = useAuthentication();
	const navigate = useNavigate();
	const [person, setPerson] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = person;

		if (email && password) {
			const data = {
				email,
				password,
			};

			handleLogin(data, navigate);
			setPerson({ email: '', password: '' });
		}
	};

	return (
		<div className='grid grid-cols-12 min-h-screen'>
			{/* left side of the page */}
			<div className='col-span-5 bg-primary p-10 flex flex-col justify-between'>
				<div className='space-y-[48px]'>
					{/* logo */}
					<h2 className='font-semibold text-2xl'>
						<span className='text-secondary font-bold'>u</span>
						<span className='text-brand font-bold'>L</span>
						earn
					</h2>
					{/* description */}
					<h5 className='text-white text-2xl'>
						Explore more than hundreds of course made with quality
						and accuracy just for you.
					</h5>
				</div>
				<img className='w-[70%] mx-auto' src={authImg} alt='login' />
			</div>
			{/* right side of the page */}
			<div className='col-span-7 p-10 flex justify-center items-center'>
				<div className='w-7/12 space-y-8'>
					{/* title */}
					<div className='space-y-2'>
						<h4 className='text-2xl font-medium'>Sign In</h4>
						<p className='text-gray-500'>
							New User?{' '}
							<Link
								to='/auth/register/learner'
								className='text-primary underline'
							>
								Create an Account
							</Link>
						</p>
					</div>
					{/* forms */}
					<form
						onSubmit={handleSubmit}
						className='grid grid-cols-12 gap-8'
					>
						{/* form input */}
						<div className='col-span-12 form-control w-full'>
							<label className='label font-medium'>Email</label>
							<input
								type='email'
								placeholder='Type your email'
								name='email'
								className='input input-bordered w-full'
								value={person.email}
								onChange={handleChange}
							/>
						</div>

						{/* form input */}
						<div className='col-span-12 form-control w-full'>
							<label className='label font-medium'>
								Password
							</label>
							<input
								type='password'
								placeholder='********'
								name='password'
								className='input input-bordered w-full'
								value={person.password}
								onChange={handleChange}
							/>
						</div>

						<Link
							className='col-span-12 text-primary underline font-medium'
							to='/auth/forgot-password'
						>
							Forgot Password?
						</Link>
						{/* submit button */}
						<button
							className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg'
							type='submit'
						>
							Sign In
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

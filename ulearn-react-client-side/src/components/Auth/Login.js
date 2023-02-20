import { Spin } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFramerMotion from '../../hooks/useFramerMotion';
import { AnimatePresence, motion } from 'framer-motion';
import AuthLeftCol from './AuthLeftCol';
import { MdOutlineArrowBack } from 'react-icons/md';

const Login = () => {
	const { loading, handleLogin } = useAuth();
	const { containerVariants } = useFramerMotion();
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
			{/*---------------------------------------left side of the page---------------------------------------------- */}
			<AuthLeftCol />
			{/* right side of the page */}
			<div className='col-span-7 p-10 relative flex justify-center items-center'>
				{/*--------------back---------------------*/}
				<div className='absolute top-[40px] right-[40px] flex justify-end'>
					<button
						onClick={() => navigate('/')}
						className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center capitalize'
					>
						<MdOutlineArrowBack size={20} />{' '}
						<span>Go back to home page</span>
					</button>
				</div>
				<motion.div
					initial='hidden'
					animate='visible'
					variants={containerVariants}
					key='login'
					className='w-7/12 space-y-8'
				>
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
							className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg disabled:bg-opacity-10'
							type='submit'
							disabled={loading}
						>
							{loading ? <Spin size='middle' /> : 'Sign In'}
						</button>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;

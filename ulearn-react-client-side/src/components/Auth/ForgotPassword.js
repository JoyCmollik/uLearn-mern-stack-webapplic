import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from '../layout/Lottie/Lottie';
import AuthLeftCol from './AuthLeftCol';
import useAuth from '../../hooks/useAuth';

const ForgotPassword = () => {
	const { handleForgotPassword, forgotPasswordMsg, loading } = useAuth();
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (email) {
			const data = {
				email,
			};

			handleForgotPassword(data, navigate);
			setEmail('');
		}
	};
	return (
		<div className='grid grid-cols-12 min-h-screen'>
			{/*---------------------------------------left side of the page---------------------------------------------- */}
			<AuthLeftCol />
			{/* -------------------------right side of the page------------------ */}
			{!forgotPasswordMsg ? (
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
					<div className='w-7/12 space-y-8'>
						{/* title */}
						<div className='space-y-2'>
							<h4 className='text-2xl font-medium'>
								Forgot Password ?
							</h4>
							<p>
								Enter the email address you used when you joined
								and we’ll send you instructions to reset your
								password. For security reasons, we do NOT store
								your password. So rest assured that we will
								never send your password via email.
							</p>
						</div>
						{/* forms */}
						<form
							onSubmit={handleSubmit}
							className='grid grid-cols-12 gap-8'
						>
							{/* form input */}
							<div className='col-span-12 form-control w-full'>
								<label className='label font-medium'>
									Email
								</label>
								<input
									type='email'
									placeholder='Type your email'
									name='email'
									className='input input-bordered w-full'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							{/* verify email */}
							{/* verify email */}
							<button
								className='col-span-12 text-primary py-2 font-medium border border-primary rounded-lg'
								type='submit'
								disabled={loading}
							>
								{loading ? (
									<>
										<LoadingOutlined />
										{' Requesting Reset Password Link'}
									</>
								) : (
									'Get Reset Password Link'
								)}
							</button>
						</form>
						<p className='text-gray-500'>
							<Link
								to='/auth/login'
								className='text-primary underline'
							>
								back to login
							</Link>
						</p>
					</div>
				</div>
			) : (
				<div className='col-span-7 p-10 flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center space-y-4 bg-white backdrop-filter rounded-lg p-8'>
						<Lottie
							src='https://assets8.lottiefiles.com/packages/lf20_d3vw5gid.json'
							size={{
								width: '450',
								height: '450',
							}}
						/>
						<h4 className='text-xl text-success'>
							{forgotPasswordMsg}
						</h4>
						<Link
							to='/auth/login'
							className='text-primary underline text-base'
						>
							Go Back To Login Page
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;

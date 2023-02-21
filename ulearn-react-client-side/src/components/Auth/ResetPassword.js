import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthLeftCol from './AuthLeftCol';
import Lottie from '../layout/Lottie/Lottie';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ForgotPassword = () => {
	const { handleResetPassword, forgotPasswordMsg, loading } = useAuth();
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const query = useQuery();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (password) {
			const data = {
				password,
				token: query.get('token'),
				email: query.get('email'),
			};

			handleResetPassword(data, navigate);
			setPassword('');
		}
	};

	return (
		<div className='grid grid-cols-12 min-h-screen'>
			{/*---------------------------------------left side of the page---------------------------------------------- */}
			<AuthLeftCol />
			{/* -------------------------right side of the page------------------ */}
			{!forgotPasswordMsg ? (
				<div className='col-span-7 p-10 flex justify-center items-center'>
					<div className='w-7/12 space-y-8'>
						{/* title */}
						<div className='space-y-2'>
							<h4 className='text-2xl font-medium'>
								Reset Password
							</h4>
						</div>
						{/* forms */}
						<form
							onSubmit={handleSubmit}
							className='grid grid-cols-12 gap-8'
						>
							{/* form input */}
							<div className='col-span-12 form-control w-full'>
								<label className='label font-medium'>
									Password
								</label>
								<input
									type='password'
									placeholder='Type your password'
									name='password'
									className='input input-bordered w-full'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>

							{/* verify email */}
							<button
								className='col-span-12 text-primary py-2 font-medium border border-primary rounded-lg'
								type='submit'
								disabled={loading}
							>
								{loading ? (
									<>
										<LoadingOutlined />
										{' Updating Password'}
									</>
								) : (
									'New Password'
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
							src='https://assets8.lottiefiles.com/packages/lf20_pFntY6YwRq.json'
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

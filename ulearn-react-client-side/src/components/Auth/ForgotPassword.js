import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import Lottie from '../layout/Lottie/Lottie';
import AuthLeftCol from './AuthLeftCol';

const ForgotPassword = () => {
	const { handleForgotPassword, forgotPasswordMsg } = useAuthentication();
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
				<div className='col-span-7 p-10 flex justify-center items-center'>
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
							<button
								className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg'
								type='submit'
							>
								Get Reset Password Link
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
					<p className='text-lg text-green-800 bg-emerald-200 px-4 py-3 rounded'>
						{forgotPasswordMsg}
					</p>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;

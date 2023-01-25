import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import AuthLeftCol from './AuthLeftCol';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const ForgotPassword = () => {
	const { handleResetPassword, forgotPasswordMsg } = useAuthentication();
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
								className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg'
								type='submit'
							>
								New Password
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

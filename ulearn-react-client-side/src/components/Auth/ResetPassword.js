import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';

import authImg from '../../images/auth_vector.svg';

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
									Email
								</label>
								<input
									type='email'
									placeholder='Type your email'
									name='email'
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

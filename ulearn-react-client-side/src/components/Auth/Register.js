import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import authImg from '../../images/auth_vector.svg';

const Register = () => {
	const { role } = useParams();
	const [userRole, setUserRole] = useState(role);
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
						<h4 className='text-2xl font-medium'>
							Create an Account
						</h4>
						<p className='text-gray-500'>
							Already have an account?{' '}
							<Link
								to='/auth/login'
								className='text-primary underline'
							>
								Sign In
							</Link>
						</p>
					</div>
					{/* forms */}
					<form className='grid grid-cols-12 gap-8'>
						{/* form input */}
						<div className='col-span-12 form-control w-full'>
							<label className='label font-medium'>Email</label>
							<input
								type='email'
								placeholder='Type your email'
								name='email'
								className='input input-bordered w-full'
							/>
						</div>
						{/* form input */}
						<div className='col-span-6 form-control w-full'>
							<label className='label font-medium'>
								First Name
							</label>
							<input
								type='text'
								placeholder='First Name'
								name='first_name'
								className='input input-bordered w-full'
							/>
						</div>
						{/* form input */}
						<div className='col-span-6 form-control w-full'>
							<label className='label font-medium'>
								Last Name
							</label>
							<input
								type='text'
								placeholder='Last Name'
								name='last_name'
								className='input input-bordered w-full'
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
							/>
						</div>
						{/* roles */}
						<div className='col-span-12 grid grid-cols-3 gap-4'>
							<div className='p-2 border border-primary'>
								Learner
							</div>
							<div className='p-2 border border-primary'>
								Content Creator
							</div>
							<div className='p-2 border border-primary'>
								Client
							</div>
						</div>
						{/* agreement */}
						<div className='col-span-12'>
							<div className='form-control'>
								<label className='label cursor-pointer space-x-2'>
									<input
										type='checkbox'
										className='checkbox checkbox-primary'
									/>
									<span className='label-text'>
										By clicking Create account, I agree that
										I have read and accepted the Terms of
										Use and Privacy Policy.
									</span>
								</label>
							</div>
						</div>
						{/* submit button */}
						<button className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg' type='submit'>Sign Up</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;

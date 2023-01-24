import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import authImg from '../../images/auth_vector.svg';
import role_learner from '../../images/role_leaner.svg';
import role_creator from '../../images/role_creator.svg';
import { Button, message, Result, Space, Spin } from 'antd';
import { Alert } from 'antd';
import { Select } from 'antd';
import useAuth from '../../hooks/useAuth';
import Lottie from '../layout/Lottie/Lottie';
import { AnimatePresence, motion } from 'framer-motion';
import useFramerMotion from '../../hooks/useFramerMotion';
const userRoles = [
	{
		title: 'Learner',
		img: role_learner,
		role: 'learner',
	},
	{
		title: 'Content Creator',
		img: role_creator,
		role: 'content-creator',
	},
];
const onClose = (e) => {
	console.log(e, 'I was closed.');
};
const Register = () => {
	const navigate = useNavigate();
	const { handleRegister, user, registerMsg, setRegisterMsg, loading } =
		useAuth();
	console.log(registerMsg);
	const { role } = useParams();
	const [userRole, setUserRole] = useState(role);
	const { containerVariants } = useFramerMotion();
	// local functionalities
	const handleUserRole = (role) => {
		setUserRole((prevRole) => role);
	};
	const options = [
		{
			label: 'Male',
			value: 'male',
		},
		{
			label: 'Female',
			value: 'female',
		},
		{
			label: 'Others',
			value: 'others',
		},
	];
	const [person, setPerson] = useState({
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		gender: options[0].value,
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};
	const handleSubmit = (e) => {
		console.log(person);
		e.preventDefault();
		const { email, firstName, lastName, password, gender } = person;

		if (email && firstName && lastName && password && userRole && gender) {
			const data = {
				name: `${firstName} ${lastName}`,
				email,
				password,
				role: 'user',
				gender,
			};

			handleRegister(data, navigate);
			setPerson({
				email: '',
				firstName: '',
				lastName: '',
				password: '',
				gender: options[0].value,
			});
		} else {
			message.warning('Inputs should be filled!');
		}
	};

	if (registerMsg) {
		setTimeout(() => {
			setRegisterMsg(false);
			navigate('/');
		}, 3000);
		return (
			<div className='h-screen flex justify-center items-center'>
				<div className='bg-white drop-shadow p-4 rounded-lg space-y-2'>
					<Lottie
						src='https://assets9.lottiefiles.com/packages/lf20_qr6rdacm.json'
						size={{ width: 450, height: 450 }}
					/>

					<button className='w-full py-2 border-primary text-primary rounded-lg'>
						<Link to='/'>Home Page</Link>
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-12 min-h-screen'>
			{/*---------------------------------------left side of the page---------------------------------------------- */}
			<div className='col-span-5 bg-primary p-10 flex flex-col justify-between z-40'>
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
			{/*----------------------------------------right side of the page---------------------------------------------- */}

			<div className='col-span-7 p-10 flex justify-center items-center'>
				{loading ? (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={containerVariants}
						key='registering'
						className='p-4 bg-white drop-shadow rounded-lg space-y-2'
					>
						<Lottie
							src='https://assets8.lottiefiles.com/packages/lf20_ydifmjhf.json'
							size={{ width: 450, height: 450 }}
						/>
						<h4 className='text-lg text-font1 text-center tracking-wide'>
							Registration is in process. Please wait...
						</h4>
					</motion.div>
				) : (
					<motion.div
						initial='hidden'
						animate='visible'
						variants={containerVariants}
						key='register'
						className='w-7/12 space-y-8'
					>
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
						{/*-----------------------------forms------------------------------------ */}
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
									value={person.email}
									onChange={handleChange}
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
									name='firstName'
									className='input input-bordered w-full'
									value={person.firstName}
									onChange={handleChange}
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
									name='lastName'
									className='input input-bordered w-full'
									value={person.lastName}
									onChange={handleChange}
								/>
							</div>
							{/*-------------gender------------------------*/}
							<div className='col-span-12 form-control w-full'>
								<select
									className='input input-bordered w-full p-3'
									name='gender'
									value={person.gender}
									onChange={handleChange}
								>
									{options.map((option) => (
										<option
											key={option.value}
											value={option.value}
										>
											{option.label}
										</option>
									))}
								</select>
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
							{/* 
						<div className='col-span-12 grid grid-cols-3 gap-4'>
							{userRoles.map(({ title, role, img }, roleIdx) => (
								<div
									key={roleIdx}
									className={`py-4 border rounded-lg flex flex-col justify-center items-center space-y-2 transition duration-200 ease-in-out cursor-pointer ${
										userRole === role &&
										'bg-light text-white drop-shadow-md border-primary'
									}`}
									onClick={() => handleUserRole(role)}
								>
									<img
										className='object-cover w-14 mx-auto'
										src={img}
										alt='role learner'
									/>
									<h5 className='text-lg font-light'>
										{title}
									</h5>
								</div>
							))}
						</div> */}
							{/* agreement */}
							<div className='col-span-12'>
								<div className='form-control'>
									<label className='label cursor-pointer space-x-2'>
										<input
											type='checkbox'
											className='checkbox checkbox-sm indeterminate:bg-primar'
										/>
										<span className='label-text'>
											By clicking Create account, I agree
											that I have read and accepted the
											Terms of Use and Privacy Policy.
										</span>
									</label>
								</div>
							</div>
							{/* submit button */}
							<button
								type='submit'
								className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg disabled:bg-opacity-10'
								disabled={loading}
							>
								{loading ? <Spin size='middle' /> : 'Sign Up'}
							</button>
						</form>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default Register;

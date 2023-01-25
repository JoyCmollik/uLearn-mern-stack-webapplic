import React, { useState } from 'react';
import { AiOutlineMenuFold } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../../HeaderComponents/SideBar/SideBar';
import ulearnLogo from '../../../images/ULearn_Logo.png';
import { MdDashboard, MdLogout, MdPortrait } from 'react-icons/md';
import { Avatar } from 'antd';
import { Dropdown } from 'antd';
import { RiDashboardLine } from 'react-icons/ri';
import useAuth from '../../../hooks/useAuth';

const navigation = [
	{ id: 1, to: '/', name: 'Home' },
	{ id: 2, to: '/course-list', name: 'Courses' },
	{ id: 3, to: '/contact', name: 'Instructors' },
	{ id: 4, to: '/my-courses', name: 'My Courses' },
];

const NavigationBar = () => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('left');
	const { user, handleLogout } = useAuth();
	const navigate = useNavigate();

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const menu = () => {
		const role = user.role === 'instructor' ? 'content-creator' : 'admin';
		return (
			<div className='p-2 flex flex-col space-y-2 w-[200px] rounded-lg bg-white shadow-lg'>
				<div className='flex flex-col justify-center items-center p-2'>
					<Avatar size={45} src={user.avatarURL} />
					<div className='text-base font-medium'>
						<small className='underline'>{user?.name}</small>
					</div>
				</div>
				{/* ----- conditional dashboard ----- */}
				{user.role === 'admin' || user.role === 'instructor' ? (
					<Link to={`/${role}/dashboard`}>
						<button className='text-font1 p-2 border rounded-lg w-full flex items-center space-x-2'>
							<MdDashboard
								style={{ color: '#000000' }}
								size={25}
							/>
							<span>Dashboard</span>
						</button>
					</Link>
				) : null}
				<Link to='/my-profile'>
					<button className='text-font1 p-2 border rounded-lg w-full flex items-center space-x-2'>
						<MdPortrait style={{ color: '#000000' }} size={25} />
						<span>My Profile</span>
					</button>
				</Link>
				<button
					className='p-2 border rounded-lg w-full flex items-center space-x-2 bg-error text-white'
					onClick={() => handleLogout(navigate)}
				>
					<MdLogout style={{ color: '#ffffff' }} size={25} />
					<span>Logout</span>
				</button>
			</div>
		);
	};

	return (
		<>
			<header className='sticky top-0 left-0 bg-white border-b z-50'>
				{/* --------------------- container ------------------------*/}
				<section className='container mx-auto py-5 space-y-1'>
					<div className='flex justify-between items-center'>
						{/* --------------------- logo and title ------------------------*/}
						<div className='flex items-center space-x-5'>
							<div className=' flex items-center space-x-1'>
								<img
									className='w-[40px] object-cover'
									src={ulearnLogo}
									alt=''
								/>
								<h2 className='m-0 font-bold text-xl'>
									ULearn
								</h2>
							</div>
							<div className='hidden items-center space-x-6 md:block'>
								{/*--------------------Categories-------------------------*/}
								<button className='flex items-center space-x-2 bg-light px-3 py-2 text-base rounded-lg font-medium'>
									<RiDashboardLine size={20} />
									<span>Categories</span>
								</button>
							</div>
							<ul className='p-0 m-0 hidden md:flex items-center space-x-1 capitalize'>
								{navigation.map((nav) => (
									<li key={nav.id}>
										<Link
											to={nav.to}
											className='text-black text-base px-2 hover:text-primary'
											aria-current='page'
										>
											{nav.name}
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className='items-center space-x-4 justify-end pr-2 hidden md:flex '>
							{user && user.role === 'user' ? (
								<Link to='/become-content-creator'>
									<button className='px-4 py-2 text-primary border-2 border-primary font-medium drop-shadow rounded-lg'>
										Become Content Creator
									</button>
								</Link>
							) : null}
							{/*-------------------avatar------------------------------*/}
							<div className=''>
								{user ? (
									<Dropdown overlay={menu} className='ml-3'>
										<button
											onClick={(e) => e.preventDefault()}
											className='flex space-x-1 items-center'
										>
											<Avatar
												size={40}
												src={user.avatarURL}
											/>
											<div className='text-base font-medium'>
												<small>{user?.name}</small>
											</div>
										</button>
									</Dropdown>
								) : (
									<div className='flex'>
										{/*-------------------login/---------------------*/}
										<Link
											to='/auth/login'
											className='text-black text-base hover:text-blue-600'
										>
											Login
										</Link>
										<Link
											to='/auth/register/learner'
											className='text-black text-base ml-3 hover:text-blue-600'
										>
											Register
										</Link>
									</div>
								)}
							</div>
						</div>

						{/*----------- sidebar ---------------------*/}
						<article className='md:hidden'>
							<AiOutlineMenuFold
								onClick={showDrawer}
								className='text-2xl  '
							/>
							{open && (
								<SideBar
									onClose={onClose}
									placement={placement}
									open={open}
								/>
							)}
						</article>
					</div>
				</section>
			</header>
		</>
	);
};

export default NavigationBar;

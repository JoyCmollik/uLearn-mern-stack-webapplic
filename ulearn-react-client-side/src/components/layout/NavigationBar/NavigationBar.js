import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../../HeaderComponents/SideBar/SideBar';
import logo from '../../../images/ULearn_Logo.png';
import DropDownButton from '../../HeaderComponents/DropDownButton/DropDownButton';
import SearchField from '../../HeaderComponents/SearchField/SearchField';
import { MdEmail, MdNotificationsNone } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import { Avatar, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { LoginOutlined, DashboardTwoTone } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { CgProfile } from 'react-icons/cg';
import useAuthentication from '../../../hooks/useAuthentication';
import { RiDashboardLine } from 'react-icons/ri';

const navigation = [
	{ id: 1, to: '/', name: 'Home' },
	{ id: 2, to: '/course-list', name: 'Courses' },
	{ id: 3, to: '/contact', name: 'Instructors' },
];

const NavigationBar = () => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('left');
	const { user, handleLogout } = useAuthentication();
	const navigate = useNavigate();

	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onChange = (e) => {
		setPlacement(e.target.value);
	};
	const menu = (
		<Menu
			items={[
				{
					key: '1',
					label: (
						<Link
							to='admin/dashboard/'
							className='text-lg font-medium'
						>
							Dashboard
						</Link>
					),
					icon: (
						<DashboardTwoTone
							style={{ fontSize: '24px', color: '#08c' }}
						/>
					),
				},
				{
					key: '2',
					label: (
						<Link to='/' className='text-lg font-medium'>
							My Profile
						</Link>
					),
					icon: (
						<CgProfile
							style={{ fontSize: '24px', color: '#08c' }}
						/>
					),
				},
				{
					key: '3',
					label: (
						<div
							className='text-lg font-medium'
							onClick={() => handleLogout(navigate)}
						>
							Logout
						</div>
					),
					icon: (
						<LoginOutlined
							style={{ fontSize: '24px', color: '#08c' }}
						/>
					),
				},
			]}
		/>
	);
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
									src={logo}
									alt=''
								/>
								<h2 className='m-0 font-bold text-xl'>
									ULearn
								</h2>
							</div>
							<div className='hidden items-center space-x-6 md:block'>
								{/*--------------------Categories-------------------------*/}
								<button className='flex items-center space-x-2 bg-light px-3 py-2 text-base rounded-lg font-medium'>
									<RiDashboardLine size={20} /><span>Categories</span>
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

							{/*-------------------avatar------------------------------*/}

							<div className=''>
								{user ? (
									<Dropdown overlay={menu} className='ml-3'>
										<button
											onClick={(e) => e.preventDefault()}
											className='flex space-x-2 items-center'
										>
											<Avatar src={user.avatarURL} />
											<Space className='text-lg'>
												{user?.name}
											</Space>
										</button>
									</Dropdown>
								) : (
									<div className='flex'>
										{/*-------------------login/---------------------*/}
										<Link
											to='auth/login'
											className='text-black text-base hover:text-blue-600'
										>
											Login
										</Link>
										<Link
											to='auth/register/learner'
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

import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from '../../HeaderComponents/SideBar/SideBar';
import logo from '../../../images/ULearn_Logo.png';
import DropDownButton from '../../HeaderComponents/DropDownButton/DropDownButton';
import SearchField from '../../HeaderComponents/SearchField/SearchField';
import { MdNotificationsNone } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import { Avatar, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { LoginOutlined, DashboardTwoTone } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { CgProfile } from 'react-icons/cg';
import useAuthentication from '../../../hooks/useAuthentication';

const navigation = [
	{ id: 1, to: '/forum', name: 'Forum' },
	{ id: 2, to: '/blog', name: 'Blog' },
	{ id: 3, to: '/contact', name: 'Contact' },
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
			<Header
				style={{
					background: 'white',
					position: 'fixed',
					zIndex: 2,
					width: '100%',
					height: '90px',
					paddingTop: '6px',
				}}
			>
				<section className='container mx-auto  box-border  bg-white shadow-sm pt-2'>
					<div className='flex justify-between md:grid md:grid-cols-12 md:gap-4 items-center'>
						{/* --------------------- logo and title ------------------------*/}
						<article className='col-span-2 flex items-center '>
							<div className=''>
								<img src={logo} alt='' />
							</div>
							<h2 className='font-bold text-2xl'>ULearn</h2>
						</article>
						<article className='col-span-4 hidden items-center space-x-6 md:flex'>
							{/*--------------------Course Drop Down Button-------------------------*/}

							<DropDownButton name={'course'} />

							{/*--------------------Search Field-------------------------*/}
							<SearchField />
						</article>

						<article className='col-span-6 items-center space-x-4 justify-end pr-2 hidden md:flex '>
							<div>
								{/* -------------- navigation links -------------------------------*/}

								<ul className='items-center space-x-4 capitalize justify-end  -mb-2 md:flex '>
									<li>
										{/*--------------------Pages Drop Down Button-------------------------*/}
										<DropDownButton name={'pages'} />
									</li>
									{navigation.map((nav) => (
										<li key={nav.id}>
											<Link
												to={nav.to}
												className='text-black font-bold text-base'
												aria-current='page'
											>
												{nav.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
							{/*-----------------notification icon--------------------- */}

							<MdNotificationsNone className='text-3xl ' />

							{/*------------------cart---------------------------------*/}

							<FiShoppingBag className='text-2xl' />

							{/*-------------------avatar------------------------------*/}

							<div className=''>
								{user ? (
									<Dropdown overlay={menu} className='ml-3'>
										<a
											href='/xyz'
											onClick={(e) => e.preventDefault()}
											className='flex space-x-2 items-center'
										>
											<Avatar
												style={{
													background: 'purple',
												}}
											>
												{user?.name?.slice(0, 1)}
											</Avatar>
											<Space className='text-lg'>
												{user?.name}
											</Space>
										</a>
									</Dropdown>
								) : (
									<div className='flex'>
										{/*-------------------login/---------------------*/}
										<Link
											to='auth/login'
											className='text-black font-bold text-base hover:text-blue-600'
										>
											Login
										</Link>
										<Link
											to='auth/register/learner'
											className='text-black font-bold text-base ml-3 hover:text-blue-600'
										>
											Register
										</Link>
									</div>
								)}
							</div>
						</article>

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
			</Header>
		</>
	);
};

export default NavigationBar;

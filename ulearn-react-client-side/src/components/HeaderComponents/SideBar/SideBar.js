import { Avatar, Button, Drawer, Dropdown, Menu, Space } from 'antd';
import React from 'react';
import DropDownButton from '../DropDownButton/DropDownButton';
import SearchField from '../SearchField/SearchField';
import logo from '../../../images/ULearn_Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdNotificationsNone } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import useAuthentication from '../../../hooks/useAuthentication';
import { LoginOutlined, DashboardTwoTone } from '@ant-design/icons';
import { CgProfile } from 'react-icons/cg';
const navigation = [
	{ id: 1, to: '/forum', name: 'Forum' },
	{ id: 2, to: '/blog', name: 'Blog' },
	{ id: 3, to: '/contact', name: 'Contact' },
];

const SideBar = ({ placement, onClose, open }) => {
	const { user, handleLogout } = useAuthentication();
	const navigate = useNavigate();
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
			<Drawer
				title={
					<Space>
						{/* --------------------- logo and title ------------------------*/}
						<article className='flex items-center space-x-2  '>
							<div className=''>
								<img src={logo} alt='' />
							</div>
							<h2 className='font-bold text-2xl'>ULearn</h2>
						</article>
					</Space>
				}
				placement={placement}
				closable={false}
				onClose={onClose}
				open={open}
				key={placement}
				extra={
					<Space>
						<Button onClick={onClose}>X</Button>
					</Space>
				}
			>
				<article className='flex flex-col  items-start space-y-3 '>
					{/*--------------------Search Field-------------------------*/}
					<SearchField />
					{/*--------------------Course Drop Down Button-------------------------*/}

					<DropDownButton name={'course'} />
				</article>
				{/* -------------- navigation links -------------------------------*/}
				<article className='flex items-start'>
					<ul className='flex flex-col items-start space-y-5 mt-5 capitalize '>
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
				</article>
				<article className='flex flex-col items-start space-y-3   '>
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
							<div>
								{/*-------------------login/---------------------*/}
								<Link to='auth/login' className='text-base'>
									Login
								</Link>
								<Link
									to='auth/register/learner'
									className='text-base ml-3'
								>
									Register
								</Link>
							</div>
						)}
					</div>
				</article>
			</Drawer>
		</>
	);
};

export default SideBar;

import { Avatar, Button, Drawer, Space } from 'antd';
import React from 'react';
import DropDownButton from '../DropDownButton/DropDownButton';
import SearchField from '../SearchField/SearchField';
import logo from '../../../images/ULearn_Logo.png';
import { Link } from 'react-router-dom';
import { MdNotificationsNone } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';

const navigation = [
	{ id: 1, to: '/forum', name: 'Forum' },
	{ id: 2, to: '/blog', name: 'Blog' },
	{ id: 3, to: '/contact', name: 'Contact' },
];

const SideBar = ({ placement, onClose, open }) => {
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

					<Avatar
						src='https://joeschmoe.io/api/v1/random'
						style={{ border: '1px solid black' }}
					/>
					{/*--------------------signin btn---------------------------*/}

					<Button
						style={{
							background: '#F79903',
							color: 'white',
							borderRadius: '5px',
							border: '1px solid #F789903',
						}}
					>
						Sign In
					</Button>
				</article>
			</Drawer>
		</>
	);
};

export default SideBar;

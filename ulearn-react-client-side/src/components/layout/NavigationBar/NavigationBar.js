import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineMenuFold } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SideBar from '../../HeaderComponents/SideBar/SideBar';
import logo from '../../../images/ULearn_Logo.png';
import DropDownButton from '../../HeaderComponents/DropDownButton/DropDownButton';
import SearchField from '../../HeaderComponents/SearchField/SearchField';
import { MdNotificationsNone } from 'react-icons/md';
import { FiShoppingBag } from 'react-icons/fi';
import { Avatar, Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';

const navigation = [
	{ id: 1, to: '/forum', name: 'Forum' },
	{ id: 2, to: '/blog', name: 'Blog' },
	{ id: 3, to: '/contact', name: 'Contact' },
];

const NavigationBar = () => {
	const [open, setOpen] = useState(false);
	const [placement, setPlacement] = useState('left');
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const onChange = (e) => {
		setPlacement(e.target.value);
	};
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
						<article className='col-span-2 flex items-center space-x-2 '>
							<div className=''>
								<img src={logo} alt='' />
							</div>
							<h2 className='font-bold text-2xl'>ULearn</h2>
						</article>
						<article className='col-span-5 hidden items-center space-x-6 md:flex'>
							{/*--------------------Course Drop Down Button-------------------------*/}

							<DropDownButton name={'course'} />

							{/*--------------------Search Field-------------------------*/}
							<SearchField />
						</article>

						{/* -------------- navigation links -------------------------------*/}

						<ul className='col-span-3 hidden items-center space-x-4 capitalize justify-end  -mb-2 md:flex'>
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

						<article className='col-span-2 items-center space-x-4 justify-end pr-2 hidden md:flex'>
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

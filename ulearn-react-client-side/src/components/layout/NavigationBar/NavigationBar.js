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
					padding: '5px 0',
				}}
			>
				<section className='container mx-auto  box-border mt-2  bg-white '>
					<div className='flex flex-row items-center mx-10 justify-between'>
						{/* --------------------- logo and title ------------------------*/}
						<article className='flex items-center space-x-2  '>
							<div className=''>
								<img src={logo} alt='' />
							</div>
							<h2 className='font-bold text-2xl'>ULearn</h2>
						</article>
						<article className=' flex-row items-center hidden md:flex '>
							{/*--------------------Course Drop Down Button-------------------------*/}

							<DropDownButton name={'course'} />

							{/*--------------------Search Field-------------------------*/}
							<SearchField />
						</article>
						<div className='flex-row space-x-5 hidden md:flex'>
							{/* -------------- navigation links -------------------------------*/}
							<article className='flex items-center'>
								<ul className='flex flex-row items-center space-x-5 mb-[-3px]  capitalize '>
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
							<article className='flex flex-row items-center space-x-4  py-2  '>
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
			</Header>
		</>
	);
};

export default NavigationBar;

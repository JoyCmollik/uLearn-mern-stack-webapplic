import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Images/ULearn_Logo.png';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import DropDownMenu from '../../Home/DropDownMenu/DropDownMenu';
import NotificationBell from '../../Home/NotificationBell/NotificationBell';
import Cart from '../../Home/Cart/Cart';
import ProfileDropDown from '../../Home/ProfileDropDown/ProfileDropDown';

const navigation = [
	{ id: 1, to: '/forum', name: 'Forum' },
	{ id: 2, to: '/blog', name: 'Blog' },
	{ id: 3, to: '/contact', name: 'Contact' },
];

const Navbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<nav className=' container mx-auto '>
				<section className='flex flex-wrap justify-between py-4 mx-5 '>
					{/* logo and title */}
					<article className='flex items-center gap-x-4 '>
						<div className='w-12'>
							<img src={logo} alt='' />
						</div>
						<h2 className='font-semibold items-center mr-8'>
							ULearn
						</h2>
					</article>

					{/* mobile menu */}
					<div className=''>
						{/* profile drop down */}

						<button
							onClick={() => setOpen(!open)}
							data-collapse-toggle='mobile-menu-2'
							type='button'
							className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg '
							aria-controls='mobile-menu-2'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>

							{/* menu bar*/}
							<div
								onClick={() => setOpen(!open)}
								className='md:hidden'
							>
								{open ? (
									<AiOutlineClose className='w-7 h-7' />
								) : (
									<AiOutlineMenu className='w-7 h-7' />
								)}
							</div>
						</button>
					</div>
					{/* responsive */}
					<div
						id='mobile-menu-2'
						className={`justify-between bg-[#dbeafe] md:bg-white items-center w-full md:flex md:w-auto md:order-1 ${
							!open ? 'hidden' : 'block'
						} `}
					>
						{/* course drop search field */}
						<article className='flex flex-col mt-4  md:flex-row md:items-center text-base font-semibold capitalize  rounded-lg ml-8 justify-evenly md:space-x-5 '>
							<div className=''>
								<DropDownMenu name='Courses' />
							</div>
							{/* search field */}
							<div className='flex items-center border border-gray-500 rounded-full gap-2 text-base py-2 mt-4 md:mt-0 '>
								<AiOutlineSearch className='text-xl ml-3 inline-block text-gray-500 ' />
								<input
									type='text'
									placeholder='Search'
									className='text-base text-black focus:outline-none m-1 bg-[#dbeafe] md:bg-white'
								/>
							</div>
						</article>
						<div className='md:bg-white rounded-lg ml-8 '>
							<ul className='flex flex-col mt-4   md:flex-row md:items-center text-base font-semibold capitalize md:bg-white space-y-2 md:space-x-4'>
								<li className='ml-4 mt-3'>
									<DropDownMenu name='pages' />{' '}
								</li>
								{navigation.map((nav) => (
									<li>
										<Link
											to={nav.to}
											className='ml-4 '
											aria-current='page'
										>
											{nav.name}
										</Link>
									</li>
								))}

								{/* notification icon */}

								<NotificationBell />

								{/* car*/}
								<Cart />
								{/* profile*/}
								<ProfileDropDown />
								<li>
									<button className='bg-orange-500 text-white py-2 px-4 rounded-md mx-1'>
										Sign In
									</button>
								</li>
							</ul>
						</div>
						{/* end of responsive */}
					</div>
				</section>
			</nav>
		</>
	);
};

export default Navbar;

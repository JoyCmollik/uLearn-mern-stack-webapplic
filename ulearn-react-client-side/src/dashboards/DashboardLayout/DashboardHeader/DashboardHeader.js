import React from 'react';
import { HiDocumentAdd, HiOutlinePaperAirplane, HiPlus } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../../../components/layout/Loading/Loading';

const DashboardHeader = () => {
	const { user } = useAuth();
	const role = user?.role === 'instructor' ? 'content-creator' : 'admin';

	if(!user) return <div className='h-screen flex justify-center items-center'>
		<Loading />
	</div>

	return (
		<div className='flex justify-between items-center'>
			{/*****——————— greetings ———————*****/}
			<div className='space-y-0.5'>
				<h2 className='text-xl font-semibold text-font1 m-0'>
					Welcome, {user?.name.split(' ')[0]}
				</h2>
				<p className='text-font2'>
					Here's what happened with your learning system
				</p>
			</div>
			{/*****——————— header buttons ———————*****/}
			<div className='flex justify-between items-center space-x-2'>
				<Dropdown
					overlay={
						<div className='bg-white rounded-lg p-4 w-[270px] h-fit grid grid-cols-1 gap-2 border overflow-y-auto'>
							{/* ----- conditional dashboard ----- */}
							{user?.role === 'admin' ||
							user?.role === 'instructor' ? (
								<Link
									to={`/${role}/dashboard/manage-courses/add`}
								>
									<button className='text-font1 p-2 border rounded-lg w-full flex items-center space-x-2'>
										<HiDocumentAdd
											style={{ color: '#000000' }}
											size={25}
										/>
										<span>Add New Course</span>
									</button>
								</Link>
							) : null}
							{/* ----- conditional dashboard ----- */}
							{user?.role === 'admin' ? (
								<Link
									to={`/${role}/dashboard/manage-courses/add`}
								>
									<button className='text-font1 p-2 border rounded-lg w-full flex items-center space-x-2'>
										<HiOutlinePaperAirplane
											style={{ color: '#000000' }}
											size={25}
										/>
										<span>New Category</span>
									</button>
								</Link>
							) : null}
						</div>
					}
					// open={searchDropOpen}
					// onOpenChange={handleSearchDropDown}
					placement='bottomRight'
				>
					{/*****——————— add button ———————*****/}
					<button className='block bg-font1 text-white p-2 rounded-lg border-[0.5px]'>
						<HiPlus size={25} />
					</button>
				</Dropdown>
				{/* ****——————— notification ———————****
				<button className='block bg-white p-2 rounded-lg border-[0.5px] hover:text-primary'>
					<HiOutlineBell size={25} />
				</button> */}
				{/*****——————— search ———————*****/}
				<button className='block bg-white p-2 rounded-lg border-[0.5px] hover:text-primary'>
					<FiSearch size={25} />
				</button>
				<div className='bg-font2 h-full px-[0.25px] py-4' />
				{/*****——————— user details ———————*****/}
				<button className='flex justify-between items-center space-x-2 overflow-hidden'>
					<figure className='bg-white p-1 rounded-lg border-[0.5px] hover:text-primary m-0'>
						<img
							className='object-cover w-[33px] h-[33px] rounded'
							src={user?.avatarURL}
							alt='avatar'
						/>
					</figure>
					<div className='flex flex-col justify-center items-start'>
						<p className='font-medium text-font1 m-0 capitalize'>
							{user?.name}
						</p>
						<small className='text-font2 m-0 text-xs capitalize'>
							{user?.role}
						</small>
					</div>
				</button>
			</div>
		</div>
	);
};

export default DashboardHeader;

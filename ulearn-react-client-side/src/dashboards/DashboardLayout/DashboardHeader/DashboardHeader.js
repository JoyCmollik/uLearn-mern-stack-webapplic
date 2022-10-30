import React from 'react';
import { HiOutlineBell, HiPlus } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';

const DashboardHeader = () => {
	return (
		<div className='flex justify-between items-center'>
			{/*****——————— greetings ———————*****/}
			<div className='space-y-0.5'>
				<h2 className='text-xl font-semibold text-font1 m-0'>
					Welcome, Theresa{' '}
				</h2>
				<p className='text-font2'>
					Here's what happened with your learning system
				</p>
			</div>
			{/*****——————— header buttons ———————*****/}
			<div className='flex justify-between items-center space-x-2'>
				{/*****——————— add button ———————*****/}
				<button className='block bg-font1 text-white p-2 rounded-lg border-[0.5px]'>
					<HiPlus size={25} />
				</button>
				{/*****——————— notification ———————*****/}
				<button className='block bg-white p-2 rounded-lg border-[0.5px] hover:text-primary'>
					<HiOutlineBell size={25} />
				</button>
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
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkEbvwKY62YZm0I8Ic5Q-S-1hHAi32wjs5Q&usqp=CAU'
							alt=''
						/>
					</figure>
          <div className='flex flex-col justify-center items-start'>
            <p className="font-medium text-font1 m-0">Theresa</p>
            <small className='text-font2 m-0'>Admin</small>
          </div>
				</button> 
			</div>
		</div>
	);
};

export default DashboardHeader;

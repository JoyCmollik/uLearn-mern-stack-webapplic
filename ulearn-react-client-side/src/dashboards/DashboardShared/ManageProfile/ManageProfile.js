import React from 'react';

const ManageProfile = () => {
	return (
		<div className='bg-white min-h-screen rounded-lg p-4'>
			{/*****--------------User Profile Banner ---------------*****/}
			<div className='h-[18vh] bg-[url("https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGFic3RyYWN0fGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1920&q=60")] bg-center bg-cover bg-no-repeat rounded-lg'></div>
			{/*****--------------User Profile Picture Name ---------------*****/}
			<div className='flex justify-between items-start px-8 py-4 border-b-[0.5px]'>
				<div className='wrapper flex justify-between items-start space-x-4'>
					<figure className='h-[125px] w-[125px] bg-white rounded-full flex justify-center items-center -mt-14'>
						<img
							className='object-cover h-[118px] w-[118px] rounded-full'
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlkEbvwKY62YZm0I8Ic5Q-S-1hHAi32wjs5Q&usqp=CAU'
							alt='profile'
						/>
					</figure>
					<h2 className='text-2xl font-bold'>Theresa</h2>
				</div>
				<button className='border px-8 py-2 text-font2 rounded-lg'>
					Edit Profile
				</button>
			</div>
			{/*****--------------User Profile Other Info---------------*****/}
			<div className='info-parent-main-container space-y-8 p-4'>
				{/*****--------------Personal Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						Personal Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Full Name</h5>
							<p className='m-0 font-normal text-font1'>
								Theresa
							</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Gender</h5>
							<p className='m-0 font-normal text-font1'>Female</p>
						</div>
					</div>
				</div>
				{/*****--------------Contact Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						Contact Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Phone Number</h5>
							<p className='m-0 font-normal text-font1'>
								Theresa
							</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Email</h5>
							<p className='m-0 font-normal text-font1'>Female</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Website</h5>
							<p className='m-0 font-normal text-font1'>Female</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Address</h5>
							<p className='m-0 font-normal text-font1'>Female</p>
						</div>
					</div>
				</div>
				{/*****--------------Educational Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						Educational Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>
								Institution Type
							</h5>
							<p className='m-0 font-normal text-font1'>
								University
							</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>
								Institution Name
							</h5>
							<p className='m-0 font-normal text-font1'>
								University of Oxford
							</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Degree</h5>
							<p className='m-0 font-normal text-font1'>
								Computer Science
							</p>
						</div>
					</div>
				</div>
				{/*****--------------Professional Information---------------*****/}
				<div className='info-container'>
					<h4 className='text-font1 font-medium text-lg'>
						Professional Information
					</h4>
					<div className='grid grid-cols-4 items-center'>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Role</h5>
							<p className='m-0 font-normal text-font1'>CEO</p>
						</div>
						<div className='space-y-1'>
							<h5 className='text-gray-400 m-0'>Skills</h5>
							<div className='flex items-center space-x-2'>
								<div className='px-2 py-1 rounded-lg bg-light text-gray-400'>
									Leadership
								</div>
								<div className='px-2 py-1 rounded-lg bg-light text-gray-400'>
									Management
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ManageProfile;

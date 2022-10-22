import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineScreenSearchDesktop } from 'react-icons/md';

const CoursesSelection = () => {
	return (
		<section className='container mx-auto min-h-screen bg-base-200 pt-96 md:pt-20'>
			{/* title and icon */}
			<div>
				<MdOutlineScreenSearchDesktop />
				<h2>A Broad Selection Of Courses.</h2>
				<div>
					<p>
						CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW
						ADDITIONS
					</p>
					{/* course nested route */}
					{/* <div className='flex flex-row'>
						<Link to='/home/development'>Development</Link>
						<Link to='/home/business'>Business </Link>
						<Link to='/home/software'>IT& Software </Link>
						<Link to='/home/Design'>Design </Link>
					</div> */}
				</div>
			</div>
			{/* 	<Outlet /> */}
		</section>
	);
};

export default CoursesSelection;

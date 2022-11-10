import React from 'react';
import { Outlet } from 'react-router-dom';

const CoursesComponent = () => {
	return (
		<div className='p-4 bg-white rounded-lg'>
			<Outlet />
		</div>
	);
};

export default CoursesComponent;

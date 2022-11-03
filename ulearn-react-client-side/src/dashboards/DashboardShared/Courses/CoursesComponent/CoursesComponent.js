import React from 'react';
import { Outlet } from 'react-router-dom';

const CoursesComponent = () => {
	return (
		<div>
			<Outlet />
			loaded
		</div>
	);
};

export default CoursesComponent;

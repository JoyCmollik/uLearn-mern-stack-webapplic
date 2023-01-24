import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();

	const location = useLocation();
	if (loading && !user) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Spin />
			</div>
		);
	}

	return user ? (
		children
	) : (
		<Navigate to='/auth/login' state={{ from: location }} />
	);
};

export default PrivateRoute;

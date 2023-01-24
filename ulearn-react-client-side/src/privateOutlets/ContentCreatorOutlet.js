import { Spin } from 'antd';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ContentCreatorOutlet = () => {
	const { user, loading } = useAuth();
	if (loading && !user) {
		return (
			<div className='bg-white flex justify-center items-center h-screen'>
				<Spin />
			</div>
		);
	}
	return user.role === 'instructor' ? <Outlet /> : <Navigate to='/' />;
};

export default ContentCreatorOutlet;

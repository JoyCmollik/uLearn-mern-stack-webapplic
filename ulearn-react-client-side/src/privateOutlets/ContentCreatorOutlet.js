import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ContentCreatorOutlet = () => {
	const { user, loading } = useAuth();
    // if(loading) return;
    // if(!user) return <Navigate to='/auth/login' />
	return user.role === 'instructor' ? <Outlet /> : <Navigate to='/' />;
};

export default ContentCreatorOutlet;

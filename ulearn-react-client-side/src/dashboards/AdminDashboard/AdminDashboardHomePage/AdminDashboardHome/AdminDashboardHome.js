import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
// components
import DashboardSidebar from '../../../DashboardLayout/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../../DashboardLayout/DashboardHeader/DashboardHeader';

const AdminDashboardHome = () => {
	return (
		<div className='min-h-screen'>
			AdminDashboardHome
		</div>
	);
};

export default AdminDashboardHome;

import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
// components
import DashboardSidebar from '../../DashboardLayout/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../DashboardLayout/DashboardHeader/DashboardHeader';

const adminDashboardLinks = [
	{
		icon: <MdOutlineDashboard size={20} />,
		to: '/admin/dashboard',
		title : 'Dashboard'
	},
	{
		icon: <MdOutlineDashboard size={20} />,
		to: '/admin/dashboard',
		title : 'Dashboard'
	},
]

const AdminDashboardHome = () => {
	return (
		<div className='min-h-screen'>
			<div className='admin-dash-container grid grid-cols-12 gap-8 min-h-screen'>
				{/*****--------------dashboard left panel---------------*****/}
				<div className='col-span-2 py-5'>
					<DashboardSidebar />
				</div>

				{/*****--------------dashboard right panel---------------*****/}
				<div className='col-span-10 bg-light p-5'>
					<DashboardHeader />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboardHome;

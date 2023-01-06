import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../DashboardLayout/DashboardHeader/DashboardHeader';
import ContentCreatorSidebar from '../ContentCreatorSidebar/ContentCreatorSidebar';

const ContentCreatorDashboardComponent = () => {
  return (
		<div className='min-h-screen'>
			<div className='admin-dash-container grid grid-cols-12 gap-8 min-h-screen'>
				{/*****--------------dashboard left panel---------------*****/}
				<div className='col-span-2 py-5'>
					<ContentCreatorSidebar />
				</div>

				{/*****--------------dashboard right panel---------------*****/}
				<div className='col-span-10 bg-light p-5 space-y-10'>
					<DashboardHeader />
					<Outlet />
				</div>
			</div>
		</div>
  );
}

export default ContentCreatorDashboardComponent
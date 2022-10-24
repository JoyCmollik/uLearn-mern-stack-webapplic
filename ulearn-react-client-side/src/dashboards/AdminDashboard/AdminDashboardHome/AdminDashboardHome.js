import React from 'react';
import image from '../../../images/dashboard_background.svg';

const AdminDashboardHome = () => {
	return (
		<div
			style={{ background: `url(${image}) center/cover no-repeat` }}
			className='min-h-screen'
		>
    <div className="admin-dash-container grid grid-cols-12 gap-8 p-4 min-h-screen">
      <div className="col-span-2">
        {/* logo */}
        <div className="logo-container bg-white p-2 rounded-lg">
          
        </div>
      </div>
      <div className="col-span-10 bg-white rounded-lg"></div>
    </div>
		</div>
	);
};

export default AdminDashboardHome;

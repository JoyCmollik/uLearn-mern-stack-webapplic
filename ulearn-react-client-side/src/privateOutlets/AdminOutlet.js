import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'; 
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminOutlet = () => {
    const { user, loading } = useAuth();

    const location = useLocation();
    if(loading && !user) {
      return <div className='flex justify-center items-center h-screen'>
      <Spin />
      </div>
    }
 
  return user && user.role === 'admin' ? (
		<Outlet />
  ) : (
		<Navigate to='/' state={{ from: location }} />
  );
}

export default AdminOutlet
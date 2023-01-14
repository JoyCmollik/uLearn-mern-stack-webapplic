import { Spin } from 'antd';
import React from 'react'; 
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminOutlet = () => {
    const { user, loading } = useAuth();
 
  return user && user.role === 'admin' ? <Outlet /> : <Navigate to='/'  />
}

export default AdminOutlet
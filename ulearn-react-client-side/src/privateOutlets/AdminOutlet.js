import React from 'react'; 
import useAuth from '../hooks/useAuth';

const AdminOutlet = () => {
    const { user } = useAuth();
    console.log(user);
  return (
    <div>AdminOutlet</div>
  )
}

export default AdminOutlet
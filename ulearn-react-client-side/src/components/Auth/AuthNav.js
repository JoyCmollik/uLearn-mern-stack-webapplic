import React from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import LordIcon from '../layout/LordIcon/LordIcon';

const AuthNav = () => {
	return (
		<div className='auth-nav-wrapper border-b'>
			<nav className='py-10 flex justify-between items-center container mx-auto'>
				{/* back home */}
				<Link to='/' className='flex items-center space-x-2'>
					<span className='transform rotate-180'>
						<IoExitOutline size={20} />
					</span>
					<span className='capitalize'>back to home</span>
				</Link>
				{/* logo */}
				<h2 className='font-semibold text-2xl'>
					<span className='text-primary font-bold'>u</span>
					<span className='text-brand font-bold'>L</span>earn
				</h2>
				{/* login button */}
				<Link to='/auth/login' className='flex items-center space-x-2'>
					<LordIcon
						src={'https://cdn.lordicon.com/dxjqoygy.json'}
						size={28}
					/>
					<span className='capitalize m-0 p-0'>Login</span>
				</Link>
			</nav>
		</div>
	);
};

export default AuthNav;

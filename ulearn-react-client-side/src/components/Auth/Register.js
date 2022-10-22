import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import authImg from '../../images/auth_vector.svg';

const Register = () => {
	const { role } = useParams();
	const [userRole, setUserRole] = useState(role);
	return (
		<div className='grid grid-cols-12 min-h-screen'>
			<div className='col-span-5 bg-primary p-10 flex flex-col justify-between'>
				<div className='space-y-[48px]'>
					{/* logo */}
					<h2 className='font-semibold text-2xl'>
						<span className='text-secondary font-bold'>u</span>
						<span className='text-brand font-bold'>L</span>
						earn
					</h2>
					{/* description */}
					<h5 className='text-white text-2xl'>
						Explore more than hundreds of course made with quality
						and accuracy just for you.
					</h5>
				</div>
				<img className='w-[80%] mx-auto' src={authImg} alt='login' />
			</div>
			<div className='col-span-7'></div>
		</div>
	);
};

export default Register;

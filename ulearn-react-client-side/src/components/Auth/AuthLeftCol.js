import React from 'react';
import Lottie from '../layout/Lottie/Lottie';
import logo from '../../images/ulearn.png'

const AuthLeftCol = () => {
	return (
		<div className='col-span-5 bg-primary p-10 flex flex-col justify-between z-40'>
			<div className='space-y-[48px]'>
				{/* logo */}
				<div className=' flex items-center space-x-1'>
					<img
						className='w-[125px] h-[70px] object-cover'
						src={logo}
						alt='logo'
					/>
				</div>
				{/* description */}
				<h5 className='text-white text-2xl'>
					Explore more than hundreds of course made with quality and
					accuracy just for you.
				</h5>
			</div>
			<div className='flex justify-center items-center'>
				<Lottie
					src='https://assets9.lottiefiles.com/packages/lf20_ucbyrun5.json'
					size={{ width: 450, height: 450 }}
				/>
			</div>
		</div>
	);
};

export default AuthLeftCol;

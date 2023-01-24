import React from 'react';
import useAuthentication from '../../../hooks/useAuthentication';

const Features = () => {
	const { user } = useAuthentication();
	return (
		<section className='container mx-auto'>
			{/*---------------feature container--------------*/}

			<div className=' '>
				<div className='bg-[#E6F0F9] flex justify-around items-center space-y-4'>
					{/*---------------title--------------------*/}
					<div className=''>
						<h3 className='whitespace-pre-line text-[28px] font-bold'>
							{user
								? 'Become a new instructor'
								: 'Join now to start learning'}
						</h3>
						{/*---------------button--------------------*/}

						<button
							className={`bg-[#0b5ed7] text-base capitalize font-normal px-6 py-2 text-light rounded-md`}
						>
							{user ? 'become instructor' : 'get started'}
						</button>
					</div>
					<div>
						<img
							src='https://demo.creativeitem.com/academy/assets/frontend/default/img/join-as-student.png'
							alt=''
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;

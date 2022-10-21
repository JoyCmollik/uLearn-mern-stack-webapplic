import React from 'react';

const Categories = ({ icon, title, desc, bgColor }) => {
	return (
		<div className='card w-96 bg-base-100 shadow-lg mx-auto'>
			<div className='card-body'>
				<div className='flex gap-2 items-center justify-center'>
					<div className={` p-4 rounded-full gap-4 ${bgColor}`}>
						{icon}
					</div>
					<div>
						<h2 className='card-title'>{title}</h2>
						<p className='text-base w-48'>{desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;

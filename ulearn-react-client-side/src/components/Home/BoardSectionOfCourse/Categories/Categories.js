import { Card } from 'antd';
import React from 'react';

const Categories = ({ icon, title, desc, bgColor }) => {
	return (
		<Card
			style={{
				margin: '0 auto',
				borderRadius: '8px',
			}}
		>
			<div className='flex space-x-4 items-center justify-center mx-auto'>
				<div className={` p-4 rounded-full  ${bgColor}`}>{icon}</div>
				<div>
					<h2 className='card-title'>{title}</h2>
					<p className='text-base'>{desc}</p>
				</div>
			</div>
		</Card>
	);
};

export default Categories;

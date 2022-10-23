import { Card } from 'antd';
import React from 'react';

const Categories = ({ icon, title, desc, bgColor }) => {
	return (
		<Card
			style={{
				width: '326px',
				margin: '0 auto',
				borderRadius: '8px',
			}}
		>
			<div className='flex space-x-4 items-center justify-center '>
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

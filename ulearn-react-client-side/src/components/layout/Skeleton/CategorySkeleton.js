import { Skeleton } from 'antd';
import React from 'react';

const CategorySkeleton = () => {
	return (
		<div className='mx-auto text-center flex flex-col justify-center items-center space-y-2'>
			<Skeleton.Input size='large' active />
			<Skeleton.Title active width={24} />
		</div>
	);
};

export default CategorySkeleton;

import { Button, Result, Spin } from 'antd';
import React from 'react';
import Loading from '../../../../components/layout/Loading/Loading';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';

const AddFinishing = ({ isUploading }) => {
	return (
		<div className=''>
			<Result
				icon={
					<LordIcon
						src='https://cdn.lordicon.com/lupuorrc.json'
						size={100}
					/>
				}
				title='Great, we have done all the operations!'
				extra={
					<button
						className='block w-full px-4 py-2 border rounded-lg bg-primary text-white font-bold'
						type='submit'
					>
						{isUploading ? <Loading size='small' /> : 'Submit'}
					</button>
				}
			/>
		</div>
	);
};

export default AddFinishing;

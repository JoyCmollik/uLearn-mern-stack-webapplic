import { Button, Checkbox, InputNumber } from 'antd';
import React from 'react';

const AddPricing = ({ handleActiveTab }) => {
	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Price</label>
				<InputNumber
					style={{ width: '400px !important' }}
					size='large'
					name='title'
				/>
			</div>{' '}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<Checkbox>Check if this is a free course.</Checkbox>
			</div>
			<Button
				onClick={() => handleActiveTab('5')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddPricing;

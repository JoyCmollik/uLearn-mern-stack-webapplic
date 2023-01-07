import React from 'react';
import { Button, Checkbox, InputNumber } from 'antd';
import { Controller } from 'react-hook-form';

const EditPricing = ({ handleActiveTab, control }) => {
	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Course Price</label>
				<Controller
					name='coursePrice'
					control={control}
					render={({ field }) => (
						<InputNumber
							{...field}
							style={{ width: '400px !important' }}
							size='large'
						/>
					)}
				/>
			</div>{' '}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<Controller
					name='isFree'
					control={control}
					render={({ field }) => (
						<Checkbox {...field}>
							Check if this is a free course.
						</Checkbox>
					)}
				/>
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

export default EditPricing;

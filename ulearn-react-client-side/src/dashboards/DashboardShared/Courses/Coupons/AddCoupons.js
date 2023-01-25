import React from 'react';
import { Button, DatePicker, Input, PageHeader } from 'antd';
// import addCategory from '../../../../images/add_category.svg';

const AddCoupons = () => {
    const onChange = (date, dateString) => {
		console.log(date, dateString);
	};
	return (
		<div className='border-[0.5px] rounded-lg overflow-hidden '>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Add a new coupon'
				subTitle='if you go back, no changes are saved....'
			>
				<div className='grid grid-cols-12 min-h-[25vh] rounded-lg p-4'>
					<div className='col-span-5 bg-white'>
						<form className='grid grid-cols-12 gap-4 p-8 bg-light rounded-lg'>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Coupon Code
								</label>
								<Input size='large' name='title' />
							</div>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Discount Percentage
								</label>
								<Input size='large' name='title' />
							</div>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
                                    Expiry Date
								</label>
								<DatePicker onChange={onChange} size='large' />
							</div>

							<Button className='col-span-12 mt-4' type='primary'>
								Add Coupon
							</Button>
						</form>
					</div>
					<div className='col-span-7'>
						{/* <img
							className='object-cover w-10/12 mx-auto'
							src={addCategory}
							alt='add-category'
						/> */}
					</div>
				</div>
			</PageHeader>
		</div>
	);
};

export default AddCoupons;

import React from 'react';

// library components
import { Table, Input } from 'antd';
import { TfiMore } from 'react-icons/tfi';
import CustomSelect from '../../../DashboardLayout/CustomSelect/CustomSelect';
const { Search } = Input;

const columns = [
	{
		title: '#',
		dataIndex: '_id',
		key: '_id',
		render: (text) => <a>{text}</a>,
	},
	{
		title: 'Coupon Code',
		dataIndex: 'coupon_code',
		key: 'coupon_code',
	},
	{
		title: 'Discount Percentage',
		dataIndex: 'discount',
		key: 'discount',
		render: (discount) => (
			<p className='text-font2 m-0'>
				{discount}
				<span className='font-medium text-font1'>
					{discount ? '%' : null}
				</span>
			</p>
		),
	},
    {
		title: 'Validity Till',
		dataIndex: 'validity',
		key: 'validity',
	},
	{
		title: 'Action',
		key: 'action',
		render: () => (
			<button className='text-primary px-2 py-[0.5px] rounded-lg border border-primary'>
				<TfiMore size={18} />
			</button>
		),
	},
];

const data = [
	{
		_id: '1',
		coupon_code: 'John Brown',
		discount: 32,
		validity: 'New York No. 1 Lake Park',
	},
];

const CouponsList = () => {
  return (
		<div className='space-y-8'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-2'>
					<span>Show</span>
					<span>
						<CustomSelect defaultValue='25' />
					</span>
					<span>entries</span>
				</div>
				<Search
					placeholder='input search text'
					// onSearch={onSearch}
					enterButton
					size='large'
					style={{
						width: '25%',
					}}
				/>
			</div>
			<Table columns={columns} dataSource={data} />
		</div>
  );
}

export default CouponsList
import React from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AddCoupons from './AddCoupons';
import CouponsList from './CouponsList';

const Coupons = () => {
  const location = useLocation();

  return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Coupons</h4>
				{/* add new course */}
				{location.pathname.includes('add') ? null : (
					<Link to='add'>
						<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
							<MdOutlinePostAdd size={20} />{' '}
							<span>Add new coupon</span>
						</button>
					</Link>
				)}
			</div>
			<div className='space-y-8 min-h-[71vh] '>
				<Routes>
					<Route index element={<CouponsList />} />
					<Route path='add' element={<AddCoupons />} />
				</Routes>
			</div>
		</div>
  );
}

export default Coupons
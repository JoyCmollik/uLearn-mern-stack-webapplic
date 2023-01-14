import React from 'react';
import BreadcrumbComponents from '../BreadcrumbComponent/BreadcrumbComponents';

const Banner = () => {
	return (
		<div className='bg-gradient-to-r from-[#020024] to-[#090979] border-box border border-black pt-10 pb-10 flex justify-center items-center'>
			<div className='text-light mx-auto text-center  flex flex-col items-center justify-center'>
				{/*-------------------title-------------------------*/}
				<h3 className='text-light text-[41px] text-center'>Courses</h3>
				{/*---------------------breadcrumb----------------------*/}
				<BreadcrumbComponents />
			</div>
		</div>
	);
};

export default Banner;

import { Rate } from 'antd';
import React, { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css/effect-fade';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './instructor.css';
// import required modules
import { Pagination, Zoom } from 'swiper';
import { Link } from 'react-router-dom';

const Instructors = ({ instructors }) => {
	const [value, setValue] = useState(3);

	SwiperCore.use([Autoplay]);
	return (
		<section className=' container mx-auto  '>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Instructors</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Learn from the experienced & skillful instructors
			</p>
			<div className='grid grid-cols-1 gap-4 mx-auto items-center justify-center'>
				<Swiper
					slidesPerView={5}
					spaceBetween={50}
					grabCursor={true}
					pagination={{
						clickable: true,
					}}
					centeredSlides={true}
					loop={true}
					loopFillGroupWithBlank={true}
					zoom={true}
					modules={[Zoom, Pagination]}
					className='mySwiper'
					autoplay={{ delay: 2000 }}
				>
					{instructors.length > 0
						? instructors?.map((instructor) => {
								const { _id } = instructor;

								return (
									<SwiperSlide key={_id}>
										<div className='mx-auto flex flex-col space-y-3 justify-center items-center mb-20'>
											<div className='mx-auto w-[150px] h-[150px]'>
												<img
													src={
														instructor?.user
															?.avatarURL
													}
													alt=''
													className='object-cover rounded-full'
												/>
											</div>
											<h2 className='text-center text-lg font-bold'>
												{instructor?.user?.name}
											</h2>
											<p className='text-base'>
												Student at{' '}
												{instructor?.institutionName}
											</p>
											<p className='text-sm text-font2'>
												{instructor?.degreeTitle}
											</p>
											{/* <Rate
												onChange={setValue}
												value={value}
											/> */}
											<Link
												to={`/content-writer-profile/${_id}`}
											>
												<button className='text-primary border border-primary py-2 px-3 text-sm rounded-lg '>
													View Profile
												</button>
											</Link>
										</div>
									</SwiperSlide>
								);
						  })
						: null}
				</Swiper>
			</div>
		</section>
	);
};

export default Instructors;

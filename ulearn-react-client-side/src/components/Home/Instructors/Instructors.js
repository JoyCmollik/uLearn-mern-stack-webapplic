import { Rate } from 'antd';
import React, { useState } from 'react';

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

const instructors = [
	{
		id: 1001,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/1016/avatar/617a4f17c8e72.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
	{
		id: 1002,
		name: 'Ricardo Dave',

		img: 'https://lms.rocket-soft.org/store/923/avatar/617a4f9983fe5.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
	{
		id: 1003,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/934/avatar/617a4f418be6b.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
	{
		id: 1004,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/1015/avatar/617a4f2fb8a6d.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
	{
		id: 1005,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/870/avatar/617a4f7c09d61.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
	{
		id: 1006,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/929/avatar/617a4f5d834c8.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
	},
];

const Instructors = () => {
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
					{instructors.map((instructor) => {
						const { id, name, img, position, rating } = instructor;

						return (
							<SwiperSlide>
								<div
									key={id}
									className='mx-auto flex flex-col space-y-3 justify-center items-center mb-20'
								>
									<div className='mx-auto'>
										<img
											src={img}
											alt=''
											className='rounded-full'
										/>
									</div>
									<h2 className='text-center text-lg font-bold'>
										{name}
									</h2>
									<p className='text-base'>{position}</p>
									<Rate onChange={setValue} value={rating} />
									<button className='bg-primary text-white py-2 px-3 text-sm rounded-lg '>
										Reserve a live meeting
									</button>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
};

export default Instructors;

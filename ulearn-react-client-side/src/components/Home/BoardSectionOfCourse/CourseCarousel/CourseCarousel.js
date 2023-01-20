import React, { useState } from 'react';
import CourseCard from '../CoursesCard/CourseCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper';
import { HiChevronRight, HiOutlineChevronLeft } from 'react-icons/hi2';
import './CourseCarousel.css';
// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';

const CourseCarousel = ({ courses }) => {
	const [swiper, setSwiper] = useState();
	return (
		<div className='carousel-container relative '>
			<Swiper
				spaceBetween={10}
				slidesPerView={5}
				navigation={{
					prevEl: '.prev',
					nextEl: '.next',
				}}
				loop={true}
				modules={[Navigation]}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => {
					setSwiper(swiper);
				}}
			>
				{courses.map((course) => (
					<SwiperSlide key={course.id}>
						<CourseCard course={course} />
					</SwiperSlide>
				))}
			</Swiper>
			{/* buttons */}
			<button className='prev z-10 absolute top-[35%] -left-4 p-3 rounded-full bg-white drop-shadow-lg transform transition duration-200 hover:scale-[1.1] hover:text-primary'>
				<HiOutlineChevronLeft />
			</button>
			<button className='next z-10 absolute top-[35%] -right-4 p-3 rounded-full bg-white drop-shadow-lg transform transition duration-200 hover:scale-[1.1] hover:text-primary'>
				<HiChevronRight />
			</button>
		</div>
	);
};

export default CourseCarousel;

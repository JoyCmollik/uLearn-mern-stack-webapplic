import React, { useState } from 'react';
import CourseCard from '../CoursesCard/CourseCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Navigation } from 'swiper';
import { HiChevronRight, HiOutlineChevronLeft } from 'react-icons/hi2'

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';

const CourseCarousel = ({ courses }) => {
	const [swiper, setSwiper] = useState();
	return (
		<div className='carousel-container relative'>
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
					console.log(swiper);
					setSwiper(swiper);
				}}
			>
				{courses.map((course) => (
					<SwiperSlide key={course._id}>
						<CourseCard course={course} />
					</SwiperSlide>
				))}
			</Swiper>
			{/* buttons */}
			<button className='prev z-10 absolute top-[35%] -left-4 p-3 rounded-full bg-white drop-shadow-lg transform transition duration-200 hover:scale-[1.1] hover:text-primary' ><HiOutlineChevronLeft /></button>
			<button className='next z-10 absolute top-[35%] -right-4 p-3 rounded-full bg-white drop-shadow-lg transform transition duration-200 hover:scale-[1.1] hover:text-primary' ><HiChevronRight /></button>
			{/* <div className='carousel w-full'>
				<div id='slide1' className='carousel-item relative w-full'>
					<div className='flex flex-wrap mx-auto md:flex-none md:flex-nowrap'>
						{courses.slice(0, 4).map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a href='#slide1' className='btn btn-circle'>
							❮
						</a>
						<a href='#slide2' className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
				<div id='slide2' className='carousel-item relative w-full'>
					<div className='flex flex-wrap md:flex-none md:flex-nowrap mx-auto'>
						{courses.slice(4, 8).map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
					<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
						<a href='#slide1' className='btn btn-circle'>
							❮
						</a>
						<a href='#slide2' className='btn btn-circle'>
							❯
						</a>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default CourseCarousel;

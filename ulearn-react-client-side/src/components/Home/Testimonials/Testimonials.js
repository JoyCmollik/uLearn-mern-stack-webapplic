import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css/effect-fade';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../Instructors/instructor.css';
// import required modules
import { Pagination, Zoom } from 'swiper';
import { Rate } from 'antd';
const instructors = [
	{
		id: 1001,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/1016/avatar/617a4f17c8e72.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
	{
		id: 1002,
		name: 'Ricardo Dave',

		img: 'https://lms.rocket-soft.org/store/923/avatar/617a4f9983fe5.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
	{
		id: 1003,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/934/avatar/617a4f418be6b.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
	{
		id: 1004,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/1015/avatar/617a4f2fb8a6d.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
	{
		id: 1005,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/870/avatar/617a4f7c09d61.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
	{
		id: 1006,
		name: 'Ricardo Dave',
		img: 'https://lms.rocket-soft.org/store/929/avatar/617a4f5d834c8.png',
		position: 'Data Analyst at Microsoft',
		rating: 5,
		review: 'Iam really satistfied with Ulearn its perfect for our business',
	},
];
const Testimonials = () => {
	const [value, setValue] = useState(3);
	SwiperCore.use([Autoplay]);
	return (
		<section className=' container mx-auto min-h-screen '>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold text-center'>Testimonials</h2>
			<p className='text-gray-500 text-base font-normal text-center'>
				#What our Customer says about us
			</p>
			<div className='grid grid-cols-1 gap-4 mx-auto items-center justify-center'>
				<Swiper
					slidesPerView={3}
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
						const { id, name, img, position, rating, review } =
							instructor;

						return (
							<SwiperSlide>
								<div
									key={id}
									className='mx-auto flex flex-col justify-center items-center my-10 relative  pb-10 pt-20 px-6'
								>
									<div className='border rounded-lg'>
										<h2 className='text-center text-lg font-bold pt-12 '>
											{name}
										</h2>
										<p className='text-base text-gray-500 mb-0'>
											{position}
										</p>
										<Rate
											onChange={setValue}
											value={rating}
										/>
										<p className='text-gray-500'>
											{review}
										</p>
									</div>
									<div className='mx-auto absolute top-5  w-24  h-24 '>
										<img
											src={img}
											alt=''
											className='rounded-full'
										/>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
};

export default Testimonials;

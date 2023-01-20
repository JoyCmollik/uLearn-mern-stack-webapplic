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
import axios from 'axios';
import { Link } from 'react-router-dom';

/* const instructors = [
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
 */
const Instructors = () => {
	const [value, setValue] = useState(3);
	const [instructors, setInstructors] = useState([]);
	useEffect(() => {
		axios
			.get('/users?role=instructor')
			.then((response) => {
				setInstructors(response.data.users);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
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
					{instructors?.map((instructor) => {
						const { _id, name, avatarURL } = instructor;

						return (
							<SwiperSlide key={_id}>
								<div className='mx-auto flex flex-col space-y-3 justify-center items-center mb-20'>
									<div className='mx-auto w-[250px] h-[250px]'>
										<img
											src={avatarURL && avatarURL}
											alt=''
											className=' object-cover   rounded-full'
										/>
									</div>
									<h2 className='text-center text-lg font-bold'>
										{name && name}
									</h2>
									<p className='text-base'>
										Data Analyst at Microsoft
									</p>
									<Rate onChange={setValue} value={value} />
									<Link to={`/content-writer-profile/${_id}`}>
										<button className='bg-primary text-white py-2 px-3 text-sm rounded-lg '>
											View Profile
										</button>
									</Link>
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

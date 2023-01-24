import React, { useState } from 'react';

import authImg from '../../images/auth_vector.svg';

import { message, Rate } from 'antd';

import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import axios from 'axios';

const Testimonial = () => {
	const [value, setValue] = useState(3);

	const [person, setPerson] = useState({
		userName: '',
		occupation: '',
		rate: value,
		comment: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { userName, occupation, rate, comment } = person;

		if (userName && occupation && rate && comment) {
			const data = {
				userName,
				occupation,
				rate,
				comment,
			};
			//		console.log(data);
			axios
				.post('/testimonials', data)
				.then((response) => {
					console.log(response.data.testimonial);
					message.success('testimonial created successfully');
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setPerson({
						userName: '',
						occupation: '',
						rate: value,
						comment: '',
					});
				});
		} else {
			message.warning('Inputs should be filled!');
		}
	};

	return (
		<>
			<NavigationBar theme='light' />
			<section>
				<div className='bg-light h-[25vh]'></div>
				<div
					className='bg-white'
					style={{ minHeight: 'calc(75vh - 81px)' }}
				>
					{/* container */}
					<div className='transform -translate-y-[10vh] container mx-auto bg-white rounded-lg grid grid-cols-12 p-4 h-full drop-shadow'>
						{/* ---------- My Courses Nav ---------- */}
						<div className='col-span-5 rounded-lg p-4 bg-light space-y-4'>
							<div className='px-4 py-2 rounded-lg border bg-white'>
								Testimonial
							</div>
							<div className='p-4 bg-white rounded-lg'>
								{/* <img
									className='w-full h-[250px] object-fit'
									src={courseImage}
									alt='course-imgs'
								/> */}
								<lottie-player
									autoplay
									loop
									background='white'
									src='https://assets5.lottiefiles.com/packages/lf20_tb15abek.json'
									style={{ width: '100%', height: '350px' }}
								/>
							</div>
						</div>

						{/*----------------------------------------right side of the page---------------------------------------------- */}

						<div className='col-span-7 flex justify-center items-center'>
							<div className='w-7/12 space-y-8'>
								{/* title */}
								<div className='space-y-2'>
									<h4 className='text-2xl font-medium'>
										Write A Testimonial
									</h4>
								</div>
								{/*-----------------------------forms------------------------------------ */}
								<form
									onSubmit={handleSubmit}
									className='grid grid-cols-12 gap-4'
								>
									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Name
										</label>
										<input
											type='text'
											placeholder='User Name'
											name='userName'
											className='input input-bordered w-full'
											value={person.userName}
											onChange={handleChange}
										/>
									</div>

									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Occupation
										</label>
										<input
											type='text'
											placeholder='occupation'
											name='occupation'
											className='input input-bordered w-full'
											value={person.occupation}
											onChange={handleChange}
										/>
									</div>
									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Rate
										</label>
										<Rate
											value={value}
											onChange={setValue}
										/>
									</div>
									{/* form input */}
									<div className='col-span-12 form-control w-full'>
										<label className='label font-medium'>
											Leave a review
										</label>
										<textarea
											cols={100}
											rows={5}
											placeholder='write a review.....'
											name='comment'
											className='input input-bordered w-full h-full'
											value={person.comment}
											onChange={handleChange}
										/>
									</div>
									{/* submit button */}
									<button
										type='submit'
										className='col-span-12 py-2 font-medium bg-primary text-white rounded-lg'
									>
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className='bg-background1 bg-center bg-cover'>
				<FooterComponent />
			</div>
		</>
	);
};

export default Testimonial;

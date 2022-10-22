import React from 'react';

const CourseCarousel = ({ courses }) => {
	return (
		<div className='carousel w-full'>
			<div id='slide1' className='carousel-item relative w-full'>
				{courses.slice(0, 4).map((course) => {
					return (
						<div className='card w-72 bg-white  shadow-xl mx-auto border border-black'>
							<figure className='px-3 pt-3'>
								<img
									src='https://placeimg.com/400/225/arch'
									alt='Shoes'
									className='rounded-xl'
								/>
							</figure>
							<div className='card-body items-center text-center'>
								<h2 className='card-title'>Shoes!</h2>
								<p>
									If a dog chews shoes whose shoes does he
									choose?
								</p>
								<div className='card-actions'>
									<button className='btn btn-primary'>
										Buy Now
									</button>
								</div>
							</div>
						</div>
					);
				})}
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide4' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide2' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
			<div id='slide2' className='carousel-item relative w-full'>
				{courses.slice(4, 8).map((course) => {
					return (
						<div className='card w-72 bg-white  shadow-xl mx-auto border border-black'>
							<figure className='px-3 pt-3'>
								<img
									src='https://placeimg.com/400/225/arch'
									alt='Shoes'
									className='rounded-xl'
								/>
							</figure>
							<div className='card-body items-center text-center'>
								<h2 className='card-title'>Shoes!</h2>
								<p>
									If a dog chews shoes whose shoes does he
									choose?
								</p>
								<div className='card-actions'>
									<button className='btn btn-primary'>
										Buy Now
									</button>
								</div>
							</div>
						</div>
					);
				})}
				<div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
					<a href='#slide1' className='btn btn-circle'>
						❮
					</a>
					<a href='#slide3' className='btn btn-circle'>
						❯
					</a>
				</div>
			</div>
		</div>
	);
};

export default CourseCarousel;

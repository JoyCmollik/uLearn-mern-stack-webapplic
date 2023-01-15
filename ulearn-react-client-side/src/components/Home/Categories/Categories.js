import React from 'react';
const categories = [
	{
		id: '2001',
		title: 'Management',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
	{
		id: '2002',
		title: 'Business Strategy',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
	{
		id: '2003',
		title: 'LifeStyle',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
	{
		id: '2004',
		title: 'Health & Fitness',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
	{
		id: '2005',
		title: 'Science',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
	{
		id: '2006',
		title: 'Design',
		img: 'https://i.ibb.co/Q697ph9/course-thumbnail.jpg',
	},
];
const Categories = () => {
	return (
		<section className='container mx-auto min-h-fit'>
			{/*--------------- title ----------------------- */}
			<h2 className='text-2xl font-bold'>Trending Categories</h2>
			<p className='text-gray-500 text-base font-normal'>
				#Browse trending & popular learning topics
			</p>
			<div className='grid grid-cols-6 mx-auto gap-4  w-85'>
				{categories.map((category) => {
					const { id, title, img } = category;
					return (
						<div key={id} className='mx-auto text-center'>
							<div>
								<img
									src={img}
									alt=''
									className='bg-secondary rounded-3xl '
								/>
							</div>
							<p className='-mt-3 border  rounded-2xl mx-auto text-center text-lg py-2 px-6 bg-white inline-block capitalize hover:bg-primary hover:text-white hover:border-primary'>
								1 Course
							</p>
							<h2 className='text-xl text-center tracking-wider'>
								{' '}
								{title}
							</h2>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Categories;

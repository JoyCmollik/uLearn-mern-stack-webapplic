import React from 'react';

const features = [
	{
		id: 44,
		title: `Join now to start  
     learning`,
		btnText: 'get started',
		img: 'https://demo.creativeitem.com/academy/assets/frontend/default/img/join-as-student.png',
		bgColor: 'bg-[#E6F0F9]',
		btnColor: 'bg-[#0b5ed7]',
	},
	{
		id: 45,
		title: `Become a new
    instructor`,
		btnText: 'join now',
		img: 'https://demo.creativeitem.com/academy/assets/frontend/default/img/join-as-instructor.png',
		bgColor: 'bg-[#FCEBEB]',
		btnColor: 'bg-[#EC5252]',
	},
];

const Features = () => {
	return (
		<section className='min-h-fit mb-20 container mx-auto'>
			{/*---------------feature container--------------*/}
			<div className='flex justify-center items-center space-x-5'>
				{features.map((feature) => {
					const { id, title, btnText, img, bgColor, btnColor } =
						feature;
					return (
						<article key={id} className='border-box '>
							<div
								className={` ${bgColor} flex px-[25px] rounded-md shadow-sm pt-[30px] pb-5`}
							>
								{/*---------------title--------------------*/}
								<div className='flex flex-col justify-start items-start space-y-4'>
									<h3 className='whitespace-pre-line text-[28px] font-bold'>
										{title}
									</h3>
									{/*---------------button--------------------*/}

									<button
										className={`${btnColor} text-base capitalize font-normal px-6 py-2 text-light rounded-md`}
									>
										{btnText}
									</button>
								</div>
								<div>
									<img src={img} alt='' />
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default Features;

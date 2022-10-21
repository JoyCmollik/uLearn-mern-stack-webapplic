import React from 'react';
import AuthNav from '../../components/Auth/AuthNav';
import learnerImg from '../../images/learner.svg';
import contentImg from '../../images/content_creator.svg';
import clientImg from '../../images/client.svg';

const userRoles = [
	{
		title: 'Learner',
		img: learnerImg,
		desc: "Experience LearnDash from the learner's perspective.",
    role: 'learner'
	},
	{
		title: 'Content Creator',
		img: contentImg,
		desc: "Experience LearnDash from the learner's perspective.",
    role: 'content-creator'
	},
	{
		title: 'Client',
		img: clientImg,
		desc: "Experience LearnDash from the learner's perspective.",
    role: 'client'
	},
];

const Auth = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			{/* auth navbar */}
			<AuthNav />
			{/* role list */}
			<div className='flex-grow container mx-auto flex flex-col justify-center items-center space-y-8'>
				{/* title */}
				<div className='space-y-4 text-center'>
					<h2 className='text-4xl font-[500]'>
						Experience with uLearn
					</h2>
					<p className='text-gray-500'>choose your adventure below</p>
				</div>
				{/* List of roles */}
				<div className='grid grid-cols-3 gap-8'>
					{userRoles.map(({title, img, desc, role}, roleIdx) => (
						<article key={roleIdx} className='border border-gray-200'>
							<img
								className='w-[50%] mx-auto object-cover mt-8'
								src={img}
								alt='content-creator'
							/>
							<div className='p-8 space-y-4'>
								<h4 className='text-2xl'>{title}</h4>
								<p className='text-gray-500 w-3/4'>
									{desc}
								</p>
								<button className='block w-full py-2 border border-primary text-primary text-lg font-medium rounded-[40px]'>
									Register as a {title}
								</button>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
};

export default Auth;

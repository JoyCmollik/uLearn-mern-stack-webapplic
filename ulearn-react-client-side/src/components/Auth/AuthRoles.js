import React from 'react';
import AuthNav from '../../components/Auth/AuthNav';
import learnerImg from '../../images/auth-user.svg';
import contentImg from '../../images/content_creator.svg';
import clientImg from '../../images/client.svg';
import { Link } from 'react-router-dom';

const userRoles = [
	{
		title: 'Learner',
		img: learnerImg,
		desc: "Experience LearnDash from the learner's perspective.",
		role: 'learner',
	},
	{
		title: 'Content Creator',
		img: contentImg,
		desc: 'Flourish your creativity and talent with your creations by choosing us.',
		role: 'content-creator',
	},
	{
		title: 'Client',
		img: clientImg,
		desc: 'Make your business grow exponentially by our deals.',
		role: 'client',
	},
];

const AuthRoles = () => {
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
				{/* List of role cards */}
				<div className='grid grid-cols-3 gap-8'>
					{userRoles.map(({ title, img, desc, role }, roleIdx) => (
						<article
							key={roleIdx}
							className='border border-gray-200 flex flex-col justify-between'
						>
							<img
								className='w-[50%] mx-auto object-cover mt-8'
								src={img}
								alt='content-creator'
							/>
							<div className='p-8 space-y-4'>
								<h4 className='text-2xl'>{title}</h4>
								<p className='text-gray-500 w-3/4'>{desc}</p>
								<Link
									className='block'
									to={`/auth/register/${role}`}
								>
									<button className='block w-full py-2 border border-primary text-primary text-lg font-medium rounded-[40px] transition ease-in-out duration-200 hover:bg-primary hover:text-white'>
										Register as a {title}
									</button>
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
};

export default AuthRoles;

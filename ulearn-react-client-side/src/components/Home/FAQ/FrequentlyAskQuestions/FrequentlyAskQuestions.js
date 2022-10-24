import React from 'react';
import CollapseItems from '../CollapseItems/CollapseItems';

const FrequentlyAskQuestions = () => {
	return (
		<section className='container mx-auto min-h-screen border-box mb-20'>
			<div className='flex flex-row justify-center px-20 space-x-8'>
				<article className='w-[431px]'>
					{/*----------------------title-------------------------*/}
					<h2 className='text-[41px] capitalize'>
						Frequently ask <br /> question
					</h2>
					<p className='text-sm whitespace-nowrap'>
						CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW <br />
						ADDITIONS
					</p>
					{/*----------------------Collapse-------------------------*/}
					<div className=''>
						<CollapseItems />
					</div>
				</article>
				<article>
					{/*----------------------image-------------------------*/}
					<img
						src='https://lmszai.zainikthemes.com/uploads_demo/setting/faq-img.jpg'
						alt='temporaryImage'
					/>
				</article>
			</div>
		</section>
	);
};

export default FrequentlyAskQuestions;

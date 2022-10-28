import React from 'react';
import CollapseItems from '../CollapseItems/CollapseItems';

const FrequentlyAskQuestions = () => {
	return (
		<section className='container mx-auto min-h-screen'>
			<div className='grid grid-cols-1 md:grid-cols-2 justify-items-end'>
				<article className=''>
					{/*----------------------title-------------------------*/}
					<h2 className='text-[41px] capitalize '>
						Frequently ask <br /> question
					</h2>
					<p className='text-sm '>
						CHOOSE FROM 5,000 ONLINE VIDEO COURSES WITH NEW
						ADDITIONS
					</p>
					{/*----------------------Collapse-------------------------*/}
					<div className=''>
						<CollapseItems />
					</div>
				</article>
				<article className=' '>
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

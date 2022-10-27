import React, { useState } from 'react';
import FilteredCards from '../FilteredCards/FilteredCards';
import FilterMenu from '../FilterMenu/FilterMenu';
import { BiFilterAlt } from 'react-icons/bi';
const FilterCourse = () => {
	const [show, setShow] = useState(false);
	return (
		<section className='min-h-screen border-box mb-20'>
			{/*------------------filter button toggle----------  */}
			<div className='container mx-auto'>
				<button
					type='button'
					onClick={() => setShow(!show)}
					className='px-[15px] py-[5px] border text-font2 capitalize outline  outline-1 outline-gray-300 hover:outline-violet-800 mb-8'
				>
					<BiFilterAlt className='inline text-sm ' /> filter
				</button>
				<div className='container mx-auto '>
					<div className='flex '>
						{show && (
							<article className='w-[260px]'>
								<FilterMenu />
							</article>
						)}
						<article className='border-t border-gray-300  '>
							<FilteredCards show={show} />
						</article>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FilterCourse;

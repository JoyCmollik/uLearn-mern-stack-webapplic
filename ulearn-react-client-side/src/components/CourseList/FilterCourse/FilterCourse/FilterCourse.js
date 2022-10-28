import React, { useState } from 'react';
import FilteredCards from '../FilteredCards/FilteredCards';
import FilterMenu from '../FilterMenu/FilterMenu';
import { BiFilterAlt } from 'react-icons/bi';
const FilterCourse = () => {
	const [show, setShow] = useState(true);
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
					{/*------------------filterMenu----------  */}
					<div className='grid grid-cols-12 '>
						{show && (
							<aside className='col-span-3'>
								<FilterMenu />
							</aside>
						)}
						{/*------------------filtercards----------  */}
						<div className='border-t border-gray-300 col-span-9 '>
							<FilteredCards show={show} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FilterCourse;

import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchField = () => {
	return (
		<div className='flex items-center bg-white border border-gray-500 rounded-full gap-2 text-base py-2 ml:0   w-full '>
			<AiOutlineSearch className='text-xl ml-3 inline-block text-gray-500 ' />
			<input
				type='text'
				placeholder='Search Course...'
				className='text-base text-black focus:outline-none m-1 '
			/>
		</div>
	);
};

export default SearchField;

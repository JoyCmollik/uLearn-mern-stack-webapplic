import React from 'react'

const Section = ({data}) => {
    const { sectionItem, currSection, handleCurrSection } = data;
  return (
		<>
			{/*****--------------Section Item---------------*****/}
			<article
				key={sectionItem?._id}
				onClick={() => handleCurrSection(sectionItem)}
				className={`block px-2 py-2 border-l-2 bg-primary cursor-pointer bg-opacity-5 ${
					currSection._id === sectionItem._id
						? 'border-l-primary'
						: 'border-l-transparent'
				}`}
			>
				<h5 className='text-lg font-light m-0'>
					Section {sectionItem.section}
				</h5>
				<p className='m-0 text-xs font-light text-font2'>
					Lessons: {sectionItem?.lessons?.length || 0}
				</p>
			</article>
		</>
  );
}

export default Section
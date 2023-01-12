import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input, message, Spin } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';

const AddRequirement = ({ handleActiveTab, requirement, setRequirement }) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const requirementRef = useRef(null);

	const handleRequirementList = (e) => {
		e.preventDefault();
		const currRequirement = requirementRef.current.value;
		if (currRequirement === null || currRequirement.trim() === '') {
			message.warning('Requirement input is empty!');
			return;
		}

		setRequirement((prevList) => [...prevList, currRequirement]);
		requirementRef.current.value = '';
	};

	const handleDeleteItem = (e, item) => {
		e.preventDefault();
		setIsUpdating(true);
		setRequirement((prevList) =>
			prevList.filter((prevItem) => prevItem !== item)
		);
		setIsUpdating(false);
	};

	return (
		<div className='grid grid-cols-12 w-11/12 gap-4 p-4'>
			<label className='col-span-12 text-font2 uppercase'>Requirements</label>
			<div className='col-span-12 grid grid-cols-12 border rounded-lg p-1'>
				<input
					autoFocus={true}
					ref={requirementRef}
					className='col-span-8 outline-none bg-transparent border-none px-2'
					size='large'
				/>
				<button
					onClick={handleRequirementList}
					className='col-span-4 px-4 py-1 border border-primary rounded-lg text-primary disabled:border-blue-200 flex justify-center items-center space-x-2'
					disabled={isUpdating}
				>
					{isUpdating ? (
						<>
							<Spin size='small' />{' '}
							<span className='ml-2'>Adding...</span>
						</>
					) : (
						<>
							<HiPlus size={18} /> <span>Add Requirement</span>
						</>
					)}
				</button>
			</div>
			{requirement.length > 0 && (
				<div className='col-span-12 border rounded-lg p-2 space-y-2'>
					{requirement.map((requirement, requIdx) => (
						<div
							className='flex justify-between items-center p-2 border rounded-lg'
							key={requIdx}
						>
							<p className='m-0'> {requirement} </p>
							<div className='flex items-start space-x-2'>
								{/* <button className='p-1 border border-primary rounded-lg text-xs text-primary'>
								<MdEdit size={16} />
							</button> */}

								<button
									onClick={(e) =>
										handleDeleteItem(e, requirement)
									}
									className='p-1 border border-error bg-error rounded-lg text-xs text-white'
								>
									<MdDelete size={16} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
			<Button
				onClick={() => handleActiveTab('4')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddRequirement;

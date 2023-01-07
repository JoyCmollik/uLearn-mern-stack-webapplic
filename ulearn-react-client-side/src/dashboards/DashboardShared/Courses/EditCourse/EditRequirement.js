import React, { useState } from 'react';

// library imports
import { Input } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi2';
import { v4 as uuid } from 'uuid';

// local component
const RequirementInput = ({
	handleRequirementInputs,
	id,
	handleRequirementValues,
}) => {
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='flex justify-between items-center space-x-4'>
				<Input
					onBlur={(e) => handleRequirementValues(e)}
					size='large'
				/>
				<button
					onClick={(e) => handleRequirementInputs(e, 'remove', id)}
					className='p-2 bg-red-500 h-[40px] w-[40px] rounded-lg text-white flex justify-center items-center'
				>
					<HiMinus size={20} />
				</button>
			</div>
		</div>
	);
};

const EditRequirement = ({requirement, setRequirement}) => {
    const [requirementList, setRequirementList] = useState([]);
	// functionality: will add more input
	const handleRequirementInputs = (e, action, id = null) => {
		e.preventDefault();
		if (action === 'add') {
			setRequirementList((prevList) => {
				const id = uuid();
				return [...prevList, id];
			});
		} else {
			setRequirementList((prevList) => {
				return prevList.filter((currId) => id !== currId);
			});
		}
	};

	// functionality: will update list of requirements
	const handleRequirementValues = (e) => {
		e.preventDefault();
		setRequirement([...requirement, e.target.value]);
	};
	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Requirements</label>
				<div className='flex justify-between items-center space-x-4'>
					<Input
						onBlur={(e) => handleRequirementValues(e)}
						size='large'
					/>
					<button
						onClick={(e) => {
							handleRequirementInputs(e, 'add');
						}}
						className='p-2 bg-green-500 h-[40px] w-[40px] rounded-lg text-white flex justify-center items-center shadow-md shadow-green-400'
					>
						<HiPlus size={20} />
					</button>
				</div>
			</div>
			{requirementList.length > 0 &&
				requirementList.map((id) => (
					<RequirementInput
						key={id}
						id={id}
						handleRequirementInputs={handleRequirementInputs}
						handleRequirementValues={handleRequirementValues}
					/>
				))}
		</div>
	);
}

export default EditRequirement
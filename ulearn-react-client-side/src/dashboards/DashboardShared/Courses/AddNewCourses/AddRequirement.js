import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';

// local component
const RequirementInput = ({ handleRequirementInputs, id }) => {
  console.log(id, 'from component');
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='flex justify-between items-center space-x-4'>
				<Input size='large' />
				<button
					onClick={() => handleRequirementInputs('remove', id)}
					className='p-2 bg-red-500 h-[40px] w-[40px] rounded-lg text-white flex justify-center items-center'
				>
					<HiMinus size={20} />
				</button>
			</div>
		</div>
	);
};

// main component
const AddRequirement = ({ handleActiveTab }) => {
	const [requirement, setRequirement] = useState([]);
	const [requirementList, setRequirementList] = useState([]);

  // functionality: will add more input
	const handleRequirementInputs = (action, id = null) => {
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

	console.log(requirementList);

	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Requirements</label>
				<div className='flex justify-between items-center space-x-4'>
					<Input size='large' />
					<button
						onClick={() => handleRequirementInputs('add')}
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
					/>
				))}

			<Button
				onClick={() => handleActiveTab('3')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddRequirement;

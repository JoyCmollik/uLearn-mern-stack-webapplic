import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';

// local component
const OutcomeInput = ({ handleOutcomeInputs, id, handleOutcomeValues }) => {
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='flex justify-between items-center space-x-4'>
				<Input
					onBlur={(e) => {
						e.preventDefault();
						handleOutcomeValues(e);
					}}
					size='large'
				/>
				<button
					onClick={(e) => {
						handleOutcomeInputs(e, 'remove', id);
					}}
					className='p-2 bg-red-500 h-[40px] w-[40px] rounded-lg text-white flex justify-center items-center'
				>
					<HiMinus size={20} />
				</button>
			</div>
		</div>
	);
};

const AddOutcomes = ({ handleActiveTab, outcome, setOutcome }) => {
	const [outcomeList, setOutcomeList] = useState([]);

	// functionality: will add more input
	const handleOutcomeInputs = (e, action, id = null) => {
		e.preventDefault();
		if (action === 'add') {
			setOutcomeList((prevList) => {
				const id = uuid();
				return [...prevList, id];
			});
		} else {
			setOutcomeList((prevList) => {
				return prevList.filter((currId) => id !== currId);
			});
		}
	};

	// functionality: will update list of requirements
	const handleOutcomeValues = (e) => {
		e.preventDefault();
		setOutcome([...outcome, e.target.value]);
	};

	console.log(outcome);

	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Outcomes</label>
				<div className='flex justify-between items-center space-x-4'>
					<Input
						onBlur={(e) => handleOutcomeValues(e)}
						size='large'
					/>
					<button
						onClick={(e) => {
							handleOutcomeInputs(e, 'add');
						}}
						className='p-2 bg-green-500 h-[40px] w-[40px] rounded-lg text-white flex justify-center items-center'
					>
						<HiPlus size={20} />
					</button>
				</div>
			</div>
			{outcomeList.length > 0 &&
				outcomeList.map((id) => (
					<OutcomeInput
						key={id}
						id={id}
						handleOutcomeInputs={handleOutcomeInputs}
						handleOutcomeValues={handleOutcomeValues}
					/>
				))}

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

export default AddOutcomes;

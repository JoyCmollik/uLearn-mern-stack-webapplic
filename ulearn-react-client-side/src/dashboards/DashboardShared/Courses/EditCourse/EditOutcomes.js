import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from 'antd';
import { HiMinus, HiPlus } from 'react-icons/hi';

// local component
const OutcomeInput = ({
	outcome,
	handleOutcomeInputs,
	id,
	handleOutcomeValues,
}) => {
	return (
		<div className='col-span-12 flex flex-col'>
			<div className='flex justify-between items-center space-x-4'>
				<Input
					defaultValue={outcome[id]}
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

const EditOutcomes = ({ course, handleUpdateCourse, isUpdating }) => {
	const [outcome, setOutcome] = useState([...course.courseOutcomes]);
	const [outcomeIdList, setOutcomeIdList] = useState([
		...Array(course.courseOutcomes.length).keys(),
	]);
	const [data, setData] = useState([
		{
			id: 1,
			value: [],
		},
		{
			id: 1,
			value: [],
		},
	]);
	const onchangeInput = (val, index) => {
		let temp = data;
		temp[index] = val.target.value;
		setData(temp);
	};
	console.log(data)
	// functionality: will add more input
	const handleOutcomeInputs = (e, action, id = null) => {
		e.preventDefault();
		if (action === 'add') {
			setOutcomeIdList((prevList) => {
				const id = uuid();
				return [...prevList, id];
			});
		} else {
			setOutcomeIdList((prevList) => {
				return prevList.filter((currId) => id !== currId);
			});
		}
	};

	// functionality: will update list of requirements
	const handleOutcomeValues = (e) => {
		e.preventDefault();
		setOutcome([...outcome, e.target.value]);
	};

	console.log(outcome, outcomeIdList);

	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Outcomes</label>
				<div className='flex justify-between items-center space-x-4'>
					<Input
						defaultValue={outcome[0]}
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
			{outcomeIdList.length > 1 &&
				outcomeIdList.map((id) => (
					<OutcomeInput
						key={id}
						id={id}
						handleOutcomeInputs={handleOutcomeInputs}
						handleOutcomeValues={handleOutcomeValues}
						outcome={outcome}
					/>
				))}

			<Button
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button> */}
			{data.map((value, index) => {
				return (
					<input
						key={index}
						onChange={(val) => {
							onchangeInput(val, index);
						}}
					/>
				);
			})}
		</div>
	);
};

export default EditOutcomes;

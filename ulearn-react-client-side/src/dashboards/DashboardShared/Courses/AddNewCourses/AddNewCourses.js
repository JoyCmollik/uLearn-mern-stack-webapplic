import React, { useState } from 'react';
import { HiCog, HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { Steps, Tabs } from 'antd';
import {
	AddBasic,
	AddRequirement,
	AddOutcomes,
	AddPricing,
	AddMedia,
	AddSeo,
	AddFinishing,
} from './';
import { useForm } from 'react-hook-form';

const { Step } = Steps;

const initialSteps = [
	{
		title: 'Basic',
		currStatus: 'process',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'Add some basic information',
	},
	{
		title: 'Requirements',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'List out pre-requisites for the course',
	},
	{
		title: 'Outcomes',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'What things are going to be achieved upon completion?',
	},
	{
		title: 'Pricing',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description:
			'Putting a good price increases chances of better performance',
	},
	{
		title: 'Media',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'Some effective pictures that explain your course',
	},
	{
		title: 'Seo',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'Make a list of strong keywords',
	},
	{
		title: 'Finish',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'One step to complete!',
	},
];

const AddNewCourses = () => {
	const [steps, setSteps] = useState([...initialSteps]);
	const [tabActiveKey, setTabActiveKey] = useState('1');
	const [requirement, setRequirement] = useState([]);
	const [outcome, setOutcome] = useState([]);
	const [courseThumb, setCourseThumb] = useState([]);
	const [tags, setTags] = useState(['course', 'add more']);

	const { control, handleSubmit } = useForm({});
	const onSubmit = (data) => {
		data.requirements = requirement;
		data.courseOutcomes = outcome;
		data.courseThumb= courseThumb;
		data.tags = tags;

		console.log(data);

			};

	// functionality -> will update steps while tabs are opened
	const handleSteps = (receivedKey) => {
		setTabActiveKey(() => receivedKey);
		let currKey = Number(receivedKey);
		// default termination
		if (steps[currKey].currStatus === 'process') return;

		let newSteps = [...steps];

		newSteps[currKey - 1].currStatus = 'process';

		setSteps(() => newSteps);
	};

	// functionality -> will change the current tab by click event on the button set explicitly
	const handleActiveTab = (currKey) => {
		handleSteps(currKey);
		setTabActiveKey(() => currKey);
	};

	return (
		<div className='space-y-8'>
			{/*****--------------Courses Header---------------*****/}
			<div className='flex justify-between items-center'>
				{/* header */}
				<h4 className='text-xl font-medium'>Add Course</h4>
				{/* add new course */}
				<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
					<HiCog size={20} /> <span>My Courses</span>
				</button>
			</div>
			<div className='grid grid-cols-12 gap-8 min-h-[71vh] '>
				<div className='col-span-3 border-[0.5px] rounded-lg p-4 bg-light shadow-sm text-white '>
					<Steps size='small' direction='vertical'>
						{steps.map(
							(
								{ title, currStatus, description, icon },
								_idx
							) => (
								<Step
									key={_idx}
									title={title}
									status={currStatus}
									// icon={icon}
									description={
										Number(tabActiveKey) === _idx + 1 ? (
											<p className='text-sm text-font2 mt-2'>
												{description}
											</p>
										) : null
									}
								/>
							)
						)}
					</Steps>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className=' col-span-9 '
				>
					<Tabs className='h-full' onChange={handleSteps} activeKey={tabActiveKey}>
						<Tabs.TabPane tab='Basic' key='1'>
							<AddBasic
								handleActiveTab={handleActiveTab}
								control={control}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Requirements' key='2'>
							<AddRequirement
								handleActiveTab={handleActiveTab}
								requirement={requirement}
								setRequirement={setRequirement}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Outcomes' key='3'>
							<AddOutcomes
								handleActiveTab={handleActiveTab}
								outcome={outcome}
								setOutcome={setOutcome}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Pricing' key='4'>
							<AddPricing
								handleActiveTab={handleActiveTab}
								control={control}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Media' key='5'>
							<AddMedia
								handleActiveTab={handleActiveTab}
								control={control}
								courseThumb={courseThumb}
								setCourseThumb={setCourseThumb}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Seo' key='6'>
							<AddSeo
								handleActiveTab={handleActiveTab}
								control={control}
								tags={tags}
								setTags={setTags}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab='Finish' key='7'>
							<AddFinishing handleActiveTab={handleActiveTab} />
						</Tabs.TabPane>
					</Tabs>
				</form>
			</div>
		</div>
	);
};

export default AddNewCourses;

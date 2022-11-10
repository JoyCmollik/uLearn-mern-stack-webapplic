import React, { useState } from 'react';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import ManageProfile from '../../ManageProfile/ManageProfile';
import { Steps, Tabs } from 'antd';

const { Step } = Steps;

const initialSteps = [
	{
		title: 'Basic',
		currStatus: 'process',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Requirements',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Outcomes',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Pricing',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Media',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Seo',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
	{
		title: 'Finish',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
	},
];

const AddNewCourses = () => {
	const [current, setCurrent] = useState(0);
	const [steps, setSteps] = useState([...initialSteps]);

	// functionality -> will update steps while tabs are opened
	const handleSteps = (currKey) => {
		// default termination
		if (
			steps[currKey].currStatus === 'process' ||
			steps[currKey].currStatus === 'finished'
		)
			return;

		let newSteps = [...steps];

		if (Number(currKey) === steps.length) {
			newSteps[currKey] = 'finished'
		} else {
			newSteps[currKey] = 'process'
		}

		setSteps(() => newSteps);
	};

	console.log(steps);
	return (
		<div className='grid grid-cols-12 gap-8'>
			<div className='col-span-10'>
				<Tabs onChange={handleSteps()}>
					<Tabs.TabPane tab='Basic' key='1'>
						Content 1
					</Tabs.TabPane>
					<Tabs.TabPane tab='Tab 2' key='2'>
						Content 2
					</Tabs.TabPane>
				</Tabs>
			</div>
			<div className='col-span-2 border-[0.5px] rounded-lg p-4 mt-[62px]'>
				<Steps size='small' current={current} direction='vertical'>
					{steps.map(({ title, currStatus, icon, content }) => (
						<Step title={title} status={currStatus} icon={icon} />
					))}
				</Steps>
			</div>
		</div>
	);
};

export default AddNewCourses;

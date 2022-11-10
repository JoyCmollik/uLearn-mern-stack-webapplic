import React, { useState } from 'react';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2';
import { Steps, Tabs, Button, Checkbox, Form, Input } from 'antd';
import {
	AddBasic,
	AddRequirement,
	AddOutcomes,
	AddPricing,
	AddMedia,
	AddSeo,
	AddFinishing,
} from './';

const { Step } = Steps;

const initialSteps = [
	{
		title: 'Basic',
		currStatus: 'process',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Requirements',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Outcomes',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Pricing',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Media',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Seo',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
	{
		title: 'Finish',
		currStatus: 'wait',
		icon: <HiOutlineDocumentDuplicate />,
		description: 'add some basic information',
	},
];

const AddNewCourses = () => {
	const [current, setCurrent] = useState(0);
	const [steps, setSteps] = useState([...initialSteps]);
	const [tabActiveKey, setTabActiveKey] = useState('1');

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

	// functionality -> will change the current tab
	const handleActiveTab = (currKey) => {
		setTabActiveKey(() => currKey);
	};

	console.log(steps);
	return (
		<div className='grid grid-cols-12 gap-8 min-h-[80vh]'>
			<div className=' col-span-9 '>
				<Tabs onChange={handleSteps} activeKey={tabActiveKey}>
					<Tabs.TabPane tab='Basic' key='1'>
						<AddBasic handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Requirements' key='2'>
						<AddRequirement handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Outcomes' key='3'>
						<AddOutcomes handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Pricing' key='4'>
						<AddPricing handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Media' key='5'>
						<AddMedia handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Seo' key='6'>
						<AddSeo handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
					<Tabs.TabPane tab='Finish' key='7'>
						<AddFinishing handleActiveTab={handleActiveTab} />
					</Tabs.TabPane>
				</Tabs>
			</div>
			<div className='col-span-3 border-[0.5px] rounded-lg p-4 mt-[62px] '>
				<Steps size='small' current={current} direction='vertical'>
					{steps.map(
						({ title, currStatus, description, icon }, _idx) => (
							<Step
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
		</div>
	);
};

export default AddNewCourses;

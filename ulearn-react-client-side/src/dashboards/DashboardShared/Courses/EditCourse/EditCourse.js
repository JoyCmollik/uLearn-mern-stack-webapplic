import React, { useState } from 'react';
import {
	HiAcademicCap,
	HiCheck,
	HiCog,
	HiOutlineDocumentDuplicate,
    HiOutlineInformationCircle,
} from 'react-icons/hi2';
import { Steps, Tabs } from 'antd';
import {
	AddBasic,
	AddRequirement,
	AddOutcomes,
	AddPricing,
	AddMedia,
	AddSeo,
	AddFinishing,
} from '../AddNewCourses';
import AddCurriculumComponent from './AddCurriculumComponent';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlinePermMedia } from 'react-icons/md';
import { RiAdvertisementLine } from 'react-icons/ri';
import { SiUploaded } from 'react-icons/si';

const { Step } = Steps;

// step header
const StepHeader = ({ title, step, currKey, icon, activeKey }) => {

	return (
		<div className='flex justify-between items-center space-x-2 '>
			<div className='p-2 rounded-full flex justify-center items-center bg-light'>
				{icon}
			</div>
			<div className={`${activeKey === currKey ? 'block' : 'hidden'}`}>
				<p className='m-0 text-font2 text-xs'>Steps {step}/8</p>
				<h4 className='font-normal m-0 text-font1 '>{title}</h4>
			</div>
		</div>
	);
};

const EditCourse = () => {
	const [courseData, setCourseData] = useState({});
	const [steps, setSteps] = useState();
	const [tabActiveKey, setTabActiveKey] = useState('start');

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
					<h4 className='text-xl font-medium'>Edit Course</h4>
					{/* add new course */}
					<button className='px-4 py-2 rounded-lg border-[0.5px] border-primary text-primary flex space-x-2 items-center'>
						<HiCog size={20} /> <span>My Courses</span>
					</button>
				</div>
				<div className='grid grid-cols-12 gap-8 min-h-[71vh]'>
					<div className='col-span-12 '>
						<Tabs onChange={handleSteps} activeKey={tabActiveKey}>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='curriculum'
										icon={<HiAcademicCap size={19} />}
										step='1'
										currKey='start'
										activeKey={tabActiveKey}
									/>
								}
								key='start'
							>
								<AddCurriculumComponent
									handleActiveTab={handleActiveTab}
								/>
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Basic'
										icon={
											<HiOutlineInformationCircle
												size={19}
											/>
										}
										step='2'
										currKey='1'
										activeKey={tabActiveKey}
									/>
								}
								key='1'
							>
								<AddBasic handleActiveTab={handleActiveTab} />
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Requirements'
										icon={
											<HiOutlineClipboardList size={19} />
										}
										step='3'
										currKey='2'
										activeKey={tabActiveKey}
									/>
								}
								key='2'
							>
								<AddRequirement
									handleActiveTab={handleActiveTab}
								/>
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Outcomes'
										icon={<HiCheck size={19} />}
										step='4'
										currKey='3'
										activeKey={tabActiveKey}
									/>
								}
								key='3'
							>
								<AddOutcomes
									handleActiveTab={handleActiveTab}
								/>
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Pricing'
										icon={<IoPricetagsOutline size={19} />}
										step='5'
										currKey='4'
										activeKey={tabActiveKey}
									/>
								}
								key='4'
							>
								<AddPricing handleActiveTab={handleActiveTab} />
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Media'
										icon={<MdOutlinePermMedia size={19} />}
										step='6'
										currKey='5'
										activeKey={tabActiveKey}
									/>
								}
								key='5'
							>
								<AddMedia handleActiveTab={handleActiveTab} />
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Seo'
										icon={<RiAdvertisementLine size={19} />}
										step='7'
										currKey='6'
										activeKey={tabActiveKey}
									/>
								}
								key='6'
							>
								<AddSeo handleActiveTab={handleActiveTab} />
							</Tabs.TabPane>
							<Tabs.TabPane
								tab={
									<StepHeader
										title='Finish'
										icon={<SiUploaded size={19} />}
										step='8'
										currKey='7'
										activeKey={tabActiveKey}
									/>
								}
								key='7'
							>
								<AddFinishing
									handleActiveTab={handleActiveTab}
								/>
							</Tabs.TabPane>
						</Tabs>
					</div>
				</div>
			</div>
	);
};

export default EditCourse;

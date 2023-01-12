import React, { useEffect, useState } from 'react';

// library imports
import {
	HiAcademicCap,
	HiCheck,
	HiCog,
    HiOutlineInformationCircle,
} from 'react-icons/hi2';
import { message, Steps, Tabs } from 'antd';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlinePermMedia } from 'react-icons/md';
import { RiAdvertisementLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

// components
import AddCurriculumComponent from './AddCurriculumComponent';
import EditBasic from './EditBasic';
import EditRequirement from './EditRequirement';
import EditOutcomes from './EditOutcomes';
import EditPricing from './EditPricing';
import EditMedia from './EditMedia';
import EditSeo from './EditSeo';

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
	const [course, setCourse] = useState(null);
	const [steps, setSteps] = useState();
	const [tabActiveKey, setTabActiveKey] = useState('start');
	const [requirement, setRequirement] = useState([]);
	const [outcome, setOutcome] = useState([]);
	const [courseThumb, setCourseThumb] = useState([]);
	const [tags, setTags] = useState(['course', 'add more']);
	const [editorContent, setEditorContent] = useState();
	const [isUpdating, setIsUpdating] = useState(false);

	// third party library states
	const { control, handleSubmit, reset } = useForm({});
	const navigate = useNavigate();
	const { id: courseId } = useParams();

	// -------------- API REQUESTS - FUNCTIONS --------------

	const handleFetchSingleCourse = () => {
		axios
			.get(`/courses/${courseId}`)
			.then((response) => {
				setCourse(response.data.course);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleUpdateCourse = (newCourseData) => {
		setIsUpdating(true);
		axios.patch(`/courses/${courseId}`, newCourseData)
			.then(response => {
				setCourse(response.data.course);
				message.success('Updated the course successfully!');
			})
			.catch(error => {
				message.error(error.response.data.msg || error.message)
			})
			.finally(() => {
				setIsUpdating(false);
			})
	};

	// -------------- ON COMPONENT MOUNT REQUESTS - FUNCTIONS --------------
	useEffect(() => {
		handleFetchSingleCourse();
	}, [])
	// -------------- COMPONENT FEATURES - FUNCTIONS --------------

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
								course={course}
								handleUpdateCourse={handleUpdateCourse}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane
							tab={
								<StepHeader
									title='Basic'
									icon={
										<HiOutlineInformationCircle size={19} />
									}
									step='2'
									currKey='1'
									activeKey={tabActiveKey}
								/>
							}
							key='1'
						>
							<EditBasic
								course={course}
								handleUpdateCourse={handleUpdateCourse}
								isUpdating={isUpdating}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane
							tab={
								<StepHeader
									title='Requirements'
									icon={<HiOutlineClipboardList size={19} />}
									step='3'
									currKey='2'
									activeKey={tabActiveKey}
								/>
							}
							key='2'
						>
							<EditRequirement
								course={course}
								handleUpdateCourse={handleUpdateCourse}
								isUpdating={isUpdating}
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
							<EditOutcomes
								course={course}
								handleUpdateCourse={handleUpdateCourse}
								isUpdating={isUpdating}
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
							<EditPricing
								course={course}
								handleUpdateCourse={handleUpdateCourse}
								isUpdating={isUpdating}
							/>
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
							<EditMedia
								handleActiveTab={handleActiveTab}
								control={control}
								courseThumb={courseThumb}
								setCourseThumb={setCourseThumb}
								handleUpdateCourse={handleUpdateCourse}
							/>
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
							<EditSeo
								handleActiveTab={handleActiveTab}
								control={control}
								tags={tags}
								setTags={setTags}
								handleUpdateCourse={handleUpdateCourse}
							/>
						</Tabs.TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default EditCourse;

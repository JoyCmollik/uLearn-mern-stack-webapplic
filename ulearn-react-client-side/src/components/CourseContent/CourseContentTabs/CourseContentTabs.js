import React from 'react';
import { Tabs } from 'antd';
import './CourseContentTabs.css';

import CourseContentTabsCourse from '../CourseContentTabsCourse/CourseContentTabsCourse';
import CourseContentTabsDiscussion from '../CourseContentTabsDiscussion/CourseContentTabsDiscussion';
const onChange = (key) => {
	console.log(key);
};

const CourseContentTabs = () => {
	return (
		<section className='pt-6'>
			<Tabs
				className='course-content-Tab-style course-content-active-color course-content-tabs-ink-bar course-content-tabs-btn course-content-tabs-nav-wrap course-content-tabs-tab'
				defaultActiveKey='1'
				onChange={onChange}
				items={[
					{
						label: <h4 className='text-base'>Course</h4>,
						key: '1',
						children: (
							<div>
								<CourseContentTabsCourse />
							</div>
						),
					},
					{
						label: <h4 className='text-base'>Discussion</h4>,
						key: '2',
						children: (
							<div>
								<CourseContentTabsDiscussion />
							</div>
						),
					},
				]}
			/>
		</section>
	);
};

export default CourseContentTabs;

import React from 'react';
import { Layout } from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import Banner from '../../components/CourseList/Banner/Banner/Banner';
import SearchList from '../../components/CourseList/Search&Sort/SearchList/SearchList';
import FilterCourse from '../../components/CourseList/FilterCourse/FilterCourse/FilterCourse';

const { Footer } = Layout;
const CourseList = () => {
	return (
		<>
			<NavigationBar theme='light' />
			<div style={{ background: 'white' }}>
				<Banner />
				<SearchList />
				<FilterCourse />
			</div>
			<Footer style={{ background: '#040453' }}>
				<FooterComponent />
			</Footer>
		</>
	);
};

export default CourseList;

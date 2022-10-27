import React from 'react';
import { Layout } from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import Banner from '../../components/CourseList/Banner/Banner/Banner';
import SearchList from '../../components/CourseList/Search&Sort/SearchList/SearchList';
import FilterCourse from '../../components/CourseList/FilterCourse/FilterCourse/FilterCourse';

const { Footer, Content } = Layout;
const CourseList = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: '#EFEFEF' }}>
					<Banner />
					<SearchList />
					<FilterCourse />
				</Content>
				<Footer style={{ background: '#040453' }}>
					<FooterComponent />
				</Footer>
			</Layout>
		</>
	);
};

export default CourseList;

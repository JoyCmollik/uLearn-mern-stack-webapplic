import React from 'react';
import { Layout } from 'antd';
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent/FooterComponent';
import Banner from '../../components/CourseList/Banner/Banner/Banner';

const { Footer, Content } = Layout;
const CourseList = () => {
	return (
		<>
			<Layout>
				<NavigationBar theme='light' />
				<Content style={{ background: '#EFEFEF' }}>
					<Banner />
				</Content>
				{/* <Footer style={{ background: '#040453' }}>
					<FooterComponent />
				</Footer> */}
			</Layout>
		</>
	);
};

export default CourseList;

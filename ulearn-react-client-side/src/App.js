import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CourseList from './pages/CourseList/CourseList';
import Auth from './pages/Auth/Auth';
import DevelopmentCourse from './components/Home/BoardSectionOfCourse/Courses/DevelopmentCourse/DevelopmentCourse';
import BusinessCourse from './components/Home/BoardSectionOfCourse/Courses/BusinessCourse/BusinessCourse';
import SoftwareCourse from './components/Home/BoardSectionOfCourse/Courses/SoftwareCourse/SoftwareCourse';
import DesignCourse from './components/Home/BoardSectionOfCourse/Courses/DesignCourse/DesignCourse';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import AdminDashboardComponent from './dashboards/AdminDashboard/AdminDashboardComponent/AdminDashboardComponent';
import Report from './dashboards/AdminDashboard/Report/Report';
import AdminDashboardHome from './dashboards/AdminDashboard/AdminDashboardHomePage/AdminDashboardHome/AdminDashboardHome';
import ManageProfile from './dashboards/DashboardShared/ManageProfile/ManageProfile';
import ManageCourses from './dashboards/DashboardShared/Courses/ManageCourses/ManageCourses';
import CoursesComponent from './dashboards/DashboardShared/Courses/CoursesComponent/CoursesComponent';
import AddNewCourse from './dashboards/DashboardShared/Courses/AddNewCourses/AddNewCourses';
import Coupons from './dashboards/DashboardShared/Courses/Coupons/Coupons';
import CoursesCategory from './dashboards/DashboardShared/Courses/CoursesCategory/CoursesCategory';
import CourseContent from './pages/CourseContent/CourseContent';
import CourseContentDetail from './components/CourseContentDetailPage/CourseContentDetail/CourseContentDetail';

// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import AuthRoles from './components/Auth/AuthRoles';

function App() {
	return (
		<>
			<Routes>
				<Route path='/*' element={<Home />}>
					<Route index element={<DevelopmentCourse />} />
					<Route path='development' element={<DevelopmentCourse />} />
					<Route path='business' element={<BusinessCourse />} />
					<Route path='software' element={<SoftwareCourse />} />
					<Route path='design' element={<DesignCourse />} />
				</Route>
				<Route
					path='course-content/:contentId'
					element={<CourseContent />}
				/>
				<Route
					path='course-content-detail/:contentDetailId'
					element={<CourseContentDetail />}
				/>
				{/* <Route path='/*' element={<Home />}></Route> */}
				<Route path='course-list' element={<CourseList />} />
				<Route
					path='course-list/:courseId'
					element={<CourseDetail />}
				/>
				<Route path='auth/*' element={<Auth />} />
				<Route
					path='admin/dashboard/*'
					element={<AdminDashboardComponent />}
				>
					<Route index element={<AdminDashboardHome />} />
					<Route path='report/revenue' element={<Report />} />
					<Route path='manage-courses' element={<CoursesComponent />}>
						<Route index element={<ManageCourses />} />
						<Route path='add' element={<AddNewCourse />} />
						<Route
							path='categories'
							element={<CoursesCategory />}
						/>
						<Route path='coupons' element={<Coupons />} />
					</Route>
					<Route path='manage-profile' element={<ManageProfile />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

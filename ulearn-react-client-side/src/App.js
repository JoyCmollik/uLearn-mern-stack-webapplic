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
import EditCourse from './dashboards/DashboardShared/Courses/EditCourse/EditCourse';
import ForgotPassword from './components/Auth/ForgotPassword';
import ContentCreatorDashboardComponent from './dashboards/ContentCreatorDashbaord/ContentCreatorDashboardComponent/ContentCreatorDashboardComponent';
import ContentCreatorDashboardHome from './dashboards/ContentCreatorDashbaord/ContentCreatorDashboardHome/ContentCreatorDashboardHome';
import ContentCreatorCourses from './dashboards/ContentCreatorDashbaord/ContentCreatorCourses/ContentCreatorCourses';
import Verify from './components/Auth/Verify';
import ResetPassword from './components/Auth/ResetPassword';
import UsersAdmin from './dashboards/AdminDashboard/Users/UsersAdmin/UsersAdmin';
import UsersContentWriter from './dashboards/AdminDashboard/Users/UsersContentWriter/UsersContentWriter';
import UsersLearner from './dashboards/AdminDashboard/Users/UsersLearner/UsersLearner';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import AuthRoles from './components/Auth/AuthRoles';

function App() {
	return (
		<>
			<Routes>
				{/*****--------------Home Routes---------------*****/}
				<Route path='/*' element={<Home />}>
					<Route index element={<DevelopmentCourse />} />
					<Route path='development' element={<DevelopmentCourse />} />
					<Route path='business' element={<BusinessCourse />} />
					<Route path='software' element={<SoftwareCourse />} />
					<Route path='design' element={<DesignCourse />} />
				</Route>
				{/*****--------------Course Content Show Routes---------------*****/}
				<Route
					path='course-content/:contentId/*'
					element={<CourseContent />}
				/>

				{/* <Route path='/*' element={<Home />}></Route> */}
				<Route path='course-list' element={<CourseList />} />
				<Route
					path='course-list/:courseId'
					element={<CourseDetail />}
				/>
				{/*****--------------Authentication Routes---------------*****/}
				<Route path='auth/*' element={<Auth />} />
				<Route
					path='auth/forgot-password'
					element={<ForgotPassword />}
				/>
				<Route path='/user/verify-email' element={<Verify />} />
				<Route
					path='/user/reset-password'
					element={<ResetPassword />}
				/>
				{/*****--------------Admin Dashboard Index Routes---------------*****/}
				<Route
					path='admin/dashboard/*'
					element={<AdminDashboardComponent />}
				>
					<Route index element={<AdminDashboardHome />} />
					<Route path='report/revenue' element={<Report />} />
					<Route
						path='manage-courses/*'
						element={<CoursesComponent />}
					>
						<Route index element={<ManageCourses />} />
						<Route path='add' element={<AddNewCourse />} />
						<Route
							path='categories/*'
							element={<CoursesCategory />}
						/>
						<Route path='coupons/*' element={<Coupons />} />
						<Route path='edit/:id/*' element={<EditCourse />} />
					</Route>
					<Route
						path='manage-users/*'
						element={<CoursesComponent />}
					>
						<Route path='admin/*' element={<UsersAdmin />} />
						<Route path='content-writer/*' element={<UsersContentWriter />} />
						<Route path='learner/*' element={<UsersLearner />} />
					
					</Route>
					<Route
						path='manage-profile/*'
						element={<ManageProfile />}
					/>
				</Route>
				{/*****--------------Instructor Dashboard Index Routes---------------*****/}
				<Route
					path='content-creator/dashboard/*'
					element={<ContentCreatorDashboardComponent />}
				>
					<Route index element={<ContentCreatorDashboardHome />} />
					<Route
						path='manage-courses/*'
						element={<CoursesComponent />}
					>
						<Route index element={<ContentCreatorCourses />} />
						<Route path='add' element={<AddNewCourse />} />
						<Route path='edit/:id/*' element={<EditCourse />} />
					</Route>
					<Route
						path='manage-profile/*'
						element={<ManageProfile />}
					/>
				</Route>
			</Routes>
		</>
	);
}

export default App;

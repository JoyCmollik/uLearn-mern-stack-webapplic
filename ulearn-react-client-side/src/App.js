import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import CourseList from './pages/CourseList/CourseList';
import Auth from './pages/Auth/Auth';
import ulearnLogo from './images/ulearn_logo.png';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import AdminDashboardComponent from './dashboards/AdminDashboard/AdminDashboardComponent/AdminDashboardComponent';
import AdminDashboardHome from './dashboards/AdminDashboard/AdminDashboardHomePage/AdminDashboardHome/AdminDashboardHome';
import ManageProfile from './dashboards/DashboardShared/ManageProfile/ManageProfile';
import ManageCourses from './dashboards/DashboardShared/Courses/ManageCourses/ManageCourses';
import CoursesComponent from './dashboards/DashboardShared/Courses/CoursesComponent/CoursesComponent';
import AddNewCourse from './dashboards/DashboardShared/Courses/AddNewCourses/AddNewCourses';
import CoursesCategory from './dashboards/DashboardShared/Courses/CoursesCategory/CoursesCategory';
import CourseContent from './pages/CourseContent/CourseContent';
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
import AdminOutlet from './privateOutlets/AdminOutlet';
import MyCourses from './pages/MyCourses/MyCourses';
import Testimonial from './pages/Testimonial/Testimonial';
import BecomeContentWriter from './pages/BecomeContentWriter/BecomeContentWriter';
import ContentWriterProfile from './pages/ContentWriterProfile/ContentWriterProfile';
import PrivateRoute from './privateOutlets/PrivateRoute';
import ContentCreatorOutlet from './privateOutlets/ContentCreatorOutlet';
import MyProfile from './pages/MyProfile/MyProfile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from './hooks/useAuth';
import CourseListByCategory from './pages/CourseListByCategory/CourseListByCategory';
import Lottie from './components/layout/Lottie/Lottie';

function App() {
	const [categories, setCategoires] = useState(null);
	const [displayCategories, setDisplayCategories] = useState(null);
	const [newCourses, setNewCourses] = useState(null);
	const [bestCourses, setBestCourses] = useState(null);
	const [instructors, setInstructors] = useState(null);
	const { user } = useAuth();

	useEffect(() => {
		const source = axios.CancelToken.source();
		if (!categories) {
			axios
				.get('/categories?limit=6&sort=_id', {
					cancelToken: source.token,
				})
				.then((response) => {
					//console.log(response.data.categories);
					setCategoires(response.data.categories);
					setDisplayCategories(response.data.categories.slice(0, 7));
				})
				.catch((err) => {
					console.log(err);
				});
		}
		// if (!newCourses) {
		// 	axios
		// 		.get('/courses?limit=4&sort=-_id', {
		// 			cancelToken: source.token,
		// 		})
		// 		.then((response) => {
		// 			setNewCourses(response.data.courses);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }
		// if (!bestCourses) {
		// 	axios
		// 		.get('/courses?limit=1&averageRating[gte]=4', {
		// 			cancelToken: source.token,
		// 		})
		// 		.then((response) => {
		// 			setBestCourses(response.data.courses);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }
		// if (user && !instructors) {
		// 	axios
		// 		.get('/instructors', {
		// 			cancelToken: source.token,
		// 		})
		// 		.then((response) => {
		// 			console.log(response);
		// 			setInstructors(response.data.instructors);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }

		return () => {
			source?.cancel('Cancelling fetch request on unmount.');
		};
	}, []);

	if (!categories) {
		return (
			<div className='min-h-screen flex flex-col bg-light'>
				<div className=' flex justify-center items-center p-4 bg-white border-b'>
					<img
						className='w-[100px] h-[40px] object-cover'
						src={ulearnLogo}
						alt=''
					/>
				</div>
				<div className='flex-grow flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center space-y-4 bg-white backdrop-filter rounded-lg p-8'>
						<Lottie
							src='https://assets1.lottiefiles.com/packages/lf20_uomCWjKFFp.json'
							size={{
								width: '450',
								height: '450',
							}}
						/>
						<h4 className='font-medium text-xl font-lato'>
							Hold on. Waking up the server for you!
						</h4>
						<small className='text-font2'>
							We're using free tiers of server hosting service,
							for which it takes a few moment to gear it up.
						</small>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='bg-white'>
			<Routes>
				{/*****--------------Home Routes---------------*****/}
				<Route
					path='/*'
					element={
						<Home
							data={{
								displayCategories,
								categories,
								newCourses,
								bestCourses,
								instructors,
							}}
						/>
					}
				></Route>
				{/*****--------------Course Content Show Routes---------------*****/}
				<Route
					path='course-content/:contentId/*'
					element={
						<PrivateRoute>
							<CourseContent />
						</PrivateRoute>
					}
				/>

				{/* <Route path='/*' element={<Home />}></Route> */}
				<Route path='course-list' element={<CourseList />} />
				<Route
					path='course-list/category/:categoryId'
					element={<CourseListByCategory />}
				/>
				<Route
					path='my-courses'
					element={
						<PrivateRoute>
							<MyCourses />
						</PrivateRoute>
					}
				/>
				<Route
					path='my-profile'
					element={
						<PrivateRoute>
							<MyProfile />
						</PrivateRoute>
					}
				/>
				<Route
					path='testimonial'
					element={
						<PrivateRoute>
							<Testimonial />
						</PrivateRoute>
					}
				/>
				<Route
					path='become-content-creator'
					element={
						<PrivateRoute>
							<BecomeContentWriter />
						</PrivateRoute>
					}
				/>
				<Route
					path='content-writer-profile/:contentWriterId'
					element={
						<PrivateRoute>
							<ContentWriterProfile />
						</PrivateRoute>
					}
				/>
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
				<Route path='admin/*' element={<AdminOutlet />}>
					<Route
						path='dashboard/*'
						element={<AdminDashboardComponent />}
					>
						<Route index element={<AdminDashboardHome />} />
						{/* <Route path='report/revenue' element={<Report />} /> */}
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
							{/* <Route path='coupons/*' element={<Coupons />} /> */}
							<Route path='edit/:id/*' element={<EditCourse />} />
						</Route>
						<Route
							path='manage-users/*'
							element={<CoursesComponent />}
						>
							<Route path='admin/*' element={<UsersAdmin />} />
							<Route
								path='content-writer/*'
								element={<UsersContentWriter />}
							/>
							<Route
								path='learner/*'
								element={<UsersLearner />}
							/>
						</Route>
						<Route
							path='manage-profile/*'
							element={<ManageProfile />}
						/>
					</Route>
					<Route path='manage-users/*' element={<CoursesComponent />}>
						<Route path='admin/*' element={<UsersAdmin />} />
						<Route
							path='content-writer/*'
							element={<UsersContentWriter />}
						/>
						<Route path='learner/*' element={<UsersLearner />} />
					</Route>
					<Route
						path='manage-profile/*'
						element={<ManageProfile />}
					/>
				</Route>
				{/*****--------------Instructor Dashboard Index Routes---------------*****/}
				<Route
					path='content-creator'
					element={<ContentCreatorOutlet />}
				>
					<Route
						path='dashboard/*'
						element={<ContentCreatorDashboardComponent />}
					>
						<Route
							index
							element={<ContentCreatorDashboardHome />}
						/>
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
				</Route>
			</Routes>
		</div>
	);
}

export default App;

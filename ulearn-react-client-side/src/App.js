import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import CourseList from './pages/CourseList/CourseList';
import AdminDashboardHome from './dashboards/AdminDashboard/AdminDashboardHome/AdminDashboardHome';
import Auth from './pages/Auth/Auth';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';

function App() {
	return (
		<>
			<Routes>
				<Route index element={<Home />} />
				<Route path='course-list' element={<CourseList />} />
				<Route path='auth' element={<Auth />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
				<Route
					path='admin/dashboard'
					element={<AdminDashboardHome />}
				/>
			</Routes>
		</>
	);
}

export default App;

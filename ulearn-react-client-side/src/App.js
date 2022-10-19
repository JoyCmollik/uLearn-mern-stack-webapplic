import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home/Home';
import CourseList from './pages/CourseList/CourseList';
import AdminDashboardHome from './dashboards/AdminDashboard/AdminDashboardHome/AdminDashboardHome';

function App() {
  return (
		<>
			<Routes>
				<Route index element={ <Home /> } />
				<Route path='/course-list' element={ <CourseList /> } />
				<Route path='/admin/dashboard' element= { <AdminDashboardHome /> } />
			</Routes>
		</>
  );
}

export default App;

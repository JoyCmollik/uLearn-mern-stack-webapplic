// Centralized route configuration for the app
import Home from '../pages/Home/Home';
import CourseList from '../pages/CourseList/CourseList';
import Auth from '../pages/Auth/Auth';
import CourseDetail from '../pages/CourseDetail/CourseDetail';
import AdminDashboardComponent from '../dashboards/AdminDashboard/AdminDashboardComponent/AdminDashboardComponent';
import AdminDashboardHome from '../dashboards/AdminDashboard/AdminDashboardHomePage/AdminDashboardHome/AdminDashboardHome';
import ManageProfile from '../dashboards/DashboardShared/ManageProfile/ManageProfile';
import ManageCourses from '../dashboards/DashboardShared/Courses/ManageCourses/ManageCourses';
import CoursesComponent from '../dashboards/DashboardShared/Courses/CoursesComponent/CoursesComponent';
import AddNewCourse from '../dashboards/DashboardShared/Courses/AddNewCourses/AddNewCourses';
import CoursesCategory from '../dashboards/DashboardShared/Courses/CoursesCategory/CoursesCategory';
import CourseContent from '../pages/CourseContent/CourseContent';
import EditCourse from '../dashboards/DashboardShared/Courses/EditCourse/EditCourse';
import ForgotPassword from '../components/Auth/ForgotPassword';
import ContentCreatorDashboardComponent from '../dashboards/ContentCreatorDashbaord/ContentCreatorDashboardComponent/ContentCreatorDashboardComponent';
import ContentCreatorDashboardHome from '../dashboards/ContentCreatorDashbaord/ContentCreatorDashboardHome/ContentCreatorDashboardHome';
import ContentCreatorCourses from '../dashboards/ContentCreatorDashbaord/ContentCreatorCourses/ContentCreatorCourses';
import Verify from '../components/Auth/Verify';
import ResetPassword from '../components/Auth/ResetPassword';
import UsersAdmin from '../dashboards/AdminDashboard/Users/UsersAdmin/UsersAdmin';
import UsersContentWriter from '../dashboards/AdminDashboard/Users/UsersContentWriter/UsersContentWriter';
import UsersLearner from '../dashboards/AdminDashboard/Users/UsersLearner/UsersLearner';
import AdminOutlet from '../privateOutlets/AdminOutlet';
import MyCourses from '../pages/MyCourses/MyCourses';
import Testimonial from '../pages/Testimonial/Testimonial';
import BecomeContentWriter from '../pages/BecomeContentWriter/BecomeContentWriter';
import ContentWriterProfile from '../pages/ContentWriterProfile/ContentWriterProfile';
import PrivateRoute from '../privateOutlets/PrivateRoute';
import ContentCreatorOutlet from '../privateOutlets/ContentCreatorOutlet';
import MyProfile from '../pages/MyProfile/MyProfile';
import CourseListByCategory from '../pages/CourseListByCategory/CourseListByCategory';

const routes = [
  {
    path: '/*',
    element: Home,
    props: true // for data prop
  },
  {
    path: 'course-content/:contentId/*',
    element: CourseContent,
    private: true
  },
  {
    path: 'course-list',
    element: CourseList
  },
  {
    path: 'course-list/category/:categoryId',
    element: CourseListByCategory
  },
  {
    path: 'my-courses',
    element: MyCourses,
    private: true
  },
  {
    path: 'my-profile',
    element: MyProfile,
    private: true
  },
  {
    path: 'testimonial',
    element: Testimonial,
    private: true
  },
  {
    path: 'become-content-creator',
    element: BecomeContentWriter,
    private: true
  },
  {
    path: 'content-writer-profile/:contentWriterId',
    element: ContentWriterProfile,
    private: true
  },
  {
    path: 'course-list/:courseId',
    element: CourseDetail
  },
  // Auth
  {
    path: 'auth/*',
    element: Auth
  },
  {
    path: 'auth/forgot-password',
    element: ForgotPassword
  },
  {
    path: '/user/verify-email',
    element: Verify
  },
  {
    path: '/user/reset-password',
    element: ResetPassword
  },
  // Admin Dashboard
  {
    path: 'admin/*',
    element: AdminOutlet,
    children: [
      {
        path: 'dashboard/*',
        element: AdminDashboardComponent,
        children: [
          { path: '', element: AdminDashboardHome },
          {
            path: 'manage-courses/*',
            element: CoursesComponent,
            children: [
              { path: '', element: ManageCourses },
              { path: 'add', element: AddNewCourse },
              { path: 'categories/*', element: CoursesCategory },
              { path: 'edit/:id/*', element: EditCourse }
            ]
          },
          {
            path: 'manage-users/*',
            element: CoursesComponent,
            children: [
              { path: 'admin/*', element: UsersAdmin },
              { path: 'content-writer/*', element: UsersContentWriter },
              { path: 'learner/*', element: UsersLearner }
            ]
          },
          { path: 'manage-profile/*', element: ManageProfile }
        ]
      },
      {
        path: 'manage-users/*',
        element: CoursesComponent,
        children: [
          { path: 'admin/*', element: UsersAdmin },
          { path: 'content-writer/*', element: UsersContentWriter },
          { path: 'learner/*', element: UsersLearner }
        ]
      },
      { path: 'manage-profile/*', element: ManageProfile }
    ]
  },
  // Content Creator Dashboard
  {
    path: 'content-creator',
    element: ContentCreatorOutlet,
    children: [
      {
        path: 'dashboard/*',
        element: ContentCreatorDashboardComponent,
        children: [
          { path: '', element: ContentCreatorDashboardHome },
          {
            path: 'manage-courses/*',
            element: CoursesComponent,
            children: [
              { path: '', element: ContentCreatorCourses },
              { path: 'add', element: AddNewCourse },
              { path: 'edit/:id/*', element: EditCourse }
            ]
          },
          { path: 'manage-profile/*', element: ManageProfile }
        ]
      }
    ]
  }
];

export default routes;

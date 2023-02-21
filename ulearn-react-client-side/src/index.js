import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.withCredentials = process.env.REACT_APP_PRODUCTION === 'true'  ? true : false;

console.log('from index', process.env.REACT_APP_PRODUCTION);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<Router>
				<App />
			</Router>
		</AuthProvider>
	</React.StrictMode>
);

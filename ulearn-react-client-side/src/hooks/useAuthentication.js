import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAxios from './useAxios';

const useAuthentication = () => {
	const [user, setUser] = useState(false);
	const [message, setMessage] = useState(false);
	const [forgotPasswordMsg, setforgotPasswordMsg] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const { client } = useAxios();

	const handleRegister = async (data, navigate) => {
		console.log(data);

		axios
			.post('/auth/register', data)
			.then((response) => {
				/* 	setUser(response.data.user); */
				setMessage(response.data.msg);
				console.log(response.data.msg);
				/* navigate('/'); */
			})
			.catch((err) => {
				console.log(err);
			});

		/* try {
			const response = await client.post('/auth/register', data);
			setUser(response.data.user);
			console.log(response.data.user);

			navigate('/');
		} catch (error) {
			console.log(error);
		} */
	};

	const handleLogin = (data, navigate) => {
		console.log(data);
		axios
			.post('/auth/login', data)
			.then((response) => {
				setUser(response.data.user);
				console.log(response.data.user);
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});

		/* try {
			const response = await client.post('/auth/login', data);
			setUser(response.data.user);
			console.log(response.data.user);
			navigate('/');
		} catch (error) {
			console.log(error.response.data);
		} */
	};

	const handleLogout = (navigate) => {
		axios
			.delete('auth/logout')
			.then((response) => {
				setUser(() => null);
				console.log(response.msg);
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
		/* 	try {
			const response = await client.get('auth/logout');
			setUser(() => null);
			navigate('/');
			console.log(response);
		} catch (error) {
			console.log(error.response.data);
		} */
	};

	useEffect(() => {
		if (!user) {
			axios
				.get('/users/showMe')
				.then((res) => {
					setUser(res.data.user);
					console.log(res.data.user, 'success');
				})
				.catch((err) => {
					console.log(err, 'fail');
					setUser(null);
				});
		}
	}, []);

	const handleForgotPassword = (data, navigate) => {
		console.log(data);
		axios
			.post('/auth/forgot-password', data)
			.then((response) => {
				setforgotPasswordMsg(response.data.msg);
				console.log(response.data.msg);
				/* navigate('/'); */
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleResetPassword = (data, navigate) => {
		axios
			.post('/auth/reset-password', data)
			.then((response) => {
				setforgotPasswordMsg(response.data.msg);
				console.log(response.data.msg);
				navigate('/auth/login');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return {
		user,
		handleRegister,
		handleLogin,
		message,
		handleLogout,
		handleForgotPassword,
		handleResetPassword,
		forgotPasswordMsg,
	};
};

export default useAuthentication;

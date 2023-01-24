import { useEffect, useState } from 'react';
import { notification } from 'antd';
import axios from 'axios';

const useAuthentication = () => {
	const [user, setUser] = useState(null);
	const [registerMsg, setRegisterMsg] = useState(false);

	const [forgotPasswordMsg, setforgotPasswordMsg] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleRegister = async (data) => {
		console.log(data);
		setLoading(true);
		axios
			.post('/auth/register', data)
			.then((response) => {
				setRegisterMsg(response.data.msg);
				console.log(response.data.msg);
				notification.success({
					message: 'You have been registered successfully!',
					description:
						'Please verify your email address from your gmail and login again.',
				});
			})
			.catch((error) => {
				console.log(error);
				notification.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
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
		setLoading(true);
		axios
			.post('/auth/login', data)
			.then((response) => {
				setUser(response.data.user);
				console.log(response.data.user);
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
				notification.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
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
		setLoading(true);
		axios
			.delete('/auth/logout')
			.then((response) => {
				setUser(() => null);
				console.log(response.msg);
				navigate('/');
			})
			.catch((error) => {
				console.log(error);
				notification.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
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

	const handleForgotPassword = (data, navigate) => {
		console.log(data);
		setLoading(true);
		axios
			.post('/auth/forgot-password', data)
			.then((response) => {
				setforgotPasswordMsg(response.data.msg);
				console.log(response.data.msg);
				/* navigate('/'); */
			})
			.catch((error) => {
				console.log(error);
				notification.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleResetPassword = (data, navigate) => {
		setLoading(true);
		axios
			.post('/auth/reset-password', data)
			.then((response) => {
				setforgotPasswordMsg(response.data.msg);
				console.log(response.data.msg);
				navigate('/auth/login');
			})
			.catch((error) => {
				console.log(error);
				notification.error({
					message: error.response.data.msg || error.message,
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		if (!user) {
			axios
				.get('/users/showMe')
				.then((res) => {
					setUser(res.data.user);
					console.log('retrieved user');
				})
				.catch((err) => {
					setUser(null);
					console.log('failed user');
				})
				.finally(() => {
					setLoading(false);
				});
		}

		return () => {};
	}, [user]);

	return {
		user,
		handleRegister,
		handleLogin,
		registerMsg,
		setRegisterMsg,
		handleLogout,
		handleForgotPassword,
		loading,
		handleResetPassword,
		forgotPasswordMsg,
	};
};

export default useAuthentication;

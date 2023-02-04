import { Result, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../layout/Loading/Loading';
import Lottie from '../layout/Lottie/Lottie';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Verify = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const query = useQuery();

	const verifyToken = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post('/auth/verify-email', {
				verificationToken: query.get('token'),
				email: query.get('email'),
			});
		} catch (error) {
			console.log(error.response);
			setError(true);
		}
		setLoading(false);
	};
	useEffect(() => {
		verifyToken();
	}, []);

	if (loading) {
		return (
			<div className='flex flex-col justify-center items-center space-y-4'>
				<Lottie
					src='https://assets6.lottiefiles.com/packages/lf20_DTosIIqiu8.json'
					size={{
						width: '450',
						height: '450',
					}}
				/>
			</div>
		);
	}

	if (error) {
		return (
			<Result
				status='error'
				title="There was an error, please double check your verification link{' '}"
				subTitle=''
				extra={
					<Link
						to='/auth/login'
						className='text-primary underline text-base'
					>
						Please Login
					</Link>
				}
			/>
		);
	}
	return (
		<div className='h-screen flex flex-col justify-center items-center space-y-4'>
			<div className='p-4 bg-white backdrop-filter rounded-lg'>
				<Lottie
					src='https://assets9.lottiefiles.com/packages/lf20_jbrw3hcz.json'
					size={{
						width: '450',
						height: '450',
					}}
				/>
				<Link
					to='/auth/login'
					className='text-primary underline text-base'
				>
					<button className='px-4 py-2 text-primary border border-primary'>
						Please Login
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Verify;

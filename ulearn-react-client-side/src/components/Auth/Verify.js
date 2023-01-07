import { Result, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

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
			<Space size='middle'>
				<Spin size='large' />
			</Space>
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
		<div className=' mx-auto '>
			<Result
				status='success'
				title='Account Confirmed!'
				subTitle=''
				extra={[
					<Link
						to='/auth/login'
						className='text-primary underline text-base'
					>
						Please Login
					</Link>,
				]}
			/>
		</div>
	);
};

export default Verify;

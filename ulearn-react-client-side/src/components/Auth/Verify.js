import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Verify = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const query = useQuery();

	const verifyToken = async () => {
		setLoading(true);
		try {
			const { data } = await axios.post('/auth/verify-email', {
				verificationToken: query.get('token'),
				email: query.get('email'),
			});
		} catch (error) {
			// console.log(error.response);
			setError(true);
		}
		setLoading(false);
	};
	useEffect(() => {
		verifyToken();
	}, []);
	if (loading) {
		return <h2>Loading...</h2>;
	}

	if (error) {
		return (
			<h4>
				There was an error, please double check your verification link{' '}
			</h4>
		);
	}
	return (
		<div className=' mx-auto '>
			<h2 className='flex items-center justify-center text-2xl font-bold text-dark '>
				Account Confirmed
			</h2>
			<Link to='/auth/login' className='btn'>
				Please login
			</Link>
		</div>
	);
};

export default Verify;

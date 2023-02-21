import { Result, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Loading from '../layout/Loading/Loading';
import Lottie from '../layout/Lottie/Lottie';
import ulearnLogo from '../../images/ulearn_logo.png';

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
			<div className='min-h-screen flex flex-col bg-primary'>
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
							src='https://assets6.lottiefiles.com/packages/lf20_DTosIIqiu8.json'
							size={{
								width: '450',
								height: '450',
							}}
						/>
						<h4 className='text-xl'>
							We're Verifying Your Credentials.
						</h4>
						<p className='text-base text-font2'>Please wait....</p>
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex flex-col bg-primary'>
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
							src='https://assets10.lottiefiles.com/packages/lf20_aiphuevx.json'
							size={{
								width: '450',
								height: '450',
							}}
						/>
						<h4 className='text-xl text-error'>
							There was an error, please double check your
							verification link
						</h4>
						<Link
							to='/auth/login'
							className='text-primary underline text-base'
						>
							Please Login
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
			<div className='min-h-screen flex flex-col bg-primary'>
				<div className=' flex justify-center items-center p-4 bg-white border-b'>
					<img
						className='w-[100px] h-[40px] object-cover'
						src={ulearnLogo}
						alt=''
					/>
				</div>
				<div className='flex-grow flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center space-y-4 bg-white rounded-lg p-8'>
						<Lottie
							src='https://assets6.lottiefiles.com/packages/lf20_d0gmxgy5KG.json'
							size={{
								width: '450',
								height: '450',
							}}
						/>
						<h4 className='text-xl'>
							Welcome Aboard! You Are Now Verified.
						</h4>
						<Link
							to='/auth/login'
							className='text-primary underline text-base'
						>
							<button className='px-4 py-2 text-primary border border-primary rounded-lg'>
								Login
							</button>
						</Link>
						<small>Please login to start your journey.</small>
					</div>
				</div>
			</div>
	);
};

export default Verify;

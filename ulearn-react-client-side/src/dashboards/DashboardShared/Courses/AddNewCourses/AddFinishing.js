import { Button, Result, Spin } from 'antd';
import React from 'react';
import Loading from '../../../../components/layout/Loading/Loading';
import LordIcon from '../../../../components/layout/LordIcon/LordIcon';
import Lottie from '../../../../components/layout/Lottie/Lottie';
import { motion } from 'framer-motion';
import useFramerMotion from '../../../../hooks/useFramerMotion';

const AddFinishing = ({ isUploading }) => {
	const { opacityVariant } = useFramerMotion();
	return (
		<div className='wrapper border rounded-lg w-11/12'>
			<Result
				icon={
					!isUploading ? (
						<motion.div
							initial='hidden'
							animate='visible'
							variants={opacityVariant}
							className='flex justify-center items-center'
						>
							<LordIcon
								src='https://cdn.lordicon.com/lupuorrc.json'
								size={100}
							/>
						</motion.div>
					) : (
						<motion.div
							initial='hidden'
							animate='visible'
							variants={opacityVariant}
							className='flex justify-center items-center'
						>
							<Lottie
								src='https://assets6.lottiefiles.com/packages/lf20_DTosIIqiu8.json'
								size={{ width: 250, height: 250 }}
							/>
						</motion.div>
					)
				}
				title='Great, we have done all the operations!'
				subTitle='Please note that your course will be in pending status after being uploaded. Add more content from edit section to get approved.'
			/>
			<div className='flex justify-end items-center bg-light p-4 space-x-2'>
				<button
					className='block w-full px-4 py-2 text-primary border rounded-lg border-primary disabled:opacity-5 font-bold'
					type='submit'
					disabled={isUploading}
				>
					{isUploading ? 'Submitting' : 'Submit'}
				</button>
			</div>
		</div>
	);
};

export default AddFinishing;

import React, { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { Alert, Input, message } from 'antd';
import axios from 'axios';

const ChangePasswordModal = ({ setIsPasswordModalOpen }) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const {
		control,
		formState: { errors },
		handleSubmit,
        reset
	} = useForm({});

    // [PATCH] sending api request
	const onSubmit = (data) => {
		setIsUpdating(true); 
        axios.patch('/users/updateUserPassword', data)
            .then(response => {
                message.success(response.data?.msg)
                setIsPasswordModalOpen(false);
                reset();
            }).catch(error => {
                message.warning(error?.msg || error?.response?.data?.message)
            }).finally(() => {
                setIsUpdating(false);
            })
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='p-4 bg-white rounded-lg drop-shadow space-y-4'
		>
			<div className='space-y-4'>
				<div className='font-medium space-y-2'>
					<label htmlFor=''>Current Password</label>
					<Controller
						name='oldPassword'
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='input password'
							/>
						)}
					/>
					{errors?.oldPassword?.type === 'required' && (
						<Alert
							message={'Current Password Is Required.'}
							type='warning'
							showIcon
						/>
					)}
				</div>
				<div className='font-medium space-y-2'>
					<label htmlFor=''>New Password</label>
					<Controller
						name='newPassword'
						control={control}
						rules={{
							required: true,
							pattern: /(?=.*[!#$%&?^*@~() "])(?=.{8,})/,
						}}
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder='input password'
							/>
						)}
					/>
					{errors?.newPassword?.type === 'pattern' && (
						<Alert
							message={
								'Eight char or longer and must have a special character.'
							}
							type='warning'
							showIcon
						/>
					)}
					{errors?.newPassword?.type === 'required' && (
						<Alert
							message={'New Password Is Required.'}
							type='warning'
							showIcon
						/>
					)}
				</div>
			</div>
			<div className='flex justify-end items-center space-x-2'>
				<button
					onClick={(e) => {
                        e.preventDefault();
                        reset();
                        setIsPasswordModalOpen(false);
                    }}
					className='px-4 py-2 border border-error rounded-lg text-error disabled:opacity-40'
					disabled={isUpdating}
				>
					Cancel
				</button>
				<button
					type='submit'
					className='px-4 py-2 border border-primary rounded-lg text-primary disabled:opacity-40'
					disabled={isUpdating}
				>
					{isUpdating ? (
						<span className='flex items-center space-x-2'>
							<LoadingOutlined />
							<span>Uploading</span>
						</span>
					) : (
						'Update Password'
					)}
				</button>
			</div>
		</form>
	);
};

export default ChangePasswordModal;

import React, { useEffect, useState } from 'react';
import { Button, Input, message, PageHeader, Select } from 'antd';
import addCategory from '../../../../images/add-user.png';
import axios from 'axios';
const AddLearner = () => {
	const [loading, setLoading] = useState(false);

	const [person, setPerson] = useState({
		email: '',
		name: '',
		password: '',
		gender: 'male',
		role: 'user',
	});
	const handleGender = (value) => {
		person.gender = value;
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPerson({ ...person, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { email, name, password, gender, role } = person;

		if (email && name && password && role && gender) {
			const data = {
				name,
				email,
				password,
				gender,
				role,
			};
			setLoading(true);
			axios
				.post('/auth/admin/register', data)
				.then((response) => {
					console.log(response.data.msg);
					message.success('new user registered successfully');
					setPerson({
						email: '',
						name: ' ',
						password: '',
					});
				})
				.catch((error) => {
					console.log(error);
					message.error(error.response.data.msg || error.message);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			message.warning('Inputs should be filled!');
		}
	};

	return (
		<div className='border-[0.5px] rounded-lg overflow-hidden '>
			<PageHeader
				ghost={false}
				onBack={() => window.history.back()}
				title='Add a new Learner'
				subTitle='if you go back, no changes are saved....'
			>
				<div className='grid grid-cols-12 min-h-[25vh] rounded-lg p-4'>
					<div className='col-span-5 bg-white'>
						<form
							className='grid grid-cols-12 gap-4 p-8 bg-light rounded-lg'
							onSubmit={handleSubmit}
						>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Email
								</label>
								<Input
									size='large'
									name='email'
									placeholder='abc@gmail.com'
									value={person.email}
									onChange={handleChange}
								/>
							</div>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Name
								</label>
								<Input
									size='large'
									name='name'
									placeholder='name'
									value={person.name}
									onChange={handleChange}
								/>
							</div>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									Gender
								</label>
								<Select
									defaultValue='male'
									style={{
										width: '100%',
									}}
									size={'large'}
									onChange={handleGender}
									options={[
										{
											value: 'male',
											label: 'Male',
										},
										{
											value: 'female',
											label: 'Female',
										},
										{
											value: 'others',
											label: 'Others',
										},
									]}
								/>
							</div>
							{/* input item */}
							<div className='col-span-12 space-y-2 flex flex-col'>
								<label className='text-font2 uppercase'>
									password
								</label>
								<Input
									size='large'
									name='password'
									type='password'
									placeholder='******'
									value={person.password}
									onChange={handleChange}
								/>
							</div>
							<Button
								className='col-span-12 mt-4 disabled:opacity-40'
								type='primary'
								htmlType='submit'
								disabled={loading}
							>
								Add Content Writer
							</Button>
						</form>
					</div>
					<div className='col-span-7'>
						<img
							className='object-cover w-10/12 mx-auto'
							src={addCategory}
							alt='add-category'
						/>
					</div>
				</div>
			</PageHeader>
		</div>
	);
};

export default AddLearner;

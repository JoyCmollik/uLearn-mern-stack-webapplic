import React, { useState } from 'react';
import './CourseDetailDiscussion.css';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const CommentList = ({ comments }) => (
	<List
		className='courseDetailCommentAuthorName courseDetail-author-time'
		dataSource={comments}
		header={`${comments.length} ${
			comments.length > 1 ? 'replies' : 'reply'
		}`}
		itemLayout='horizontal'
		renderItem={(props) => <Comment {...props} />}
	/>
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea
				rows={8}
				onChange={onChange}
				value={value}
				style={{
					border: '1px solid #dfdddc',
					borderRadius: '8px',
					paddingLeft: '16px',
					paddingTop: '20px',
					fontSize: '16px',
					color: '#222',
				}}
				placeholder='comment...'
				className=''
			/>
		</Form.Item>
		<Form.Item>
			<Button
				htmlType='submit'
				loading={submitting}
				onClick={onSubmit}
				type='primary'
			>
				Add Comment
			</Button>
		</Form.Item>
	</>
);

const CourseDetailDiscussion = () => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState('');
	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setValue('');
			setComments([
				...comments,
				{
					author: 'Han Solo',
					avatar: 'https://joeschmoe.io/api/v1/random',
					content: <p>{value}</p>,
					datetime: moment('2016-11-22').fromNow(),
				},
			]);
		}, 1000);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div className='p-10 text-base'>
			{comments.length > 0 && <CommentList comments={comments} />}
			<Comment
				avatar={
					<Avatar
						src='https://joeschmoe.io/api/v1/random'
						alt='Han Solo'
					/>
				}
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
			/>
		</div>
	);
};

export default CourseDetailDiscussion;

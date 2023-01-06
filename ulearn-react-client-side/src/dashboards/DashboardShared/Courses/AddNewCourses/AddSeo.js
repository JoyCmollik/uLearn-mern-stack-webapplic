import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Tag, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { HiOutlinePlus } from 'react-icons/hi';
import { Controller } from 'react-hook-form';

const AddSeo = ({ handleActiveTab, control, tags, setTags }) => {
	const [inputVisible, setInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [editInputIndex, setEditInputIndex] = useState(-1);
	const [editInputValue, setEditInputValue] = useState('');
	const inputRef = useRef(null);
	const editInputRef = useRef(null);

	useEffect(() => {
		if (inputVisible) {
			inputRef.current?.focus();
		}
	}, [inputVisible]);

	useEffect(() => {
		editInputRef.current?.focus();
	}, [inputValue]);

	const handleClose = (removedTag) => {
		const newTags = tags.filter((tag) => tag !== removedTag);
		console.log(newTags);
		setTags(newTags);
	};
	const showInput = () => {
		setInputVisible(true);
	};
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};
	const handleInputConfirm = () => {
		if (inputValue && tags.indexOf(inputValue) === -1) {
			setTags([...tags, inputValue]);
		}
		setInputVisible(false);
		setInputValue('');
	};
	const handleEditInputChange = (e) => {
		setEditInputValue(e.target.value);
	};
	const handleEditInputConfirm = () => {
		const newTags = [...tags];
		newTags[editInputIndex] = editInputValue;
		setTags(newTags);
		setEditInputIndex(-1);
		setInputValue('');
	};

	console.log(tags);
	return (
		<div className='grid grid-cols-12 gap-4 w-11/12 p-4'>
			{/* input item */}
			<div className='col-span-12 space-y-2 flex flex-col'>
				<label className='text-font2 uppercase'>Meta keywords</label>
				<div className='space-y-2 border rounded-lg p-2'>
					{tags.map((tag, index) => {
						if (editInputIndex === index) {
							return (
								<Input
									ref={editInputRef}
									key={tag}
									size='large'
									className='tag-input'
									value={editInputValue}
									onChange={handleEditInputChange}
									onBlur={handleEditInputConfirm}
									onPressEnter={handleEditInputConfirm}
								/>
							);
						}
						const isLongTag = tag.length > 20;
						const tagElem = (
							<Tag
								className='edit-tag'
								key={tag}
								closable={index !== 0}
								onClose={() => handleClose(tag)}
							>
								<span
									onDoubleClick={(e) => {
										if (index !== 0) {
											setEditInputIndex(index);
											setEditInputValue(tag);
											e.preventDefault();
										}
									}}
								>
									{isLongTag ? `${tag.slice(0, 20)}...` : tag}
								</span>
							</Tag>
						);
						return isLongTag ? (
							<Tooltip title={tag} key={tag}>
								{tagElem}
							</Tooltip>
						) : (
							tagElem
						);
					})}
					{inputVisible && (
						<Input
							ref={inputRef}
							type='text'
							size='large'
							className='tag-input'
							value={inputValue}
							onChange={handleInputChange}
							onBlur={handleInputConfirm}
							onPressEnter={handleInputConfirm}
						/>
					)}
					{!inputVisible && (
						<Tag onClick={showInput}>
							<span className='flex cursor-pointer justify-between items-center space-x-1'>
								<HiOutlinePlus size={10} /> <span>New Tag</span>
							</span>
						</Tag>
					)}
				</div>
			</div>
			<div className='col-span-12 space-y-2'>
				<label className='text-font2 uppercase'>Meta Description</label>
				<Controller
					name='courseMetaDesc'
					control={control}
					render={({ field }) => <TextArea rows={2} {...field} />}
				/>
			</div>
			<Button
				onClick={() => handleActiveTab('7')}
				className='col-span-2 mt-4'
				type='primary'
			>
				Next
			</Button>
		</div>
	);
};

export default AddSeo
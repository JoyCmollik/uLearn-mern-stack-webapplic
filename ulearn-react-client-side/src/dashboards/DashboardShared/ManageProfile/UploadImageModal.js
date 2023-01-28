import React from 'react';
import { Upload } from 'antd';

const UploadImageModal = ({ imgFile, setImgFile, limit = 1 }) => {
	const onChange = ({ fileList: newFileList }) => {
		setImgFile(newFileList);
	};
	const onPreview = async (file) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj);
				reader.onload = () => resolve(reader.result);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	console.log(imgFile);

	return (
		<div className='p-4 bg-white rounded-lg drop-shadow'>
			<Upload
				action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
				listType='picture-card'
				fileList={imgFile}
				onChange={onChange}
				onPreview={onPreview}
				beforeUpload={(file) => {
					setImgFile([...imgFile, file]);
					return false;
				}}
			>
				{imgFile.length < limit && '+ Upload'}
			</Upload>
		</div>
	);
};

export default UploadImageModal;

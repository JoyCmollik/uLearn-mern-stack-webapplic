import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Jodit } from 'jodit';
import axios from 'axios';
import { message } from 'antd';

const DashTextEditor = ({
	editorContent,
	setEditorContent,
	editor,
	placeholder,
	minHeight,
}) => {
	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/,
		placeholder: placeholder || 'Start typings...',
		enableDragAndDropFileToEditor: true,
		minHeight: minHeight || 200,
		extraButtons: ['uploadImage'],
	};

	const insertImage = (editor, url) => {
		const image = editor.selection.j.createInside.element('img');
		image.setAttribute('src', url);
		editor.selection.insertNode(image);
	};

	const FileUpload = async (file, editor) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = async () => {
			const newFile = await reader.result;
			axios
				.post('/images/upload', { file: newFile })
				.then((response) => {
					message.success('your image uploaded successfully');
					if (response.data.image.src) {
						insertImage(editor, response.data.image.src);
					}
				})
				.catch((error) => {
					message.error(error.response.data.msg | error.message);
				});
		};
	};

	const imageUpload = (editor) => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async function () {
			const imageFile = input.files[0];

			if (!imageFile) {
				return;
			}

			if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
				return;
			}

			await FileUpload(imageFile, editor);
		};
	};

	useEffect(() => {
		Jodit.defaultOptions.controls.uploadImage = {
			name: 'Upload image to Cloudinary',
			iconURL:
				'https://i.pinimg.com/originals/d7/22/d9/d722d9b3f8f8ae58d2fd3b4cb9dd657c.png',
			exec: async (editor) => {
				await imageUpload(editor);
			},
		};
	}, []);

	return (
		<>
			<JoditEditor
				value={editorContent}
				config={config}
				tabIndex={5} // tabIndex of textarea
				onBlur={(newContent) => setEditorContent(newContent)} // preferred to use only this option to update the content for performance reasons
				// onBlur={(newContent) => setEditorContent(newContent)}
			/>
		</>
	);
};

export default DashTextEditor;

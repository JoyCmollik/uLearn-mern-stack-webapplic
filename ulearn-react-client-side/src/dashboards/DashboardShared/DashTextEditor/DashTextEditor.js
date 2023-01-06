import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const DashTextEditor = ({ editorContent, setEditorContent, editor, placeholder }) => {
	const config = 
		{
			readonly: false, // all options from https://xdsoft.net/jodit/doc/,
			placeholder: placeholder || 'Start typings...',
		}
        
	return (
		<>
			<JoditEditor
				ref={editor}
				value={editorContent}
				// config={config}
				tabIndex={2} // tabIndex of textarea
				// onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
				onBlur={(newContent) => setEditorContent(newContent)}
			/>
		</>
	);
};

export default DashTextEditor;



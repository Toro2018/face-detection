import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, inputUrl}) => {
	return (
		<div>
			<p className='f3'>
				This Magic Brain will detect faces in your pictures, click 'detect' and wait few seconds...
				<br/>请点击"识别"并等待5秒钟...
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} value = {inputUrl}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}> 
						Detect/识别
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
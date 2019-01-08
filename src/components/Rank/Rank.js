import React from 'react';

const Rank = ({name,entries}) => {
	return (
		<div>
			<div className='white f3'>
			 {`${name}, your current entry count is ...`}<br/>{`${name},您当前的排名为 ...`}
			</div>
			<div className='white f1'>
			 {entries}
			</div>			
		</div>
	);
}

export default Rank;
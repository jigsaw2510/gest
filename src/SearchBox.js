import React from 'react';


const SearchBox = ({ searchfield, searchChange }) => {
	return (
		<div className='pa2'>
			<input className='pa3 ba b--black bg-light-gray tc'
			type='search' 
			placeholder='cauta monument' 
			onChange = {searchChange}
			/>
		</div>
	);
}

export default SearchBox;
import React from 'react'

function Loader({ size = 200, width = 10 }) {
	return (
		<div style={{
			animation: 'spin 500ms infinite linear',
			// color: '#eef2ff',
			width: `${size}px`,
			height: `${size}px`,
			borderRadius: '50%',
			border: '2px solid #eef2ff',
			borderTopColor: '#818cf8',
			borderRightColor: '#818cf8',
			borderWidth: `${width}px`,
		}}>
		</div>
	)
}

export default Loader

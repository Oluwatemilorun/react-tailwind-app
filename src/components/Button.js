import React from 'react'
import Loader from './Loader'

function Button(props) {
	const { block, disabled, loading, ...otherProps } = props || {}

	return (
		<button type="button" {...otherProps} disabled={loading ? true : disabled} className={`rounded-md shadow focus:outline-none relative ${block ? 'w-full' : ''} ${disabled ? 'text-gray-700 bg-gray-300' : 'text-white bg-indigo-500'}`}>
			<div className='py-2 px-3 text-sm font-semibold'>
				{loading && (
					<div className='absolute flex left-0 right-0 bottom-0 top-0 justify-center align-middle items-center'>
						<Loader width={4} size={24} />
					</div>
				)}
				<span className={`${loading ? 'invisible' : 'visible'}`}>{props.children || ' '}</span>
			</div>
		</button>
	)
}

export default Button

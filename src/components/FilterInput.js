import React, { useState } from 'react'
import Button from './Button'

/**
 * 
 * @param {object} props 
 * 
 * 
 */
function FilterInput(props) {
	const hidden = props.hidden || []
	const today = new Date(1997, 4, 9)
	const [day, setDay] = useState(today.getDate())
	const [month, setMonth] = useState(today.getMonth() + 1)
	const [year, setYear] = useState(2020)
	const [startYear, setStartYear] = useState(today.getFullYear())
	const [endYear, setEndYear] = useState(2021)

	const handleClick = () => {
		const startDate = new Date()
		const endDate = new Date()

		if (hidden.includes('day')) {
			startDate.setMonth(month - 1)
			startDate.setDate(1)

			endDate.setDate(31)
			endDate.setMonth(month - 1)
		} else {
			startDate.setDate(day)
			startDate.setMonth(month - 1)

			endDate.setDate(day)
			endDate.setMonth(month - 1)
		}
		
		if (hidden.includes('yearInterval')) {
			startDate.setFullYear(year)
			endDate.setFullYear(year)
		} else {
			startDate.setFullYear(startYear)
			endDate.setFullYear(endYear)
		}

		props.onSubmit?.(startDate, endDate)
	}

	return (
		<div>
			{!hidden.includes('day') && (
				<div className="grid grid-cols-12 gap-4 mb-4">
					<div className="col-span-4 self-center">
						<div className="text-white">Day</div>
					</div>
					<div className="col-span-8">
						<input type="number" className="w-full" min={1} max={31} value={day} onInput={(e) => setDay(e.target.value)} />
					</div>
				</div>
			)}
			{!hidden.includes('month') && (
				<div className="grid grid-cols-12 gap-4 mb-4">
					<div className="col-span-4 self-center">
						<div className="text-white">Month</div>
					</div>
					<div className="col-span-8">
						<input type="text" className="w-full" min={1} max={12} value={month} onInput={(e) => setMonth(e.target.value)} />
					</div>
				</div>
			)}
			<div className="grid grid-cols-12 gap-4 mb-4">
				<div className="col-span-4 self-center">
					<div className="text-white">Year</div>
				</div>
			{!hidden.includes('yearInterval') ? (
				<>
					<div className="col-span-3">
						<input type="number" className="w-full" min={1995} max={today.getFullYear()} value={startYear} onInput={(e) => setStartYear(e.target.value)} />
					</div>
					<div className="col-span-2 self-center">
						<div className="text-white text-center">to</div>
					</div>
					<div className="col-span-3">
						<input type="number" className="w-full" min={1995} max={today.getFullYear()} value={endYear} onInput={(e) => setEndYear(e.target.value)} />
					</div>
				</>
			) : (
				<div className="col-span-8">
					<input type="number" className="w-full" min={1995} max={today.getFullYear()} value={year} onInput={(e) => setYear(e.target.value)} />
				</div>
			)}
			</div>
			<div className="col-span-12 mb-4">
				<Button block onClick={handleClick}>{props.submitButtonText || 'Submit'}</Button>
			</div>
		</div>
	)
}

export default FilterInput

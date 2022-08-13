import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { useState, useEffect, useRef } from 'react'
import cn from 'classnames'

type DebouncedNumericInputProps = {
	value: number
	onChange: (value: number) => (void | Promise<void>)
	debounce?: number
	className?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'className'>

export default function DebouncedNumbericInput({
	value: initialValue,
	onChange,
	debounce = 500,
	className,
	...props
}: DebouncedNumericInputProps) {
	const [value, setValue] = useState<string | number>(initialValue)
	const timer = useRef<NodeJS.Timer>()

	function increment() {
		timer.current = setInterval(() => setValue(x => Number(x) + 1), 100);
	}

	function decrement() {
		timer.current = setInterval(() => setValue(x => Number(x) - 1), 100);
	}

	function removeInterval() {
		clearInterval(timer.current);
	}

	useEffect(() => setValue(initialValue), [initialValue])

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(Number(value))
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, debounce, onChange])

	function validateInput() {
		const temp = Number(value)
		if (isNaN(temp) || (props.min && temp < props.min)) {
			return setValue(initialValue)
		}
	}

	return (
		<div className="relative w-min">
			<MinusIcon
				onMouseLeave={removeInterval}
				onMouseUp={removeInterval}
				onMouseDown={decrement}
				onClick={() => setValue(x => Number(x) - 1)}
				className={cn('absolute w-4 aspect-square top-3.5 left-1.5 cursor-pointer select-none', { 'hidden': props.min && value <= props.min })}
			/>
			<input type="number" className={cn(className, 'appearance-none text-center')}
				{...props} value={value} onChange={e => setValue(e.target.value)} onBlur={validateInput}
			/>
			<PlusIcon
				onMouseLeave={removeInterval}
				onMouseUp={removeInterval}
				onClick={() => setValue(x => Number(x) + 1)}
				onMouseDown={increment}
				className="absolute w-4 aspect-square top-3.5 right-1.5 cursor-pointer select-none"
			/>
		</div>
	)
}
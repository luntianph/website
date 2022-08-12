import { useState, useEffect } from 'react'

type DebouncedInputProps = {
	value: string | number
	onChange: (value: string | number) => (void | Promise<void>)
	debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export default function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: DebouncedInputProps) {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, debounce, onChange])

	return (
		<input {...props} value={value} onChange={e => setValue(e.target.value)} />
	)
}
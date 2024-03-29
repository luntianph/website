import { FC, ReactNode, useEffect, useState } from 'react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'

type AccordionProps = {
	summary: ReactNode
	children: ReactNode
	className?: string
	open?: boolean
}

const Accordion: FC<AccordionProps> = ({ summary, children, className, open }) => {
	const [isOpen, setIsOpen] = useState<boolean>()

	// for some reason, initializing the state is not working, that's why useEffect is used.
	useEffect(() => {
		setIsOpen(open)
	}, [open])


	return (
		<details className={className} open={open} onToggle={() => setIsOpen(!isOpen)}>
			<summary className="cursor-pointer flex items-center justify-between text-gray-700 hover:text-gray-900">
				{summary}
				{isOpen ? <MinusIcon className="w-5" /> : <PlusIcon className="w-5" />}
			</summary>
			<div className="mt-2">
				{children}
			</div>
		</details>
	)
}

export default Accordion

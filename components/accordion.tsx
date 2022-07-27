import { FC, ReactNode } from 'react'
import { PlusIcon } from '@heroicons/react/outline'

type AccordionProps = {
	summary: ReactNode
	children: ReactNode
	className?: string
	open?: boolean
}

const Accordion: FC<AccordionProps> = ({ summary, children, className, open }) => {
	return (
		<details className={className} open={open}>
			<summary className="cursor-pointer flex items-center justify-between text-gray-700 hover:text-gray-900">
				{summary}
				<PlusIcon className="w-4" />
			</summary>
			<div className="mt-2">
				{children}
			</div>
		</details>
	)
}

export default Accordion

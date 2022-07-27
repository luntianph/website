import classNames from 'classnames'
import { FC, HTMLAttributes } from 'react'

const LoadingSpinner: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
	const cn = classNames("flex justify-center items-center", className)

	return (
		<div className={cn}>
			<div className="w-20 aspect-square border-t-transparent border-8 border-solid rounded-full animate-spin border-green-700" role="status" />
		</div>
	)
}

export default LoadingSpinner

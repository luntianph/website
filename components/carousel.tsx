import Image from 'next/image'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import cn from 'classnames'

type CarouselProps = {
	images: {
		url: string
		alt: string
		width: number
		height: number
	}[]
}

const styles = 'absolute z-10 w-8 top-1/2 -translate-y-1/2 cursor-pointer transition-transform'

const Carousel: FC<CarouselProps> = ({ images }) => {
	const [idx, setIdx] = useState(0)
	const maxIdx = images.length - 1
	const timer = useRef<NodeJS.Timeout>()

	const nextImage = useCallback(
		() => setIdx(idx >= maxIdx ? 0 : idx + 1),
		[idx, maxIdx, setIdx]
	)
	const previousImage = () => setIdx(idx == 0 ? maxIdx : idx - 1)

	// autoscroll carousel
	useEffect(() => {
		clearTimeout(timer.current)
		timer.current = setTimeout(nextImage, 5000)
	}, [idx, nextImage])

	return (
		<div className="w-full relative select-none aspect-[2]">
			<ChevronLeftIcon className={cn(styles, 'left-0 hover:-translate-x-1')} onClick={previousImage} />
			<ChevronRightIcon className={cn(styles, 'right-0 hover:translate-x-1')} onClick={nextImage} />
			<div className="relative">
				{images.map((img, i) => (
					<div key={img.url} className={cn('w-full absolute transition-opacity duration-500',
						{ 'opacity-100': i == idx, 'opacity-0': i != idx }
					)}>
						<Image src={img.url} width={img.width} height={img.height} objectPosition="contain" alt={img.alt} />
					</div>
				))}
			</div>
			<div className="absolute bottom-7 z-10 flex justify-center w-full space-x-2 items-center transition-transform">
				{images.map((_, i) => (
					<div key={i} className={cn(
						'rounded-full outline outline-white outline-1 w-2 aspect-square cursor-pointer hover:scale-125 transition-all',
						{ 'bg-white': idx == i }
					)}
						onClick={() => setIdx(i)} />
				))}
			</div>
		</div>

	)
}

export default Carousel

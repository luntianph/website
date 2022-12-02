import Image from 'next/future/image'

type TeamMemberProps = {
	name: string
	position: string
	src: string
}

export function TeamMember({ name, position, src }: TeamMemberProps) {
	return (
		<div className="flex justify-center">
			<div className="bg-green-200">
				<Image src={src} alt={`Picture of ${name}`} width={402} height={336} className="w-full" />
				<div className="px-4 py-6">
					<p className="text-xl text-center mb-1">{name}</p>
					<p className="text-xs font-light text-center">{position}</p>
				</div>
			</div>
		</div>
	)
}
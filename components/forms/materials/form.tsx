import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@components/loading-button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MaterialSchema, materialSchema } from '@models/material'
import ItemDescription from './item-description'

type MaterialFormProps = {
	material?: MaterialSchema
	onSubmit: (data: MaterialSchema) => Promise<void>
	isLoading: boolean
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>

const ProductForm = ({ material, onSubmit, isLoading, ...props }: MaterialFormProps) => {
	const { register, handleSubmit, formState: { errors }, control, reset } = useForm<MaterialSchema>({
		resolver: yupResolver(materialSchema),
		defaultValues: material ?? { items: [['']] },
	})
	const fieldArray = useFieldArray({ name: 'items', control })
	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<fieldset disabled={isLoading}>
				<div className="control">
					<label className="required" htmlFor="name">Name</label>
					<input type="text" id="name" {...register('name')} />
					<p className="form-err-msg text-sm">{errors.name?.message}</p>
				</div>
				{fieldArray.fields.map((field, i) => (
					<div key={field.id} className="mb-4">
						<div className="flex space-x-2">
							<label htmlFor={`layer-${i}`} className="required flex-1">Layer {i + 1}</label>
							<XMarkIcon className="aspect-square w-4 cursor-pointer hover:text-red-700" onClick={() => fieldArray.remove(i)} />
						</div>
						<input type="text" id={`layer-${i}`} {...register(`items.${i}.0` as const)} />
						<p className="form-err-msg text-sm">{errors.items?.[i]?.[0]?.message || errors.items?.[i]?.[1]?.message}</p>
						<ItemDescription nestIndex={i} register={register} control={control} errors={errors} />
					</div>
				))
				}
				<button type="button" onClick={() => fieldArray.append([''])}
					className="w-full text-center flex justify-center items-center space-x-2 border-gray-300 border rounded hover:bg-gray-200">
					<PlusIcon className="aspect-square w-4" />
					<span className="text">Add Layer</span>
				</button>
				<p className="form-err-msg text-sm">{errors.items?.message}</p>
				<div className="flex justify-end space-x-2">
					<button type="button" onClick={() => reset()} className="btn white px-4 rounded-sm">
						Reset
					</button>
					<LoadingButton type="submit" className="green btn px-4 rounded-sm" isLoading={isLoading}>
						Submit
					</LoadingButton>
				</div>
			</fieldset>
		</form>
	)
}

export default ProductForm

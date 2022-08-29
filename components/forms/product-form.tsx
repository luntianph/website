import { useFieldArray, useForm } from 'react-hook-form'
import { ProductSchema, productSchema } from '@models/product'
import { yupResolver } from '@hookform/resolvers/yup'
import useRetriever from '@lib/useRetriever'
import { MaterialGetAPI } from '@pages/api/materials'
import LoadingButton from '@components/loading-button'
import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'

type ProductFormProps = {
	product?: ProductSchema
	onSubmit: (data: ProductSchema) => Promise<void>
	isLoading: boolean
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>

const ProductForm = ({ product, onSubmit, isLoading, ...props }: ProductFormProps) => {
	const { data: materials } = useRetriever<MaterialGetAPI>('/api/materials')
	const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ProductSchema>({
		resolver: yupResolver(productSchema),
		defaultValues: product,
	})
	const fieldArray = useFieldArray({ name: 'images' as never, control })

	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<fieldset disabled={isLoading}>
				<div className="control">
					<label className="required" htmlFor="name">Name</label>
					<input type="text" id="name" {...register('name')} />
					<p className="form-err-msg text-sm">{errors.name?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="price">Price</label>
					<input type="number" id="price" min={0} {...register('price')} />
					<p className="form-err-msg text-sm">{errors.price?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="duration">Composting Duration</label>
					<input type="text" id="duration" {...register('compostingDuration')} />
					<p className="form-err-msg text-sm">{errors.compostingDuration?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="includes">Includes</label>
					<input type="text" id="includes" {...register('includes')} />
					<p className="form-err-msg text-sm">{errors.includes?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="color">Color</label>
					<input type="text" id="color" {...register('color')} />
					<p className="form-err-msg text-sm">{errors.color?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="conditions">Company Conditions</label>
					<textarea id="conditions" rows={3} {...register('companyConditions')} />
					<p className="form-err-msg text-sm">{errors.companyConditions?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="measurements">Measurements</label>
					<input type="text" id="measurements" {...register('measurements')} />
					<p className="form-err-msg text-sm">{errors.measurements?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="column">Column</label>
					<input type="number" id="column" min={0} {...register('column')} />
					<p className="form-err-msg text-sm">{errors.column?.message}</p>
				</div>
				<div className="control">
					<label className="required" htmlFor="column">Materials</label>
					<select id="materials" {...register('materials')}>
						{materials?.map(item => (
							<option key={item._id.toString()} value={item._id.toString()}>{item.name}</option>
						))}
					</select>
					<p className="form-err-msg text-sm">{errors.materials?.message}</p>
				</div>
				<div className="control">
					<div className="flex justify-between">
						<label className="required" htmlFor="images">Images</label>
						<PlusIcon className="aspect-square w-4 cursor-pointer hover:text-green-700" onClick={() => fieldArray.append('https://')} />
					</div>
					{fieldArray.fields.map((field, i) => (
						<div key={field.id} className="flex space-x-2">
							<input type="text" className="flex-1" {...register(`images.${i}` as const)} />
							<XMarkIcon className="aspect-square w-4 cursor-pointer hover:text-red-700" onClick={() => fieldArray.remove(i)} />
						</div>
					))
					}
					<p className="form-err-msg text-sm">{errors.images?.message}</p>
				</div>
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

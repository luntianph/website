import { useForm } from 'react-hook-form'
import { IProduct, ProductSchema, productSchema } from '@models/product'
import { yupResolver } from '@hookform/resolvers/yup'
import useRetriever from '@lib/useRetriever'
import { MaterialGetAPI } from '@pages/api/materials'

type ProductFormProps = {
	product?: ProductSchema
	onSubmit: (data: ProductSchema) => Promise<void>
} & Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>

const ProductForm = ({ product, onSubmit, ...props }: ProductFormProps) => {
	const { data: materials } = useRetriever<MaterialGetAPI>('/api/materials')

	const { register, handleSubmit, formState: { errors } } = useForm<ProductSchema>({
		resolver: yupResolver(productSchema),
		defaultValues: product,
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} {...props}>
			<div className="control">
				<label className="required" htmlFor="name">Name</label>
				<input type="text" id="name" {...register('name')} />
				<p className="form-err-msg text-sm">{errors.name?.message}</p>
			</div>
			<div className="control">
				<label className="required" htmlFor="price">Price</label>
				<input type="number" id="price" {...register('price')} />
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
			<input type="submit" className="green btn px-4 rounded-sm" />
		</form>
	)
}

export default ProductForm

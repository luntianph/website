import { Model, Schema, models, model, Document, ObjectId } from 'mongoose'
import * as yup from 'yup'
import { IMaterial } from './material'
import './material'

export const productSchema = yup.object({
	name: yup.string().trim().required('Product name is required!'),
	price: yup.number().typeError('Price is required!').required('Price is required!'),
	compostingDuration: yup.string().trim().required('Duration is required!'),
	includes: yup.string().trim().required(),
	color: yup.string().trim().required('Color is required!'),
	companyConditions: yup.string().trim().required('Company conditions are required!'),
	measurements: yup.string().trim().required('Measurements are required!').matches(/\d+cm x \d+cm/, 'This does not match the required pattern! <number>cm x <number>cm'),
	images: yup.array().of(yup.string().url().required()).min(1, 'At least 1 image is required!').required('At least 1 image is required!'),
	column: yup.number().typeError('Column is required!').required('Column is required!').min(0),
	materials: yup.string().matches(/^[a-f\d]{24}$/i, 'Invalid value!').required()
})

export type ProductSchema = yup.InferType<typeof productSchema>

export interface IProduct extends Omit<ProductSchema, 'materials'> {
	materials: ObjectId | IMaterial
}

const schema = new Schema<IProduct>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	materials: {
		type: Schema.Types.ObjectId,
		ref: 'Material',
	},
	compostingDuration: { type: String, required: true },
	includes: { type: String, required: true },
	color: { type: String, required: true },
	companyConditions: { type: String, required: true },
	measurements: { type: String, required: true },
	images: { type: [String], required: true },
	column: { type: Number, required: true }
}, { versionKey: false })

export default models?.Product as Model<Document & IProduct> || model<IProduct>('Product', schema, 'products')

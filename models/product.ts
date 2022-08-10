import { Model, Schema, models, model, Document, ObjectId } from 'mongoose'
import * as yup from 'yup'
import { IMaterial } from './material'
import './material'

const product = yup.object({
	name: yup.string().trim().required('Product name is required!'),
	price: yup.number().required('Price is required!'),
	compostingDuration: yup.string().trim().required('Duration is required!'),
	includes: yup.string().trim().required(),
	color: yup.string().trim().required('Color is required!'),
	companyConditions: yup.string().trim().required('Company conditions are required!'),
	measurements: yup.string().trim().required().matches(/\d+cm x \d+cm/, 'This does not match the required patter! <number>cm x <number>cm'),
	images: yup.array().of(yup.string().url().required()).min(1).required(),
}).required()

export interface IProduct extends yup.InferType<typeof product> {
	materials: ObjectId | IMaterial
}

const productSchema = new Schema<IProduct>({
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
	images: { type: [String], required: true }
})

export default models?.Product as Model<Document & IProduct> || model<IProduct>('Product', productSchema, 'products')

import { Model, Schema, models, model, Document } from 'mongoose'
import * as yup from 'yup'

const product = yup.object({
	name: yup.string().trim().required('Product name is required!'),
	price: yup.number().required('Price is required!'),
	materials: yup.array().of(
		yup.string().trim().required()
	).min(1).required(),
	compostingDuration: yup.string().trim().required('Duration is required!'),
	includes: yup.string().trim().required(),
	color: yup.string().trim().required('Color is required!'),
	companyConditions: yup.string().trim().required('Company conditions are required!'),
	measurements: yup.string().trim().required().matches(/\d+cm x \d+cm/, 'This does not match the required patter! <number>cm x <number>cm'),
	images: yup.array().of(yup.string().url().required()).min(1).required(),
}).required()

export type Product = yup.InferType<typeof product>

const productSchema = new Schema<Product>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	materials: { type: [String], required: true },
	compostingDuration: { type: String, required: true },
	includes: { type: String, required: true },
	color: { type: String, required: true },
	companyConditions: { type: String, required: true },
	measurements: { type: String, required: true },
	images: { type: String, required: true }
})

export default models?.Product as Model<Document & Product> || model<Product>('Product', productSchema, 'products')

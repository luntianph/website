import { Model, Schema, models, model, Document, ObjectId } from 'mongoose'
import * as yup from 'yup'

export const materialSchema = yup.object({
	name: yup.string().trim().required(),
	items:
		yup.array().of(
			yup.array().of(
				yup.lazy((item) => {
					if (typeof item == 'string') return yup.string().required()
					return yup.array().of(yup.string().required()).min(1).required()
				}) as unknown as yup.AnySchema<string | string[]>
			).length(2).required()
		).min(1).required()
})

export interface MaterialSchema {
	name: string
	items: [string, string[]][]
}

export interface IMaterial extends MaterialSchema {
	_id: ObjectId
}

const schema = new Schema<IMaterial>({
	name: { type: String, required: true, trim: true },
	items: { type: [], required: true, minlength: 1 }
}, { versionKey: false })

export default models?.Material as Model<Document & IMaterial> || model<IMaterial>('Material', schema, 'materials')

import { Model, Schema, models, model, Document } from 'mongoose'

export interface ISubscriber {
	_id: string
}

const subscriberSchema = new Schema<ISubscriber>({
	_id: { type: String },
})

export default models?.Subscriber as Model<Document<string> & ISubscriber> ||
	model<ISubscriber>('Subscriber', subscriberSchema, 'subscribers')

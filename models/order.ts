import * as yup from 'yup'

export const shippingDetailsSchema = yup.object({
	email: yup.string().email().trim().required('Email is a required field'),
	firstName: yup.string().trim().required('First name is a required field'),
	lastName: yup.string().trim().required('Last name is a required field'),
	address: yup.string().trim().required('Full address is a required field'),
	city: yup.string().trim().required('City is a required field'),
	region: yup.string().trim().required('Region is a required field'),
	zip: yup.number().typeError('Invalid zip code').required('Zip code is a required field'),
	barangay: yup.string().trim().required('Barangay is a required field'),
	contactNumber: yup.string().trim().matches(/^09\d{9}$/, 'Incorrect format. Ex: 09XXXXXXXXX').required('Contact number is a required field'),
	igLink: yup.string().matches(/^@.*$/, { message: 'Instagram handle must begin with "@"', excludeEmptyString: true }).optional(),
}).required()

export interface IShippingDetails extends yup.InferType<typeof shippingDetailsSchema> { }

export const deliveryMethodSchema = yup.object({
	method: yup.string().trim().required('Delivery method is a required field!').typeError('Delivery method is a required field!')
})

export interface IDeliveryMethod extends yup.InferType<typeof deliveryMethodSchema> { }

export interface Order {
	details: IShippingDetails
	delivery: IDeliveryMethod
}

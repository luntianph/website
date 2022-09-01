import { PlusIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MaterialSchema } from '@models/material'
import React from "react"
import { Control, DeepRequired, FieldErrorsImpl, useFieldArray, UseFormRegister } from "react-hook-form"

type ItemDescriptionProps = {
	nestIndex: number
	control: Control<MaterialSchema, object>
	register: UseFormRegister<MaterialSchema>
	errors: FieldErrorsImpl<DeepRequired<MaterialSchema>>
}

function ItemDescription({ nestIndex, control, register, errors }: ItemDescriptionProps) {
	const { fields, remove, append } = useFieldArray({
		control,
		//@ts-expect-error: library limitation, only accepts 'items' | items.${nestIndex}
		name: `items.${nestIndex}.1`
	})

	return (
		<div className="ml-4">
			{fields.map((item, i) => {
				return (
					<div key={item.id}>
						<div className="relative">
							<textarea {...register(`items.${nestIndex}.1.${i}` as const)} rows={3} />
							<XMarkIcon onClick={() => remove(i)}
								className="aspect-square w-3 absolute top-1 bg-gray-500 right-1 text-white z-10 hover:bg-red-700 cursor-pointer" />
						</div>
						<p className="form-err-msg text-sm">{errors.items?.[nestIndex]?.[1]?.[i]?.message}</p>
					</div>
				)
			})}
			<button type="button" onClick={() => append('')}
				className="flex justify-center items-center space-x-2 w-full border rounded border-gray-300 mt-2 hover:bg-gray-200">
				<PlusIcon className="aspect-square w-4" />
				<span>Add Item</span>
			</button>
		</div>
	)
}

export default ItemDescription

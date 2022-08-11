import Dexie, { Table } from 'dexie'

export interface CartItem {
	id: string
	quantity: number
}

export class LuntianDexie extends Dexie {
	cartItems!: Table<CartItem>

	constructor() {
		super('luntiandb')
		this.version(1).stores({
			cartItems: '&id'
		})
	}
}

const db = new LuntianDexie()

export default db

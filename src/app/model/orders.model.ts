export class Orders {

    customerId: number
    date: Date
    amount: number

    constructor( customerId: number, date: Date, amount:number) {

    this.customerId = customerId
    this.date = date
    this.amount = amount
    
    }
}

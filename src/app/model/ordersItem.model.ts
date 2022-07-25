export class OrdersItem {

    ordersId: number
   quantity:number
    trainingId:number

    constructor( ordersId: number, quantity:number,trainingId:number) {

    this.ordersId = ordersId
    this.quantity = quantity
    this.trainingId=trainingId
    }
}

import { Customer } from "./customer.model";
import { Article } from "./training.model";

export class Cart {
    customer : Customer;
    items : Map<number,Article>;

    constructor(){
        this.customer = new Customer("unknown","","","","","");
        this.items = new Map<number,Article>();
    }
}
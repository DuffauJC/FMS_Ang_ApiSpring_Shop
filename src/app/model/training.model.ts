import { Category } from "./category.model";

export interface Training {
    id: number;
    description: string;
    price: number;
    quantity:number
    imgURL:string
    category:Category
}
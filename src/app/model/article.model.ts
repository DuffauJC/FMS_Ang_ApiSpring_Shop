import { Category } from "./category.model";

export interface Article {
    id: number;
    brand: string;
    description: string;
    unitaryPrice: number;
    qty:number
    imgURL:string
    category:Category
}
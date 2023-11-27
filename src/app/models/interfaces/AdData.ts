import { AdCategoryEnum } from "../enums/AdCategoriesEnum";

export interface AdData {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number
    rating: number;
    category: AdCategoryEnum;

}

import { AdCategoryEnum } from "../enums/AdCategoriesEnum";

export interface AdDataMin {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number
    rating: number;
    category: AdCategoryEnum;

}

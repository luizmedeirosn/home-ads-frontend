import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataMinResponse {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number
    rating: number;
    category: AdCategoryEnum;

}

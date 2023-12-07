import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataFullResponse {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number
    rating: number;
    category: AdCategoryEnum;
    userId: number;
    userName: string;
    userLocation: string;
    publicationDate: Date;

}

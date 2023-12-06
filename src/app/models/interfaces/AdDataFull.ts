import { AdCategoryEnum } from "../enums/AdCategoriesEnum";

export interface AdDataFull {

    id: number;
    name: string;
    description: string;
    image: string;
    price: number
    rating: number;
    category: AdCategoryEnum;
    userId: number;
    userName: number;
    userLocation: number;
    publicationDate: Date;

}

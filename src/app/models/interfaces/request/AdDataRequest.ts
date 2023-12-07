import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataRequest {

    name: string;
    description: string;
    image: File;
    price: number
    rating: number;
    category: AdCategoryEnum;
    userId: number;
    userName: string;
    userLocation: string;
    publicationDate: Date;

}

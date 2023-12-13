import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataRequest {

    title: string;
    comment: string;
    image: any;
    averagePrice: number;
    rating: number;
    category: AdCategoryEnum;
    publicationDate: Date;
    userId: number;

}

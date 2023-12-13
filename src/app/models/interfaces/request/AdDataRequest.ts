import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataRequest {

    title: string;
    comment: string;
    image: File;
    averagePrice: number;
    rating: number;
    category: AdCategoryEnum;
    userName: string;
    publicationDate: Date;

}

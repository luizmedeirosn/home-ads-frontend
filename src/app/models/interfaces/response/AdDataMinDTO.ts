import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataMinDTO {

    id: number;
    title: string;
    comment: string;
    averagePrice: number;
    rating: number;
    category: AdCategoryEnum;
    imageLink: string;

}

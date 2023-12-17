import { AdCategoryEnum } from "../../enums/AdCategoriesEnum";

export interface AdDataFullDTO {

    id: number;
    title: string;
    comment: string;
    averagePrice: number;
    rating: number;
    category: AdCategoryEnum;
    publicationDate: Date;
    imageLink: string;
    userId: number;
    userEmail: string;

}

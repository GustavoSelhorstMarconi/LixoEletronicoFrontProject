import { Company } from "./Company";
import { Review } from "./Review";

export interface Person {
    id: number;

    name: string;

    email: string;

    isRepresentant: boolean;

    // companies: Company[];

    // reviews: Review[];
}

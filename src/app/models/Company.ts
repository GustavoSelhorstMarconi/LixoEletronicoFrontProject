import { SafeResourceUrl } from "@angular/platform-browser";
import { Address } from "./Address";
import { Person } from "./Person";
import { Review } from "./Review";

export interface Company {
    id: number;

    name: string;

    representantId: number;

    representant: Person;

    addressId: number;

    address: Address;

    reviewAverage: number;

    distance: number;

    reviews: Review[];

    logo: Blob;

    logoRetorno: string;

    logoLoaded: SafeResourceUrl;
}

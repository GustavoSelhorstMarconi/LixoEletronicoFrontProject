import { Address } from "./Address";
import { Person } from "./Person";

export interface Company {
    id: number;

    name: string;

    representantId: number;

    representant: Person;

    addressId: number;

    address: Address;

    reviewAverage: number;
}

import { Address } from "./Address";

export interface Company {
    id: number;

    name: string;

    representantId: number;

    addressId: number;

    Address: Address;
}

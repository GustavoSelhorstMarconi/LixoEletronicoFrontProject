import { HttpHeaders } from "@angular/common/http";

export class HeaderCreator {
    static CreateHeaderWithoutAuth(): any {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }

        return httpOptions;
    }

    static CreateHeaderWithAuth(): any {
        const auth = `Bearer ${JSON.parse(localStorage.getItem('auth') ?? '')?.token}`;

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json',
                'Authorization': auth
            })
        }

        return httpOptions;
    }
}
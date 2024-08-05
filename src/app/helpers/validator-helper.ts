import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorHelper {
    static mustMatchField(controlName: string, matchingControlName: string): any {
        return (group: AbstractControl) => {
            const formGroup = group as FormGroup;
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors['mustMatchField'])
            {
                return null;
            }

            if (control.value !== matchingControl.value)
            {
                matchingControl.setErrors({mustMatchField: true});
                return false;
            }
            else
            {
                matchingControl.setErrors(null);
                return true;
            }
        }
    }
}
import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidation {

    // whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {

         // check if string only contains whitespace
         if ((control.value.trim().length === 0) && (control.value != null)) {

            // invalid, return error object
            return { 'notOnlyWhitespace': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}

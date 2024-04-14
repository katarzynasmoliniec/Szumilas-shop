import { FormControl, ValidationErrors } from "@angular/forms";

export class FormValidation {

    // whitespace validation
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {

          // check if control(string) consists of only whitespaces
    if ((control.value != null) && (control.value.trim().length === 0 )) {
        return { 'onlyWhitespace': true };
      } else {
        return null;
      }
    }
}

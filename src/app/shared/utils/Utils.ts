import { FormControl, FormGroup } from '@angular/forms';

export class Utils {

  /**
   * Validate form
   * @param formGroup is the form to validate
   */
  public static validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }

}

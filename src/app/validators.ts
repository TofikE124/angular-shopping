import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const urlPattern = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

    if (!urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }

    return null;
  };
}

export function phoneValidator(
  control: FormControl
): { [key: string]: boolean } | null {
  const pattern =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  if (!control.value || pattern.test(control.value)) {
    return null;
  }

  return { phone: true };
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxNumber',
  standalone: true,
})
export class MaxNumber implements PipeTransform {
  transform(value: number, maxValue: number): string {
    return value > maxValue ? `${maxValue}+` : `${value}`;
  }
}

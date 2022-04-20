import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bold'
})
export class BoldPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value: any, args: any): any {
      if (!value)
          return value;
      {
          value = value.toString()
      }
      if (!args) {
          return value;
      }

      // Match in a case insensitive maneer
      const re = new RegExp(args, 'gi');
      const match = value.match(re);

      // If there's no match, just return the original value.
      if (!match) {
          return value;
      }

      const replacedValue = value.replace(re, "<b>$&</b>")
      return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "isUndefined" })

export class IsUndefinedPipe implements PipeTransform {
  transform(value: any) {
    if (value === undefined || value === "" || value===" ") {
      return (value = "N/A");
    } else {
      return value;
    }
  }
}
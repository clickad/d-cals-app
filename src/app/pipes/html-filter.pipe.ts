import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlFilter'
})
export class HtmlFilterPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/<(.|\n)*?>/g, "");
  }

}

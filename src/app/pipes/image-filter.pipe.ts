import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFilter'
})
export class ImageFilterPipe implements PipeTransform {

  transform(items: any[], matchId: any): any {
    if (!items || !matchId) {
      return items;
    }
    return items.filter(item => item.exercise === matchId);
  }

}

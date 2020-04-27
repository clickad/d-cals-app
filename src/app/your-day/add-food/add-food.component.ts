import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FoodNutritionsService } from '../../services/food-nutritions.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  public isLoading: boolean = false;
  search: string;
  foodData: any[];
  result: boolean = true;

  @Output() addFoodToDay: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private foodNutritionsService: FoodNutritionsService
  ) { }

  ngOnInit(): void {
  }

  getData(value: string): void {
    this.search = value;
    if (this.search != "") {
      this.isLoading = true;
      this.foodNutritionsService.getFood(this.search).subscribe(data => {
        this.displaydata(data);
      });
    }
  }

  displaydata(d): void {
    this.foodData = d.hits;
    this.result = this.foodData.length > 0 ? true : false;
    this.stopLoading();
  }

  stopLoading() {
    this.isLoading = false;
  }

  addFood(data, type){
    data.type = type;
    this.addFoodToDay.emit(data);
  }

  trimTitle(title){
    return title.split("-") ? title.split("-")[0] : title;
  }

}

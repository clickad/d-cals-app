import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FoodNutritionsService } from '../services/food-nutritions.service';


@Component({
  selector: 'app-your-day',
  templateUrl: './your-day.component.html',
  styleUrls: ['./your-day.component.css']
})
export class YourDayComponent implements OnInit {

  public meals: any[] = [
    {name: "Breakfast", data: []},
    {name: "Lunch", data: []},
    {name: "Dinner", data: []},
    {name: "Snack", data: []},
  ]

  public calories: number = 0;
  public proteins: number = 0;
  public fiber: number = 0;
  public carbs: number = 0;

  foodData: any[];
  search: string;
  result: boolean = true;
  public isLoading: boolean = false;

  constructor(
    private foodNutritionsService: FoodNutritionsService
    ) { }

  ngOnInit(): void {
  }

  clear(type){
    this.meals[type].data = [];
  }

  clearAll(){
    this.meals[0].data = [];
    this.meals[1].data = [];
    this.meals[2].data = [];
    this.meals[3].data = [];
  }

  calculateTotalNutritions(){
    let calories: any= 0;
    let proteins: any= 0;
    let fiber: any= 0;
    let carbs: any = 0;
    this.meals.forEach((e) => {
      e.data.forEach(el => {
        calories += parseFloat(el.nf_calories) ? parseFloat(el.nf_calories) : 0;
        proteins += parseFloat(el.nf_protein) ? parseFloat(el.nf_protein) : 0;
        fiber += parseFloat(el.nf_dietary_fiber) ? parseFloat(el.nf_dietary_fiber) : 0;
        carbs += parseFloat(el.nf_total_carbohydrate) ? parseFloat(el.nf_total_carbohydrate) : 0;
      });
    });
    return{
      calories: calories.toFixed(2),
      proteins: proteins.toFixed(2),
      fiber: fiber.toFixed(2),
      carbs: carbs.toFixed(2)
    }

  }

  calculatePerType(type){
    let calories: any= 0;
    let proteins: any= 0;
    let fiber: any= 0;
    let carbs: any = 0;
      this.meals[type].data.forEach(el => {
        calories += parseFloat(el.nf_calories) ? parseFloat(el.nf_calories) : 0;
        proteins += parseFloat(el.nf_protein) ? parseFloat(el.nf_protein) : 0;
        fiber += parseFloat(el.nf_dietary_fiber) ? parseFloat(el.nf_dietary_fiber) : 0;
        carbs += parseFloat(el.nf_total_carbohydrate) ? parseFloat(el.nf_total_carbohydrate) : 0;
      });

    return {
      calories: calories.toFixed(2),
      proteins: proteins.toFixed(2),
      fiber: fiber.toFixed(2),
      carbs: carbs.toFixed(2)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  remove(data, i){
    data.splice (i, 1);
  }

  stopLoading() {
    this.isLoading = false;
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

  addFood(data, type): void{
    data.type = type;
    this.meals[data.type].data.push(data);
  }

}

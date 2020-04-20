import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FoodNutritionsService } from '../services/food-nutritions.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  public workouts: any[] = [
    {name: "Workout", data: []},
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
    private foodNutritionsService: FoodNutritionsService,
    private matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {

    if (localStorage.hasOwnProperty("foodData")) {
      this.meals = JSON.parse(localStorage.getItem('foodData'));
    }

    if (localStorage.hasOwnProperty("workoutData")) {
      this.workouts = JSON.parse(localStorage.getItem('workoutData'));
    }

  }

  clear(type){
    this.meals[type].data = [];
    this.saveFoodToLocal();
  }

  clearWorkout(){
    this.workouts[0].data = [];
    this.saveWorkoutToLocal();
  }

  clearAll(){
    this.meals[0].data = [];
    this.meals[1].data = [];
    this.meals[2].data = [];
    this.meals[3].data = [];
    this.workouts[0].data = [];
    this.saveFoodToLocal();
    this.saveWorkoutToLocal();
  }

  calculateTotalNutritions(){
    let calories: any= 0;
    let workoutCal: any = 0;
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
    this.workouts[0].data.forEach(el => {
      workoutCal += parseFloat(el.calories) ? parseFloat(el.calories) : 0;
    });
    return{
      calories: (calories.toFixed(2) - workoutCal.toFixed(2)).toFixed(2),
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
    this.saveFoodToLocal();
    this.saveWorkoutToLocal();
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
    this.saveFoodToLocal();
    switch(type){
      case 0:
      this.openSnackBar("Food added to Breakfast");
      break;
      case 1:
      this.openSnackBar("Food added to Lunch");
      break;
      case 2:
      this.openSnackBar("Food added to Dinner");
      break;
      case 3:
      this.openSnackBar("Food added to Snack");
      break;
    }
  }

  addWorkout(data){
    this.workouts[0].data.push(data);
    this.saveWorkoutToLocal();
    this.openSnackBar("Workout added successfully!");
  }

  calculateWorkoutBurnedCal(){
    let calories: any= 0;
    this.workouts[0].data.forEach(el => {
      calories += parseFloat(el.calories) ? parseFloat(el.calories) : 0;
    });

    return {
      calories: calories.toFixed(2),
    }
  }

  trimTitle(title){
    return title.split("-") ? title.split("-")[0] : title;
  }

  openSnackBar(message: string) {
    let action = "";
    this.matSnackBar.open(message, action, {
      duration: 1500,
    });
  }

  saveFoodToLocal(){
    localStorage.setItem('foodData', JSON.stringify(this.meals));
    this.meals = JSON.parse(localStorage.getItem('foodData'));
  }

  saveWorkoutToLocal(){
    localStorage.setItem('workoutData', JSON.stringify(this.workouts));
    this.workouts = JSON.parse(localStorage.getItem('workoutData'));
  }

}

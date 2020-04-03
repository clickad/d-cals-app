import { Component, OnInit } from '@angular/core';
import { FoodNutritionsService } from '../services/food-nutritions.service';

@Component({
  selector: 'app-food-nutritions',
  templateUrl: './food-nutritions.component.html',
  styleUrls: ['./food-nutritions.component.css']
})
export class FoodNutritionsComponent implements OnInit {

  public title = "Search for food nutrition!";
  public subtitle = "Nutrition is the science that interprets the interaction of nutrients and other substances in food in relation to maintenance, growth, reproduction, health and disease of an organism.";
  
  foodData: any[];
  search: string;
  result: boolean = true;
  public isLoading: boolean = false;

  constructor(private foodNutritionsService: FoodNutritionsService) { }

  ngOnInit(): void {
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

}

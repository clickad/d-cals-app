import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { YourDayComponent } from '../your-day.component';
import { FoodNutritionsService } from '../../services/food-nutritions.service';

export interface DialogData {
  food: any;
  type: string;
}

@Component({
  selector: 'app-food-dialog',
  templateUrl: './food-dialog.component.html',
  styleUrls: ['./food-dialog.component.css']
})
export class FoodDialogComponent implements OnInit {

  public title = "Food";
  public subtitle = "Search for food and add to meal.";
  
  foodData: any[];
  search: string;
  result: boolean = true;
  public isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<YourDayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private foodNutritionsService: FoodNutritionsService) {}

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

  closeDialog(): void {
    this.dialogRef.close();
  }

  addFood(data, type): void{
    data.type = type;
    this.dialogRef.close(data);
  }

}

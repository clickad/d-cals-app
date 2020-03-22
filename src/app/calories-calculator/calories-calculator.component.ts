import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-calories-calculator',
  templateUrl: './calories-calculator.component.html',
  styleUrls: ['./calories-calculator.component.css']
})
export class CaloriesCalculatorComponent implements OnInit {

  public title: string = "Calories Calculator";
  public subtitle: string = "The Calorie Calculator can be used to estimate the number of calories a person needs to consume each day.";
  public formdata: any;
  public result: any;

  constructor() { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      age: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ])
      ),
      gender: new FormControl("", Validators.compose([Validators.required])),
      height: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ])
      ),
      weight: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[1-9][0-9]*$")
        ])
      )
    });
  }
  calculate(data): void {
    //For men:	BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5
    //For women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161
    if (data.gender === "1") {
      this.result = Math.round(
        (10 * data.weight + 6.25 * data.height - 5 * data.age) * 1.2 + 5
      );
    } else {
      this.result = Math.round(
        (10 * data.weight + 6.25 * data.height - 5 * data.age) * 1.2 - 161
      );
    }
    this.result = this.result + " cal";
  }

}

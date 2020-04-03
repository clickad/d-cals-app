import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css']
})
export class BmiCalculatorComponent implements OnInit {

  public title: string = "BMI Calculator";
  public subtitle: string = "Can be used to calculate BMI value and corresponding weight status.";
  public result: string;
  formdata: any;

  constructor() { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
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
    this.result = (data.weight / Math.pow(data.height / 100, 2)).toFixed(2);
  }

}

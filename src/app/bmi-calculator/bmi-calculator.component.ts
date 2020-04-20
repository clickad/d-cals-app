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
  public formdata: any;

  constructor() { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      unit: new FormControl("", Validators.compose([Validators.required])),
      height: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("")
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
    let height = data.unit == 1 ? data.height : (data.height*30.48).toFixed(1);
    let weight = data.unit == 1 ? data.weight : (data.weight*0.45359237).toFixed(1);
    this.result = ((weight) / Math.pow((height) / 100, 2)).toFixed(2);
  }

  resetForm(){
    this.formdata.patchValue({
      weight: "",
      height: ""
    });
    this.formdata.markAsUntouched()
  }

}

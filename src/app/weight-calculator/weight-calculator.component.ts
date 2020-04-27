import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-weight-calculator',
  templateUrl: './weight-calculator.component.html',
  styleUrls: ['./weight-calculator.component.css']
})
export class WeightCalculatorComponent implements OnInit {

  public title: string = "Ideal Weight Calculator";
  public subtitle: string = "Computes ideal (health-wise) bodyweight(IBW) ranges based on height and gender.";
  public formdata: any;
  public resultFrom: any;
  public resultTo: any;
  public result: any;

  constructor() { }

  ngOnInit(): void {
    this.formdata = new FormGroup({
      unit: new FormControl("", Validators.compose([Validators.required])),
      gender: new FormControl("", Validators.compose([Validators.required])),
      height: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("")
        ])
      )
    });
    if(localStorage.hasOwnProperty("userData")){
      this.setData();
    }
  }
  calculate(data) {
    
    let height = data.unit == 1 ? data.height : (data.height*30.48).toFixed(1);

    if (data.gender === "1") {
      this.resultFrom = (18.5 * Math.pow(height / 100, 2)).toFixed(1);
      this.resultTo = (25 * Math.pow(height / 100, 2)).toFixed(1);
    } else {
      this.resultFrom = 18.5 * Math.pow(height / 100, 2);
      this.resultTo = 25 * Math.pow(height / 100, 2);
      this.resultFrom = (this.resultFrom - this.resultFrom / 10).toFixed(1);
      this.resultTo = (this.resultTo - this.resultTo / 10).toFixed(1);
    }
    this.result = this.resultFrom + " kg - " + this.resultTo + " kg";
  }

  resetForm(){
    this.formdata.patchValue({
      height: ""
    });
    this.formdata.markAsUntouched()
  }

  setData(){
    let data = JSON.parse(localStorage.getItem('userData'));
    this.formdata.setValue({
      unit: data.unit,
      height: data.height,
      gender: data.gender == "Male" ? "1" : "2"
    });
  }

}

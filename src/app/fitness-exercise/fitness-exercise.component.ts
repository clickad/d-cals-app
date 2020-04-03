import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GymWorkoutsService } from '../services/gym-workouts.service';

@Component({
  selector: 'app-fitness-exercise',
  templateUrl: './fitness-exercise.component.html',
  styleUrls: ['./fitness-exercise.component.css']
})
export class FitnessExerciseComponent implements OnInit {

  public title: string = "Ideal Weight Calculator";
  public subtitle: string = "Computes ideal (health-wise) bodyweight(IBW) ranges based on height and gender.";

  public exercises: any[];
  public exerciseInfo: any[];
  public imagesData: any[];
  public search: any;
  public result = true;
  public isLoading: boolean = false;

  constructor(private gymService: GymWorkoutsService) { }

  ngOnInit(): void {
    this.getCat();
  }

  getCat() {
    this.gymService.getCategories().subscribe(data => {
      this.exercises = data['results'];
      this.stopLoading();
    });
  }

  stopLoading() {
    this.isLoading = false;
  }

  getData(value: string): void {
    this.isLoading = true;
    this.search = value;
    this.gymService.getImages(this.search).subscribe(data => {
      this.imagesData = data['results'];
    });
    this.gymService.getExerciseInfo(this.search).subscribe(data => {
      this.exerciseInfo = data['results'];
      this.stopLoading();
    });
  }


}

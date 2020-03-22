import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { FoodNutritionsComponent } from './food-nutritions/food-nutritions.component';
import { HomeComponent } from './home/home.component';
import { FitnessExerciseComponent } from './fitness-exercise/fitness-exercise.component';
import { YourDayComponent } from './your-day/your-day.component';
import { CaloriesCalculatorComponent } from './calories-calculator/calories-calculator.component';
import { WeightCalculatorComponent } from './weight-calculator/weight-calculator.component';
import { BmiCalculatorComponent } from './bmi-calculator/bmi-calculator.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'food-nutritions', component: FoodNutritionsComponent },
  { path: 'fitness-exercise', component: FitnessExerciseComponent },
  { path: 'your-day', component: YourDayComponent },
  { path: 'calories-calculator', component: CaloriesCalculatorComponent },
  { path: 'weight-calculator', component: WeightCalculatorComponent },
  { path: 'bmi-calculator', component: BmiCalculatorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ 
  AppComponent, 
  FoodNutritionsComponent, 
  FitnessExerciseComponent, 
  YourDayComponent, 
  CaloriesCalculatorComponent, 
  WeightCalculatorComponent, 
  BmiCalculatorComponent,
  PageNotFoundComponent]

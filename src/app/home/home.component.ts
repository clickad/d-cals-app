import { Component, OnInit } from '@angular/core';
import { IHomeNav } from '../interfaces/ihome-nav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tiles: IHomeNav[] = [
    {
      text: 'Your Day', 
      link: 'your-day',
      cols: 2, 
      rows: 2, 
      color: '#645f5f', 
      icon: "track_changes", 
      font_color: "#999595", 
      desc_color: '#3c3c3c',
      description: "Check your Day intake of Calories, Proteins..."
    },
    {
      text: 'Food Nutritions', 
      link: 'food-nutritions',
      cols: 2, 
      rows: 2, 
      color: '#756c6c ', 
      icon: "fastfood", 
      font_color: "#a59696", 
      desc_color: '#414141',
      description: "Search for Food and get Nutritions data."
    },
    {
      text: 'Fitness-Exercise', 
      link: 'fitness-exercise',
      cols: 2, 
      rows: 2, 
      color: '#957979', 
      icon: "directions_run", 
      font_color: "#b99f9f", 
      desc_color: '#464646',
      description: "Calories burned by Workout."
    },
    {
      text: 'Calories Calculator', 
      link: 'calories-calculator',
      cols: 2, 
      rows: 2, 
      color: '#a58e8e', 
      icon: "pie_chart", 
      font_color: "#c9b3b3", 
      desc_color: '#464646',
      description: "Calories a person needs to consume each day."
    },
    {
      text: 'Weight Calculator', 
      link: 'weight-calculator',
      cols: 2, 
      rows: 2, 
      color: '#a58a7b', 
      icon: "pie_chart", 
      font_color: "#c5aaab", 
      desc_color: '#464646',
      description: "Computes ideal bodyweight ranges."
    },
    {
      text: 'BMI Calculator', 
      link: 'bmi-calculator',
      cols: 2, 
      rows: 2, 
      color: '#b19a87', 
      icon: "pie_chart", 
      font_color: "#d1baa7", 
      desc_color: '#464646',
      description: "BMI value and corresponding weight status."
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

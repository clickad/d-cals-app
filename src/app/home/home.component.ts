import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  icon: string;
  font_color: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {
      text: 'Food Nutritions', 
      link: 'food-nutritions',
      cols: 2, 
      rows: 2, 
      color: '#645f5f', 
      icon: "fastfood", 
      font_color: "#999595", 
      description: "Search for Food and get Nutritions data."
    },
    {
      text: 'Fitness-Exercise', 
      link: 'fitness-exercise',
      cols: 2, 
      rows: 2, 
      color: '#756c6c', 
      icon: "pool", 
      font_color: "#a59696", 
      description: "Search for Exercises by Categories."
    },
    {
      text: 'Your Day', 
      link: 'your-day',
      cols: 2, 
      rows: 2, 
      color: '#957979', 
      icon: "track_changes", 
      font_color: "#b39999", 
      description: "Check your Day intake of Calories."
    },
    {
      text: 'Calories Calculator', 
      link: 'calories-calculator',
      cols: 2, 
      rows: 2, 
      color: '#a58e8e', 
      icon: "pie_chart", 
      font_color: "#c9b3b3", 
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
      description: "BMI value and corresponding weight status."
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

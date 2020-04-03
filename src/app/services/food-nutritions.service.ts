import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FoodNutritionsService {

  constructor(private http: HttpClient) { }

  getFood(searchText: string) {
    return this.http.get(
      "https://api.nutritionix.com/v1_1/search/" +
        searchText +
        "?results=0%3A21&cal_min=0&cal_max=50000&fields=*&appId=a279e5e0&appKey=0983d53a8cf48a71afe304e657f2c5c4"
    );
  }

}


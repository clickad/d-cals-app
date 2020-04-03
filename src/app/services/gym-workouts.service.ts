import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GymWorkoutsService {

  constructor(private http: HttpClient) { }

  createAuthHeader(headers: HttpHeaders) {
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "multipart/form-data");
    headers.append(
      "Authorization",
      "Token 2290280dbdc8bc00ce018dff9f1cf20ce56f527f"
    );
  }

  getCategories() {
    let headers = new HttpHeaders();
    this.createAuthHeader(headers);
    return this.http.get(
      "https://wger.de/api/v2/exercisecategory/?limit=10000&status=2&language=2",
      { headers: headers }
    );
  }

  getImages(id: string) {
    let headers = new HttpHeaders();
    this.createAuthHeader(headers);
    return this.http.get("https://wger.de/api/v2/exerciseimage/?limit=10000", {
      headers: headers
    });
  }

  getExerciseInfo(id: string) {
    let headers = new HttpHeaders();
    this.createAuthHeader(headers);
    return this.http.get(
      "https://wger.de/api/v2/exercise/?category=" +
        id +
        "&limit=10000&language=2&status=2",
      { headers: headers }
    );
  }
}

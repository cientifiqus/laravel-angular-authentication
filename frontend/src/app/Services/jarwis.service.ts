import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = "http://127.0.0.1:8000/api";
  private token = "";

  constructor(
    private http: HttpClient,
    private Token: TokenService
  ) {

  }

  signup(data){
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  login(data){
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  sendPasswordResetLink(data) {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data) {
    console.log(data);
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  retrieveUser(data) {
    return this.http.post(`${this.baseUrl}/retrieveUser`, data, this.getHttpHeaders());
  }

  getHttpHeaders() {
    this.token = this.Token.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Authorization: Bearer ${this.token}`
      })
    };
    return httpOptions;
  }

  updateUser(data) {
    return this.http.post(`${this.baseUrl}/updateUser`, data, this.getHttpHeaders());
  }

  deleteUser(data) {
    return this.http.post(`${this.baseUrl}/deleteUser`, data, this.getHttpHeaders());
  }

  CategoryCreate(data) {
    return this.http.post(`${this.baseUrl}/CategoryCreate`, data, this.getHttpHeaders());
  }

  retrieveCategories(data) {
    return this.http.post(`${this.baseUrl}/retrieveCategories`, data, this.getHttpHeaders());
  }

  editCategory(data) {
    return this.http.post(`${this.baseUrl}/editCategory`, data, this.getHttpHeaders());
  }

  getCategory(data) {
    return this.http.post(`${this.baseUrl}/getCategory`, data, this.getHttpHeaders());
  }

}

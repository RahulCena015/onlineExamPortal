import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //LOAD ALL THE CATEGORIES
  public categories()
  {
    return this._http.get(`${baseUrl}/category/`);
  }

  //ADD NEW CATEGORY
  public addCategory(category:any)
  {
    return this._http.post(`${baseUrl}/category/`,category);
  }

  //DELETE CATEGORY
}

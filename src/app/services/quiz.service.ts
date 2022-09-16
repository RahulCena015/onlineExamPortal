import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //GET ALL QUIZZES
  public quizzess()
  {
    return this._http.get(`${baseUrl}/quiz/`)
  }

  //ADD QUIZ FUNCTION TO ADD QUIZ IN CATEGORY
  public addQuiz(quiz:any){
   return this._http.post(`${baseUrl}/quiz/`,quiz)
  }

  //DELETE QUIZ WITH QUIZ-ID
  public deleteQuiz(qId:any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //GET THE SINGLE QUIZ
  public getQuiz(qId:any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //UPDATE QUIZ
  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }

  //GET QUIZZES OF CATEGORY
  public getQuizzesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //GET ACTIVE QUIZZES
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //GET ACTIVE QUIZZES OF CATEGORY
  public getActiveQuizzesOfCategory(cid:any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  //GET QUESTION -- This fuction is used for Admin
  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //GET QUESTION --This function is used for Normal user
  public getQuestionsOfQuizFortest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //ADD QUESTION
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //DELETE QUESTION
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //EVALUATING QUIZ
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}

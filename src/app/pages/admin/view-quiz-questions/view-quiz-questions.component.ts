import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any=[];

  constructor(
    private _route:ActivatedRoute,private _question:QuestionService,private _snak:MatSnackBar) { }

  ngOnInit(): void {

   this.qId= this._route.snapshot.params['qid'];
   this.qTitle=this._route.snapshot.params['title'];
  
   this._question.getQuestionsOfQuiz(this.qId).subscribe(
    (data:any)=>{
      console.log(data);
      this.questions=data;
    },
    (error)=>{
      console.log(error);   
    }
   ); 
  }

  //DELETE QUESTION
  deleteQuestion(qid:any){
    Swal.fire({
      icon:"info",
      showCancelButton:true,
      confirmButtonText:"Delete",
      title:"Are you sure",
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //CONFIRM
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            this._snak.open("Question Deleted Sucessfully","Ok",{
              duration:2000,
            });
            this.questions=this.questions.filter((q:any)=>q.quesId!=qid);
          },
          (error)=>{
            this._snak.open("Error in deleting question","Ok",{
              duration:2000,
            });
            console.log(error);
            
          }
        )
      }
    })
  }

}
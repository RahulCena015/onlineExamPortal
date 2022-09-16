import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _cat:CategoryService) { }
  qId:any=0;
  quiz:any;
  categories:any;

  ngOnInit(): void {
   this.qId=this._route.snapshot.params['qid'];
   //alert(this.qId);
   this._quiz.getQuiz(this.qId).subscribe(
   (data:any)=>{
    this.quiz=data;
    console.log(this.quiz);
   },
   (error)=>{
    console.log(error);
   }
   );

   this._cat.categories().subscribe(
    (data:any)=>{
      this.categories=data;
    },(error)=>{
      alert("Error in loading categories");
    }
   );
  }

  //UPDATE FORM SUBMIT
  public updateData(){
    //VALIDATION
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success","Quiz updated successfuly","success");
      },(error)=>{
       Swal.fire("Error","Error in updating","error");
       console.log(error);
      }
    );
  }

}
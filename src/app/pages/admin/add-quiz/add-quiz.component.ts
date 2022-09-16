import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[]

    quizData:any={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:'',
    },
  };

  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //CATEGORIES LOAD
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading data from server","error");
        
      }
    );
  }

  //ADD QUIZ FUNCTION
  public addQuiz(){
    if(this.quizData.title.trim()==''||this.quizData.title==null){
      this._snack.open("Ttile is required..","ok",{
        duration:2000,
      });
     return;
    }
    
  //CALLING SERVER
  this._quiz.addQuiz(this.quizData).subscribe(
    (data:any)=>{
      Swal.fire("Success","Quiz is added successfuly","success");
      this.quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid:'',
        },
      };
    },
    (error)=>{
      Swal.fire("error","Error while adding quiz","error")
      console.log(error);
      
    }
  );
  }
}

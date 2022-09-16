import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  

  qId:any;
  qTitle:any;
  question:any={
    quiz:{
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _route:ActivatedRoute,private _quiz:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.question.quiz['qId']=this.qId;
    this.qTitle=this._route.snapshot.params['title']
  }
  public formSubmit(){
    if(this.question.content.trim()==''||this.question.content==null){
      return;
    }
    //SUBMITTING FORM
    this._quiz.addQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success","Question added successfully","success");
        //TO MAKE THE FIELD BLANK AFTER THE SUCCESS MESSAGE
        this.question.content='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4=''
      },
      (error)=>{
        Swal.fire("Error","Error in adding question","error");
      }
    );
  }

}

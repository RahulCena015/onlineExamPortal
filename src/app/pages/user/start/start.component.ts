import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {


  qid:any;
  questions:any; //variable to store all data coming from backend

  marksGot:any=0;
  correctAnswers:any=0;
  attempted:any=0;

  isSubmit:any=false;
  timer:any;

  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions(){
    this._question.getQuestionsOfQuizFortest(this.qid).subscribe(
      (data:any)=>{
       this.questions=data;
       console.log(this.questions);
       

       this.timer=this.questions.length*1*60;
  
       //THIS LOGIC IS NOW NOT REQUIRED AS WE HAVE USED THIS LOGIC AT THE BACKEND
      //  this.questions.forEach((q:any)=>{
      //   q['givenAnswer']='';
      //  });
       
       this.startTimer();

      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions","error");
        
      }
    )
  }
  //CODE TO PREVENT GOING BACK AFTER ONCE TEST OR QUIZ STARTS
  preventBackButton(){
    history.pushState(null,location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,location.href);
    });
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
    }).then((e)=>{
      if(e.isConfirmed){
       this.evalQuiz();
      }
    });
  }

  startTimer(){
    let t= window.setInterval(()=>{
      //code
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      } else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }

  evalQuiz(){
    //CACULATION
   
  //CALL TO SERVER TO CHECK QUESTIONS
  this._question.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGot=Number(data.marksGot).toFixed(2);
      this.attempted=data.attempted;
      this.correctAnswers=data.correctAnswers;
      this.isSubmit=true;
    },
    (error)=>{
      console.log(error);
    }
  )


    // console.log(this.questions);
    // this.isSubmit=true;

    // this.questions.forEach((q:any)=>{
    //   if(q.givenAnswer==q.answer)
    //   {
    //     this.correctAnswers++;
    //     let marksSingle= this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksSingle;
    //   }

    //   if(q.givenAnswer.trim()!=''){
    //     this.attempted++;
    //   }
    // });
    // console.log("Correct answer:"+this.correctAnswers);
    // console.log("Marks got"+this.marksGot);
    // console.log("Attempted:"+this.attempted);
  }

  //TO PRINT THE RESULT 
  printPage(){
    window.print();
  }

}

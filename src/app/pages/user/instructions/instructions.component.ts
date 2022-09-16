import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any; // We have used this variable to store data and use this again in HTML class to get the data


  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) { }

  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid']  //Note must use same qid which is used in routing module.ts file

    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        //console.log(data);
        this.quiz=data; //Here we are storing data in quiz variable whatever data we are getting from quiz service
      },
      (error)=>{
        console.log(error);
        alert("Error in loading quiz data");
      }
    )
  }

  startQuiz(){
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}

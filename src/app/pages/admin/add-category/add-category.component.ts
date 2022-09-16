import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category:any={
    title:'',
    description:'',
  };

  constructor(private _category:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void { }

  formSubmit(){
    if(this.category.title.trim()==''||this.category.title==null){
      this._snack.open("Ttile is required",'ok',{
        duration:2000
      });
      return;
    }

    //ALL DONE
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Succes","Category is added successfully",'success');
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Server error",'error');
      }

    );
  }



}

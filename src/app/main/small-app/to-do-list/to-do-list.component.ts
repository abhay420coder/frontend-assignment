import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { globalUrls } from 'src/assets/url';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  // templateUrl: './todo4.html',

  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  todoLists : any= [];
  myForm: any;
  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) { }
  
    ngOnInit(): void {
      this.myForm = this.fb.group({
        "title": ["", [Validators.required]],
        "description": [""],

      });

      this.api.getData(globalUrls.TODO_RENDER_URL).subscribe(data=>{
        console.log("data => " , data);
        this.todoLists = data
      })
    }

    addTask(form: FormGroup){
      console.log('Valid?', form.valid); // true or false
      console.log('value', form.value);
    }

}

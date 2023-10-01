import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { globalUrls } from 'src/assets/url';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit , OnChanges {
  todoLists : any= [];
  myForm: any;
  // url =globalUrls.TODO_RENDER_URL;
  url = globalUrls.TODO_LOCOL_URL;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router:Router,
  ) { }
  
    ngOnInit(): void {
      this.myForm = this.fb.group({
        "id":[""],
        "title": ["", [Validators.required]],
        "description": ["" , [Validators.required]],
      });
      this.getTodoLists();

    }

    ngOnChanges(changes: SimpleChanges): void {
      // this.getTodoLists();
    }

    async addTask(form: FormGroup){
      console.log('Valid?', form.valid); // true or false
      console.log('value', form.value);
      if(!form.value.id)this.postTodoLists(form.value);
      if(form.value.id)this.updateTodoLists(form.value , form.value.id);
      await this.getTodoLists();
      this.myForm.reset();
      location.reload();
    }

    editTask(todo:any){
      this.myForm.setValue({
        "title": todo.title,
        "description": todo.description,
        "id":todo["_id"]
      })
      console.log("task id  :-    " , todo["_id"])
    }

    getTodoLists(){
      this.api.getData(this.url).subscribe((data:any)=>{
        console.log("data => " , data);
        this.todoLists = data
      })
    }

    postTodoLists(data:any){
      let todoList ={
        "title": data.title,
        "description":data.description
      }
      this.api.postData(this.url , todoList).subscribe((data:any)=>{
        console.log("data => " , data);
      })
      
    }

    updateTodoLists(data:any , id:any){

      let todoList ={
        "title": data.title,
        "description":data.description
      }
      this.api.putData(this.url+id , todoList).subscribe((data:any)=>{
        console.log("data => " , data);
      })
      
    }

    deleteTask(todo:any){

      let todoList ={
        "title": todo.title,
        "description":todo.description
      }
      this.api.deleteData(this.url+todo["_id"] , todoList).subscribe((data:any)=>{
        console.log("data => " , data);
      })
      this.getTodoLists();
      location.reload();
    }


}

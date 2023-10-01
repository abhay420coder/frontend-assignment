import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-miniapplist',
  templateUrl: './miniapplist.component.html',
  styleUrls: ['./miniapplist.component.scss']
})
export class MiniapplistComponent implements OnInit {
  miniAppList=[
    {
      miniApImage:'https://img.freepik.com/free-vector/giant-check-list_23-2148118326.jpg?w=740&t=st=1696098285~exp=1696098885~hmac=4c754fe91ab6b82c14daf1ad33aaac97b144ca6c9af7ec7d9691d75f70615899',
      // miniApImage2:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
    {
      miniApImage:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List 2',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
    {
      miniApImage:'https://img.freepik.com/free-vector/giant-check-list_23-2148118326.jpg?w=740&t=st=1696098285~exp=1696098885~hmac=4c754fe91ab6b82c14daf1ad33aaac97b144ca6c9af7ec7d9691d75f70615899',
      // miniApImage2:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List 3',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
    {
      miniApImage:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List 4',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
    {
      miniApImage:'https://img.freepik.com/free-vector/giant-check-list_23-2148118326.jpg?w=740&t=st=1696098285~exp=1696098885~hmac=4c754fe91ab6b82c14daf1ad33aaac97b144ca6c9af7ec7d9691d75f70615899',
      // miniApImage2:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List 5',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
    {
      miniApImage:'https://img.freepik.com/premium-vector/e-learning-with-flat-people-reading-books_87771-4316.jpg',
      miniAppName:'To - Do - List 6',
      miniAppCategory:"Organize" , 
      miniAppDeveloper:"Abhay Kumar",
      miniAppUrlName:'todo'
    },
  ]

  constructor(
    private router: Router,
    ) { }
  
    ngOnInit(): void {
  
    }

  playApp(event:any){
    let url = event.url;
    if(url.length){
      url = "miniApp/"+url
      this.router.navigate([url])
    }
    
  }
}

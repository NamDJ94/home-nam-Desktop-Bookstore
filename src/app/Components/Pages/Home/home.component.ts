import { Component } from '@angular/core';
import { BookService} from '../../../Services/book.module';

@Component({
    templateUrl: 'home.component.html',
    selector: 'home',
    providers: [BookService]
})


export class HomeComponent{
   arrBook:any = [];
   constructor ( private bookService: BookService){
       bookService.getBook().subscribe(data=>{
           console.log(data);
           this.arrBook = data;
       });
   }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class BookService{
    constructor (private http: HttpClient) {}

    getBook(){//parametre from angular request
        // Options
        let options = {
            headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") //voir dans body Postman

        }
        //Body (let Body)

        ///
        return this.http.post("http://localhost:3000/api/book", options); //peut remplacer localhost par IPv4
    }
}
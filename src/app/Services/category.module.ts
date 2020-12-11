import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable() // Declarer Injectable objet


export class CategoryService{
    constructor (private http: HttpClient ){}

    getCategory(){
        // Options
        let options = {
            headers : new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded") //voir dans body Postman

        }
        //Body (let Body)

        ///
        return this.http.post("http://localhost:3000/api/cate", options); //peut remplacer localhost par IPv4
    }
}
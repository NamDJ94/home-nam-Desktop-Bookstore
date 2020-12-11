import { Component } from '@angular/core';
import { CategoryService} from '../../../Services/category.module';

@Component({
    templateUrl: 'categories.component.html',
    selector: 'categories',
    providers: [CategoryService] //pour utiliser service
})


export class CategoriesComponent{
    arrCate:any = [];
    constructor( private cateService: CategoryService){
        cateService.getCategory().subscribe(data=>{
            console.log(data);
            this.arrCate = data;
        }); //subscribe pour attendre le résultat de getCategory pour continuer
    }
}
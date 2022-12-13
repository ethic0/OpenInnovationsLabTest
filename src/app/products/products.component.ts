import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_service/apiService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: any[]= [];
  constructor(private apiService:ApiService) { }
  ngOnInit(): void {
    this.apiService.getProducts()
    .subscribe(response => {
      this.productList.push(response)
      // console.log(this.productList)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productCategories: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService) { }

  ngOnInit(): void {
  }

}

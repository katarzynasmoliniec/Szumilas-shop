import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CartItem } from 'src/app/overall/cart-item';
import { Product } from 'src/app/overall/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Image } from 'src/app/overall/image';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  public images: Image[] = [];

  categoryNumber: number = 3;
  pageNumber: number = 1;
  pageSize: number = 3;
  searchMode: boolean = false;
  searchKeyword: string = '';

  roles: string[] = [];

  @ViewChild(UploadFileComponent, {static : true}) uploadFileComponent!:UploadFileComponent;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private oauthService: OAuthService,
              private imageService: ImageService,
              private router: Router,) { }

  ngOnInit(): void {

    this.updateProductDetails();

    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
    if(this.oauthService.hasValidAccessToken()) {
      this. roles = this.oauthService.getIdentityClaims()['groups'];
    }
  }

  handleProductDetails() {

    // get the "id" param string. convert to number using the "+" symbol

    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe(
      ( data: Product) => {
        this.product = data;
      }
    );
  }

  addToCart() {
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    
    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem);
  }

  updateProductDetails() {
    this.productService.categoryNumber.subscribe(
      data => {data!=0?this.categoryNumber = data:null;}
    );
    this.productService.pageNumber.subscribe(
      data => {this.pageNumber = data;}
    );
    this.productService.pageSize.subscribe(
      data => {this.pageSize= data;}
    );
    this.productService.searchMode.subscribe(
      data => {this.searchMode = data;}
    );
    this.productService.searchKeyword.subscribe(
      data => {this.searchKeyword = data;}
    );
  }

  editImages() {
    const productId = this.route.snapshot.paramMap.get("id");

    this.router.navigateByUrl(`/products/${productId}/images`);
  }

  uploadFile() {
    this.uploadFileComponent.uploadFile();
  }

  deleteProduct() {
    this.productService.deleteProduct(+this.product!.id).subscribe({
      next: response => {
        alert("Produkt został usunięty");
        this.router.navigateByUrl('/products');
      },
      error: err => alert(`Wystąpił błąd: ${err.message}`)
    });
  }

}

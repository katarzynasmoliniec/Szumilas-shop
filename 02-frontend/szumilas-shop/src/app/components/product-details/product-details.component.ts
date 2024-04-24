import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { CartItem } from 'src/app/overall/cart-item';
import { Product } from 'src/app/overall/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;

  roles: string[] = [];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private oauthService: OAuthService) { }

  ngOnInit(): void {
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

}

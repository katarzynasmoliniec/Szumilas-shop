import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../overall/product';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../overall/product-category';
import { environment } from 'src/environments/environment';
import { ProductDTO } from '../overall/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl + '/products';
  private categoryUrl = environment.apiUrl + '/product-category';

  categoryNumber: Subject<number> = new BehaviorSubject<number>(0);
  pageNumber: Subject<number> = new BehaviorSubject<number>(0);
  pageSize: Subject<number> = new BehaviorSubject<number>(0);
  searchMode: Subject<boolean> = new BehaviorSubject<boolean>(false);
  searchKeyword: Subject<string> = new BehaviorSubject<string>("");

  constructor(private httpClient: HttpClient) {
    this.updatePageSize(5);
   }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
    
  }

  getProductListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id, page ang page size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string) {
    // need to build URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page ang page size
    const searchUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase?name=${theKeyword}`
                      + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
  
  private getProducts(searchUrl: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories() {
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  pushProduct(product: ProductDTO, files: File[]): Observable<any> {
    const postUrl = environment.apiUrl + "/products";

    const formData = new FormData();

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'multipart/form-data');

    for (var i = 0; i < files.length; i++) { 
      formData.append("images", files[i], files[i].name);
    }

    formData.append("product", new Blob([JSON.stringify(product)], {type: "application/json"}));


    return this.httpClient.post(postUrl, formData, {
      headers: httpHeaders,
      responseType: 'blob'
    });
  }

  deleteProduct(id: number): Observable<any> {
    const deleteUrl = environment.apiUrl+"/products?id="+id;

    return this.httpClient.delete(deleteUrl)
  }

  updateCategoryNumber(categoryNumber: number) {
    this.categoryNumber.next(categoryNumber);
  }
  
  updatePageNumber(thePageNumber: number) {
    this.pageNumber.next(thePageNumber);
  }
  
  updatePageSize(thePageSize: number) {
    this.pageSize.next(thePageSize);
  }

  updateSearchMode(searchMode: boolean) {
    this.searchMode.next(searchMode);
  }

  updateSearchKeyword(searchKeyword: string) {
    this.searchKeyword.next(searchKeyword);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

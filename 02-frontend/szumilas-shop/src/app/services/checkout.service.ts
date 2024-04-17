import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../overall/purchase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../overall/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl= environment.apiUrl + '/checkout/purchase';

  private paymentIntentUrl = environment.apiUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {

    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

}

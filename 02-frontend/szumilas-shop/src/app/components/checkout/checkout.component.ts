import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/overall/country';
import { Order } from 'src/app/overall/order';
import { OrderItem } from 'src/app/overall/order-item';
import { PaymentInfo } from 'src/app/overall/payment-info';
import { Purchase } from 'src/app/overall/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SzumilasShopFormService } from 'src/app/services/szumilas-shop-form.service';
import { FormValidation } from 'src/app/validation/form-validation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];

  storage: Storage = sessionStorage;

  stripe = Stripe(environment.stripePublishableKey);
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";

  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private szumilasShopFormService: SzumilasShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    // setup Stripe payment form
    this.setupStripePaymentForm();

    this.reviewCartDetails();

    // read theuser's email address from browser storage
    const theEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        email: new FormControl(theEmail,
          [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        country: new FormControl('',
          [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        city: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace]),
        country: new FormControl('',
          [Validators.required]),
        zipCode: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FormValidation.notOnlyWhiteSpace])
      }),
      creditCard: this.formBuilder.group({
        
      })
    });

    // populate country
    this.szumilasShopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  setupStripePaymentForm() {
    // get a handle to stripe elements
    var elements = this.stripe.elements();

    // create a card element ... and hide the zip-code field
    this.cardElement = elements.create('card', {hidePostalCode: true});
    
    // add an instance of card UI component into the 'card-element'
    this.cardElement.mount('#card-element');

    // add event binding for the "change" event on the card element
    this.cardElement.on('change', (event: any) => {
      // ge a handle to card-errors element
      this.displayError = document.getElementById('card-errors');

      if(event.complete) {
        this.displayError.textContent = "";
      } else if (event.error) {
        // show validation error to customer
        this.displayError.textContent = event.error.message;
      }

    });
  }

  reviewCartDetails() {
    // subcribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subcribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  get creditCardCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cartItem
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    // populate purchase -shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    purchase.shippingAddress!.country = shippingCountry.name;

    // populate purchase -billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));
    purchase.billingAddress!.country = billingCountry.name;


    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // compute payment info
    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "PLN";
    this.paymentInfo.receiptEmail = purchase.customer?.email;

    // if valid form then
    // -create payment intent
    // -confirm card payment
    // -place order
    if (!this.checkoutFormGroup.invalid && this.displayError.textContent === "") {

      this.isDisabled = true;
      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe(
        (paymentIntentResponse) => {
          this.stripe.confirmCardPayment(paymentIntentResponse.client_secret,
            {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.customer?.email,
                  name: `${purchase.customer?.firstName} ${purchase.customer?.lastName}`,
                  address: {
                    line1: purchase.billingAddress?.street,
                    city: purchase.billingAddress?.city,
                    postal_code: purchase.billingAddress?.zipCode,
                    country: "PL"
                  }
                }
              }


            }, { handleActions: false })
          .then((result: any) => {
            if (result.error) {
              // inform the customer there was an error
              alert(`Wystapił błąd: ${result.error.message}`);
              this.isDisabled = false;
            } else {
              // call REST API via the CheckoutService
              this.checkoutService.placeOrder(purchase).subscribe({
                next: (response: any) => {
                  alert(`Twoje zamówienie zostało złożone.\nNumer zamówienia: ${response.orderTrackingNumber}`);


                  // reset cart
                  this.resetCart();
                  this.isDisabled = false;
                },
                error: (err: any) => {
                  alert(`Wystapił błąd: ${err.message}`);
                  this.isDisabled = false;
                }
              })
            }            
          });
        }
      );
    } else {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

  }

  resetCart() {
    
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }

}

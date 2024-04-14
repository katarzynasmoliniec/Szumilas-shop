import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/overall/country';
import { SzumilasShopFormService } from 'src/app/services/szumilas-shop-form.service';

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

  constructor(private formBuilder: FormBuilder,
              private szumilasShopFormService: SzumilasShopFormService ) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group( {
      customer: this.formBuilder.group( {
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group( {
        street: [''],
        city: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group( {
        street: [''],
        city: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group( {
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;

    this.szumilasShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    //populate credit card yers
    this.szumilasShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    // populate country
    this.szumilasShopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  copyShippingAddressToBillingAddress(event: any) {
    if(event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress')!.value.country.name);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with the current month
    let startMonth: number;

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.szumilasShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }

}

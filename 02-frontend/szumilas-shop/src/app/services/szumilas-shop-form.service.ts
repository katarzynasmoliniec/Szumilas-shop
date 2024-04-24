import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Country } from '../overall/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SzumilasShopFormService {

  private countriesUrl = environment.apiUrl + '/countries';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

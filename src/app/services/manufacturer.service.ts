import { Injectable } from '@angular/core';
import {Manufacturer} from '../models/manufacturer.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private manufacturers: Array<Manufacturer> = [
    { id: 1, name: 'Tesla' },
    { id: 2, name: 'Ford' },
    { id: 3, name: 'Toyota' },
    { id: 4, name: 'Honda' },
    { id: 5, name: 'Chevrolet' },
    { id: 6, name: 'BMW' },
    { id: 7, name: 'Mercedes-Benz' },
    { id: 8, name: 'Audi' },
    { id: 9, name: 'Hyundai' },
    { id: 10, name: 'Nissan' },
  ];

  public getManufacturers(): Observable<Array<Manufacturer>> {
    return of(this.manufacturers);
  }
}

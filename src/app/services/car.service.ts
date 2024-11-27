import { Injectable } from '@angular/core';
import {Car} from '../models/car.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private cars: Array<Car> = [
    { id: 1, model: 'Model S', manufacturer: 1 },
    { id: 2, model: 'Model 3', manufacturer: 1 },
    { id: 3, model: 'Mustang', manufacturer: 2 },
    { id: 4, model: 'F-150', manufacturer: 2 },
    { id: 5, model: 'Corolla', manufacturer: 3 },
    { id: 6, model: 'Camry', manufacturer: 3 },
    { id: 7, model: 'Civic', manufacturer: 4 },
    { id: 8, model: 'Accord', manufacturer: 4 },
    { id: 9, model: 'Silverado', manufacturer: 5 },
    { id: 10, model: 'Bolt EV', manufacturer: 5 },
    { id: 11, model: 'i8', manufacturer: 6 },
    { id: 12, model: 'X5', manufacturer: 6 },
    { id: 13, model: 'C-Class', manufacturer: 7 },
    { id: 14, model: 'E-Class', manufacturer: 7 },
    { id: 15, model: 'A4', manufacturer: 8 },
    { id: 16, model: 'Q7', manufacturer: 8 },
    { id: 17, model: 'Elantra', manufacturer: 9 },
    { id: 18, model: 'Santa Fe', manufacturer: 9 },
    { id: 19, model: 'Altima', manufacturer: 10 },
    { id: 20, model: 'Rogue', manufacturer: 10 },
  ];

  public getCars(): Observable<Array<Car>> {
    return of(this.cars);
  }
}

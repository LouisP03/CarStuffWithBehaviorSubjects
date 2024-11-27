import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../models/car.model';
import {Manufacturer} from '../models/manufacturer.model';
import { CarService } from '../services/car.service'
import {ManufacturerService} from '../services/manufacturer.service';
import {BehaviorSubject, combineLatest, map, Observable, Subscription} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {
  checkCustomElementSelectorForErrors
} from '@angular/compiler-cli/src/ngtsc/annotations/component/src/diagnostics';

@Component({
  selector: 'app-car-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './car-page.component.html',
  standalone: true,
  styleUrl: './car-page.component.css'
})
export class CarPageComponent implements OnInit, OnDestroy {
  public carService: CarService = inject(CarService);
  public manufacturerService: ManufacturerService = inject(ManufacturerService);
  public manufacturerMap = new Map<number, Manufacturer>();
  public cars$!: Observable<Array<Car>>;
  public manufacturers$!: Observable<Array<Manufacturer>>;

  private cars$$ = new BehaviorSubject<Car[]>([]);
  private manufacturers$$ = new BehaviorSubject<Manufacturer[]>([]);
  private subscriptions: Subscription[] = [];

  protected carsWithManufacturers$!: Observable<Array<{ model: string, manufacturerName: string }>>;

  ngOnInit(): void {
    this.loadData();

    this.carsWithManufacturers$ = combineLatest([this.cars$, this.manufacturers$]).pipe(
      map(([cars, manufacturers]) => this.mergeCarsWithManufacturers(cars, manufacturers))
    );

  }

  loadData() {
    const carsSubscription = this.carService.getCars().subscribe(cars => {
      this.cars$$.next(cars);
    });

    const manufacturersSubscription = this.manufacturerService.getManufacturers().subscribe(manufacturers => {
      this.manufacturers$$.next(manufacturers);
    });

    this.cars$ = this.cars$$.asObservable();
    this.manufacturers$ = this.manufacturers$$.asObservable();

    this.subscriptions.push(carsSubscription, manufacturersSubscription);
  }

  private mergeCarsWithManufacturers(cars: Car[], manufacturers: Manufacturer[]): { model: string; manufacturerName: string }[] {
    manufacturers.forEach(manufacturer => {
      this.manufacturerMap.set(manufacturer.id, manufacturer);
    });

    //by having the Map object here, we can easily access the name of a manufacturer based on the id referenced by Car objects.
    // So having a mapping between id and name as a key-value pair, all we need is the id from the Car object to quickly retrieve the name of the manufacturer
    // Without the Map, the code would look like this.
    /*
    return cars.slice(0, 10).map(car => {
      const manufacturer = manufacturers.find((manufacturer) => manufacturer.id == car.manufacturer);
      return {
        model: car.model,
        manufacturerName: manufacturer ? manufacturer.name : 'Unknown Manufacturer'
      });
     */

    // TODO: The problems with the above implementation are that...
    // You have to search through every manufacturer (with find()) for every car object  that exists...
    // resulting in time complexity of O(n*m) where n is number of cars and m is number of manufacturers
    // HOWEVER
    // Using a Map reduces time complexity to constant time complexity; i.e., when looking up manufacturers based on their id..
    // this can be done in constant time. Especially useful for large datasets.

    return cars.slice(0, 10).map(car => {
      const manufacturer = this.manufacturerMap.get(car.manufacturer);
      return {
        model: car.model,
        manufacturerName: manufacturer ? manufacturer.name : 'Unknown Manufacturer'
      };
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}



import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarCategoryService {

  private categories = 
  [
    {
      name: 'Compact',
      hourlyCost: 20,
      fuel: 'Gasoline',
      seats: 4,
      gearType: 'Manual',
      minimumAge: 18,
      photoUrl: 'https://via.placeholder.com/150',
      selected: true
    },
    {
      name: 'Midsize',
      hourlyCost: 30,
      fuel: 'Diesel',
      seats: 5,
      gearType: 'Automatic',
      minimumAge: 21,
      photoUrl: 'https://via.placeholder.com/150',
      selected: false
    },
    {
      name: 'Luxury',
      hourlyCost: 50,
      fuel: 'Premium gasoline',
      seats: 5,
      gearType: 'Automatic',
      minimumAge: 25,
      photoUrl: 'https://via.placeholder.com/150',
      selected: false
    }
  ]
  

  constructor() { }

  // Return a list of car categories
  getCarCategories(): Observable<any> {
    return of(this.categories);
  }
}

export interface CarCategory {
  name: string;
  hourlyCost: number;
  fuel: string;
  seats: number;
  gearType: string;
  minAge: number;
  photoUrl: string;
  selected: boolean;
}
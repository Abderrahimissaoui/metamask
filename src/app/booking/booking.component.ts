import { Component, OnInit } from '@angular/core';
import { CarCategory, CarCategoryService } from './mock-cars.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  rentalCar!: string;
  selectedStartDate!: string;
  selectedEndDate!: string;
  creditCardNumber!: string;

  pickupAddress!: string;
  selectedCountry= '';
  selectedCity!: string;
  selectedAddress!: string;
  carCategories!: any[];

  searchStarted = false;
  loading: boolean = true;
  addresses: string[] = [];
  selectedCarCategory!: CarCategory;
  isValidDates: boolean = true;


  cities: string[] = ['Berlin', 'Frankfurt', 'Munich', 'Hamburg', 'Cologne'];


  pickupAddresses: string[] = [];

  constructor(private carCategoryService: CarCategoryService) {
    this.selectedCity = this.cities[0]; // Default value
    this.selectedAddress = ''; // Default value
    this.updateAirportAddress(); // Initialize pickupAddresses array
  }

  onEndDateChange(): void {
    this.isValidDates = this.validateDates();
  }

  validateDates(): boolean {
    const startDate = new Date(this.selectedStartDate);
    const endDate = new Date(this.selectedEndDate);
    const now = new Date();

    return (endDate > startDate) && (startDate > now);
  }

  getCarCategories() {
    this.loading = true;
    this.searchStarted = true;
    setTimeout(() => {
    this.carCategoryService.getCarCategories().subscribe(categories => {
      this.carCategories = categories;
      this.loading = false;
    });
  }, 3000);
  }

  calculateDuration(): number {
    if (this.selectedStartDate && this.selectedEndDate) {
      const startDate = new Date(Date.parse(this.selectedStartDate));
      const endDate = new Date(Date.parse(this.selectedEndDate));
      const startTimestamp = startDate.getTime();
      const endTimestamp = endDate.getTime();
      const diff = endTimestamp - startTimestamp;
      const hours = diff / (1000 * 60 * 60);
      return Number(hours.toFixed(2));
    } else {return 0}

  }

  updateAirportAddress() {
    if (this.selectedCity === 'Berlin') {
      this.selectedAddress = 'Flughafen Berlin-Tegel (TXL), 13405 Berlin, Germany';
      this.pickupAddresses = [
        'Flughafen Berlin-Tegel (TXL), 13405 Berlin, Germany',
        'Flughafen Berlin-Schönefeld (SXF), 12529 Schönefeld, Germany',
        'Berlin Hauptbahnhof (Hbf), 10557 Berlin, Germany',
        'Berlin Ostbahnhof, 10243 Berlin, Germany',
        'Berlin ZOB am Funkturm, 14057 Berlin, Germany'
      ];
    } else if (this.selectedCity === 'Frankfurt') {
      this.selectedAddress = 'Frankfurt Airport (FRA), 60547 Frankfurt am Main, Germany';
      this.pickupAddresses = [
        'Frankfurt Airport (FRA), 60547 Frankfurt am Main, Germany',
        'Frankfurt Hauptbahnhof (Hbf), 60329 Frankfurt am Main, Germany',
        'Frankfurt Südbahnhof, 60594 Frankfurt am Main, Germany',
        'Frankfurt Messe, 60327 Frankfurt am Main, Germany',
        'Frankfurt Zeil, 60313 Frankfurt am Main, Germany'
      ];
    } else if (this.selectedCity === 'Munich') {
      this.selectedAddress = 'Munich Airport (MUC), 85356 München-Flughafen, Germany';
      this.pickupAddresses = [
        'Munich Airport (MUC), 85356 München-Flughafen, Germany',
        'Munich Hauptbahnhof (Hbf), 80335 München, Germany',
        'Munich Ostbahnhof, 81667 München, Germany',
        'Munich ZOB Hackerb'
      ];
    }
  }
  onCarCategoryChange(selectedCategory: CarCategory): void {
    // Set the selected property of the selected category to true
    selectedCategory.selected = true;

    // Set the selected property of all other categories to false
    this.carCategories.forEach(category => {
      if (category !== selectedCategory) {
        category.selected = false;
      }
    });

    console.log('Selected car category:', selectedCategory);
  }


  locatePickup(){}

  ngOnInit(): void {
  }

}

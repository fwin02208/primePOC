import { Component, OnInit } from '@angular/core';
import { Car } from './domain/car';
import { CarService } from './services/carservice';
import { stringify } from 'querystring';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})

export class AppComponent implements OnInit {


    displayDialog: boolean;

    car: Car = new PrimeCar();

    selectedCar: Car;

    newCar: boolean;

    cars: Car[];

    brands: SelectItem[];

    colors: SelectItem[];

    cols: any[];

    yearFilter: number=1970;

    yearTimeout: any;
    selectedColumns: any[];
    searchtext: any;
    cap: Car[];

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    constructor(private carService: CarService) { }

    ngOnInit() {
        this.sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];
        this.carService.getCarsSmall().then(cars => {
            this.cars = cars
            this.cap=this.cars
            
            console.log(this.cars)}
            );

        this.brands = [
            { label: 'All Brands', value: null },
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];

        this.colors = [
            { label: 'White', value: 'White' },
            { label: 'Green', value: 'Green' },
            { label: 'Silver', value: 'Silver' },
            { label: 'Black', value: 'Black' },
            { label: 'Red', value: 'Red' },
            { label: 'Maroon', value: 'Maroon' },
            { label: 'Brown', value: 'Brown' },
            { label: 'Orange', value: 'Orange' },
            { label: 'Blue', value: 'Blue' }
        ];
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' },

        ];
        this.selectedColumns = this.cols;
    }
    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    brand;
    color
    onYearChange(event, dv) {
        if (this.yearTimeout) {
            clearTimeout(this.yearTimeout);
        }
console.log("event.value",event.value);
let abc=stringify(event.value)
        this.yearTimeout = setTimeout(() => {
            dv.filter(abc);
        }, 250);
    }
    onKey(event) {
        console.log("event", event.target.value);
        this.searchtext = event.target.value
    }
    clickie(dv) {
        dv.filter(this.searchtext)
    }
click(a){
    console.log(a);
    
}
    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i !== index);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.car = { ...event.data };
        this.displayDialog = true;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}
export interface SelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
export interface Car {
    vin;
    year;
    brand;
    color;
}

"use strict";
class Car {
    constructor() {
        this.tyres = 4;
    }
    move() {
        console.log('Car is moving');
    }
    getDetails() {
        return `Car moves with ${this.tyres} tyres`;
    }
}
class Bike {
    constructor() {
        this.tyres = 2;
    }
    move() {
        console.log('Bike is moving');
    }
    getDetails() {
        return `Bike moves with ${this.tyres} tyres`;
    }
}
let bikeObj = new Bike();
console.log(bikeObj.getDetails());
let carObj = new Car();
console.log(carObj.getDetails());

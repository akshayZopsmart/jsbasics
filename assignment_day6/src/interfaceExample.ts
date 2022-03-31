interface Vechile{
    move() :void,
    tyres :number;
}

class Car implements Vechile{
    move() :void{
        console.log('Car is moving');
    }
    tyres :number = 4;
    getDetails():string{
        return `Car moves with ${this.tyres} tyres`;
    }
}

class Bike implements Vechile{
    move() :void{
        console.log('Bike is moving');
    }
    tyres :number = 2;
    getDetails():string{
        return `Bike moves with ${this.tyres} tyres`;
    }
}

let bikeObj = new Bike();
console.log(bikeObj.getDetails());

let carObj = new Car();
console.log(carObj.getDetails());
class Animal{
    constructor(){
        this.name,
        this.age
    }

    set setName(name){
        this.name = name;
    }

    set setAge(age){
        this.age = age;
    }

    get getName(){
        return this.name;
    }

    get getAge(){
        return this.age;
    }
}

class sub extends Animal{
    constructor(){
        super();
    }
}
let animalObj = new sub();
animalObj.setName = 'subWorks';
console.log(animalObj.getName);
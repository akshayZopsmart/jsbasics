const instructor = {
    evaluate(){
        return this.aptitude + this.coreSkill;
    }
}

const interns = [
    {
        aptitude : 20,
        coreSkill : 30
    },
    {
        aptitude : 40,
        coreSkill : 32
    },
    {
        aptitude : 25,
        coreSkill : 50
    }
];

interns.forEach((intern) => console.log(instructor.evaluate.bind(intern)()));
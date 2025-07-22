export class StudentDto{
    name: string;
    age: number;
    grade: string;
    
    constructor(name: string, age: number, grade: string) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
}
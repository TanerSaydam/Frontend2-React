class Person{
    constructor(name,lastName){ //yapıcı metot
        this.name = name;
        this.lastName = lastName;
    }
}

class User extends Person{ //DRY => Don't Repeat Yourself => Kendini Tekrar Etme
    constructor(name,lastName,email,password){
        super(name,lastName);
        
        this.email = email;
        this.password = password;
    }
}

class Example extends User{
    constructor(){
        super("Taner");
        this.gender = "";
    }
}

//const person = new Person("Taner","Saydam");
const user = new User("Taner","Saydam","tanersaydam@gmail.com","1");
user.name;
user.lastName;

//console.log(user);

const example = new Example();
example.lastName = "Saydam";

console.log(example);
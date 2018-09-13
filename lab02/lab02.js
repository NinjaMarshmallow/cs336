/*
	Author: jwk24 for Calvin College - CS262
	Person Object
*/

function Person(name, birthdate) {
	this.name = name;
	this.birthdate = birthdate;
	this.friends = [];
}

Person.prototype.setName = function(name) {
	this.name = name;
};

Person.prototype.getAge = function() {
    var today = new Date();
    var birthDate = new Date(this.birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

Person.prototype.addFriend = function(person) {
	this.friends.push(person);
};

Person.prototype.print = function() {
	console.log("Hello! My name is " + this.name + " and my age is " + this.getAge());
	if(this.friends != undefined  && this.friends.length > 0) {
		console.log("Here are my friends: ");
		this.friends.forEach(function(friend) { console.log(friend); } );
	} else {
		console.log("I have no friends");
	}
};

console.log("\n\n");
var person = new Person("Bob", "9/13/1997");
var age = person.getAge();
person.print();
console.log("\nPrint Person Object")
console.log(person);
console.log("\n");

person.addFriend(new Person("Tyler", "4/3/1998"));
person.addFriend(new Person("Emma", "8/27/1998"));
person.setName("Gerald");

person.print();
console.log("\nPrint Person Object")
console.log(person);
console.log("\n");

/*
	Student Object
*/

function Student(name, birthdate, major) {
	Person.call(this, name, birthdate);
	this.major = major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.getMajor = function() { return this.major; };
Student.prototype.print = function() {
	Person.prototype.print.call(this);
	console.log("I'm a student and I study " + this.major);
}

var student = new Student("Jon", "11/3/1998", "Computer Science");
student.print();
console.log("\nPrint Person Object");
console.log(student);
console.log("\n");

/*
	Testing
*/

var person = new Person("Charlie", "5/18/1999");
var student = new Student("Addison", "9/29/1997", "Sports Medicine");
//Test Inheritance
console.log("Student is instance of Person?");
console.log(student instanceof Person);
console.log("Person is instance of Student?");
console.log(person instanceof Student);
console.log("\n");
console.log("Inheritance structure is correct");
console.log("\n");
//Test inherited methods
console.log("Friends of the Student Addison: ");
console.log(student.friends);
student.addFriend(person);
student.addFriend(new Student("Jacob", "3/23/1996", "Kinesiology"))
console.log("Friends of the Student Addison: ");
console.log(student.friends);
console.log("\n");
console.log("Student can inherit methods such as addFriend()");
//Test polymorphic methods
console.log("Call polymorphic print method");
student.print();
console.log("\n");
console.log("The print method has been modified in the Student prototype");
console.log("\n");
console.log("Tests Passed!");
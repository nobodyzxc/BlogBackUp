function Animal(age){
    this.age = age;
}

function Person(age , name){

    this.age = age;
    this.name = name;

    // static say = function (word) { console.log(word); }; , not allowed.
    // static should in class syntax !

    this.getOlder = function () { this.age += 1; };

    var wish = 'become someboey'; // private
    this.sayWish = function (){ console.log(wish); };
    var sleep = function () { /* just sleep */ };     // private method
}

Person.prototype = Animal.prototype; // inheritance
//Person.prototype = new Animal();     // also
//Person.prototype = Object.create(Animal.prototype); // most correct ? wtf
// 到底是哪一種，好像都可以...


var nobodyzxc = new Person(20 , "zxc");
console.log(nobodyzxc.age);
nobodyzxc.getOlder();

nobodyzxc.hasOwnProperty('say');     // build-in func to check if have this property
console.log(typeof(nobodyzxc.age)); // see what type of wish

Person.prototype.sayAge = function () { console.log("I'm " , this.age); };
// add a new property to class Person
nobodyzxc.sayAge();



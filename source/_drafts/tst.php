<?php
class Animal{
    public $age;
}

class Person extends Animal {

    public $name;

    static public function say($word){
        echo $word;
    }

    const die_age = 30; // we don't need $

    public function __construct($age){
        $this->age = $age;
    }
    public function getOlder(){
        $this->age += 1;
    }

}

$nobodyzxc = new Person(20);
echo $nobodyzxc->age;
$nobodyzxc->getOlder();
Person::say("there , there");
?>

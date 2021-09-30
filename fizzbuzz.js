let i = 1;
for (i;i<100;i++){
    // si es divisible por 7 pop
    // si es divisible por 21 fizzpop
    // si es divisible por 35 buzzpop
    // si es divisible por 105 fizzbuzzpop
    if (i % 15 == 0){
        console.log ("FizzBuzz");
    }
    if (i % 5 == 0){
        console.log ("Buzz");
    }
    if (i % 3 == 0){
        console.log ("Fizz");
    }
    else console.log (i);
}
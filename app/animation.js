const chalk = require('chalk');
const { green, magenta, blue,bgRgb } = require("chalk");

let num;
let counter = 0;

const random = ()=>{
    num = Math.floor(Math.random()*4)+1;
    return num;
}

const image = (num,counter)=>{

    if (num === 1){
        console.log(chalk.green("       $     $              \n"));
    } else if(num === 2){
        console.log(chalk.green("        $    $               \n"));
    } else if(num === 3){
        console.log(chalk.green("      $     $   $            \n"));
    } else if(num === 4){
        console.log(chalk.green("       $     $              \n"));
    }
 }

const scene = (counter)=>{

   if (counter !== 100){
        animate();
    } else if (counter === 100){
        console.log((chalk.green("          $$$$$$$$           \n"))); 
        console.log((chalk.green("          BANGAZON             \n")));
        console.log((chalk.green("          $$$$$$$$           \n")));
    } 
}

const animate = ()=>{ 
    setTimeout(()=>{
        counter += 1;
        random();
        image(num,counter);
        scene(counter);
    },80)
}
module.exports.alert = ()=>{animate()}
/*
We have the employees drink preference records in a text file (employees.json, added) one employee per line, JSON-encoded. 
We want to organize the party and invite as many employees as possible. We've created the JSON files with the drink recipes (recipes.json, added) and the prices of the components (prices.json, added). 
Please, write the program that will accept the party budget M and will output the names, user ids, and chosen drinks for the employees that should be invited, sorted by user id (ascending). 

Input data
// employees.json
// recipes.json
// prices.json

Output data
The function should return names, user ids, and chosen drinks for the employees that should be invited, sorted by user id (ascending).

Example1:
M = 0.1
Result: [{id: 4, name: "Don Parsons", drinks: ["Espresso"]}]

Example2:
M = 0.25
Result: [
  {id: 4, name: "Don Parsons", drinks: ["Espresso"]},
  {id: 7, name: "Geraldine Carpenter", drinks: ["Espresso"]},
  {id: 9, name: "Pauline Roberson", drinks: ["Espresso"]}
]
*/
const pricesData = `{"coffee": 3.6,"water": 1,"milk": 1.5}`
const recipesData = `{
    "Cappuccino": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.09
    },
    "Espresso": {
      "coffee": 0.01,
      "water": 0.035
    },
    "Latte": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.135
    },
    "Flat White": {
      "coffee": 0.02,
      "water": 0.04,
      "milk": 0.11
    },
    "Macchiato": {
      "coffee": 0.01,
      "water": 0.035,
      "milk": 0.015
    }
}`
const employeesData = `{"id":1,"name":"Mildred Carson","drinks":["Macchiato"]}
{"id":2,"name":"Clifford Brown","drinks":["Latte"]}
{"id":3,"name":"Kellie Fletcher","drinks":["Flat White","Espresso"]}
{"id":4,"name":"Don Parsons","drinks":["Espresso"]}
{"id":5,"name":"Renee Reynolds","drinks":["Cappuccino","Macchiato"]}
{"id":6,"name":"Rudolph Bishop","drinks":["Latte","Macchiato","Flat White"]}
{"id":7,"name":"Geraldine Carpenter","drinks":["Espresso"]}
{"id":8,"name":"Hilda Jimenez","drinks":["Latte","Macchiato","Espresso"]}
{"id":9,"name":"Pauline Roberson","drinks":["Espresso"]}
{"id":10,"name":"Vanessa Barrett","drinks":["Flat White","Cappuccino","Latte"]}`

let prices = JSON.parse(pricesData);              // reading data
let recipes = JSON.parse(recipesData);
let employeesSplit = employeesData.split('\n');
let employees = [];
employeesSplit.forEach(element => {
  employees.push(JSON.parse(element));
});

let recipePrices = JSON.parse(recipesData);  //copy to avoid onject mutation, will contain sum later
for (let key1 in recipes) {
  recipePrices[key1]['sum'] = 0.0;
  for (let key2 in prices) {
    // calculating sum of each drink and adding it to object
    if (!isNaN(recipes[key1][key2]) && (typeof (recipes[key1][key2]) !== 'undefined')) {
      recipePrices[key1][key2] = Number((recipePrices[key1][key2] * prices[key2]));
      recipePrices[key1]['sum'] += Number(recipePrices[key1][key2]);
    }
  }
}

let employeesPrices = [];                      // array of employees total cost
for (let i = 0; i < employees.length; i++) {
  employeesPrices[i] = employees[i].drinks.reduce((sum1, el1) => {
    for (let key in recipePrices) {
      if (el1 === key)                              // if name of the drink matches, add its price to the sum
      {
        sum1 += Number(recipePrices[key].sum);
      }

    }
    el1 = Number(sum1.toFixed(4));   //   getting rid of floating inaccuracy
    return el1;
  }, 0)
}

const objEmployeesPrices = Object.assign({}, employeesPrices);
const empPricesSorted = Object.entries(objEmployeesPrices).sort((a, b) => a[1] - b[1])  // sorted array of prices of employees

function makeParty(M) {
  if (typeof (M) !== 'number') { throw new Error('Wrong value!') }
  else if (M < empPricesSorted[0][1]) {
    console.log('Sorry, low budget :c')
  }
  else {
    let sum = 0.0;
    let index = [];     //indexes off people, who fit the budget
      for (let i = 0; i < empPricesSorted.length; i++){
        if (sum + empPricesSorted[i][1]<M) {        // check for budhet overfit
          sum += empPricesSorted[i][1];
          index.push(empPricesSorted[i][0]);
        }
      }
    index1 = index.map(el => ++el);
    let result = employees.filter((el)=>index1.includes(el.id));   // filtering selected employees

    console.log(result);
    return result
  }
}
makeParty(0.1);
makeParty(0.25);

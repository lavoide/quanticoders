/* 
Candy weighs X grams, pineapple - Y grams, and apple - Z grams.
Need to write a program that will determine how many different versions of tips weighing exactly W grams can make Santa Claus.

Input data
The function should receive four integers X, Y, Z, and W.

Output data
The function should return a single integer - the number of gift options.

Example: 
X = 10
Y = 25
Z = 15
W = 40
Result: 3
*/
function giftNumber(X, Y, Z, W) {

    // check input for integers
    [].forEach.call(arguments, ((val) => { if(Number.isInteger(val)){
        return;
    } else {throw new Error('Wrong input!') }
    }))

    let numbers = [X,Y,Z]; // input values
    let result = [];  // array with all the subsets

    // filter out all items larger than target
    numbers = numbers.filter(function (value) {
        return value <= W;
    });

    // sort from largest to smallest
    numbers.sort(function (a, b) {
        return b - a;
    });

    let current = [];  //helper array
    
    // function for calculating all the subsets
    function sumCalculator(numbers, sum, iter, curr, result){
        // check for zero  
        if(sum == 0){
            let temp = curr.slice();
            result.push(temp);
            return;
        }
        // recursive sum comparison, starting with largest number
        for(let i=iter; i<numbers.length; i++){
            if(sum < numbers[i]) 
                 return;
            curr.push(numbers[i]);
            sumCalculator(numbers, sum - numbers[i], i, curr, result); //recursion
            curr.pop(); 
        }
     }

    sumCalculator(numbers, W, 0, current, result); 
    console.log(result, 'Answer - ' + result.length);
    return result.length;
}
giftNumber(10, 15, 20, 40)





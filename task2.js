/*
Jimny, our secretary, went to the office late today, and it is urgently necessary to save time to have dinner, but before she needs N copies of the same document. 
There are two Xerox, one of which copies the list of paper for x seconds, and the other one - for y seconds. (You may use one Xerox machine, or both at the same time. 
You can not only copy from the original but also use a copy.)To help her to find out what is the minimum time it will take.

Input data
The function should receive three integers: N, x and y

Output data
The function should return a single number - the minimum time in seconds required for the preparation of N copies.

Example1: 
N = 4
x = 1
y = 1
Result: 3

Example2: 
N = 5
x = 1
y = 2
Result: 4
*/

function xeroxTime(N,x,y){
    // check input for integers and zeros
    [].forEach.call(arguments, ((val) => { if(Number.isInteger(val) && val!==0){
        return true;
    } else {throw new Error('Wrong input!') }
    }))
    
    let xeroxes = [x,y];
    let time = 0; 
    let firstPaper = Math.min.apply(Math, xeroxes); //time to make first copy
    while(true){ 
        let paper = 0; 
        // calculating papers at each second 
        for (let i = 0; i < xeroxes.length; i++) 
            paper += (time / xeroxes[i]); 
            // if paper equal to N return time. 
            if (paper >= N){ 
                if(N>1 && (x+y)%2==0){                   
                    console.log(time+firstPaper);  //add time for the original sheet copy
                    return time+firstPaper;
                } else if(N>1 && (x+y)%2!=0){       //if sum of copies is not even it speeds the task by 1 time
                    console.log(time+firstPaper-1);
                    return time+firstPaper-1;
                } else if (N==1) return firstPaper; //if one copy is needed the result is the fastest xerox's time
            }
        time++; // increment time 
    } 
}
xeroxTime(4,1,1);
xeroxTime(5,1,2);
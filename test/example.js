// expect awesomeness fw
function expect(a,b){ let x= JSON.stringify(a); let y= JSON.stringify(b); if(x===y){ return "🟢" + " expect " + x; } else { throw Error("🔴" + " expect " + x + ", actual " + y); } }

import { createPow, verifyPow } from '../x-pow.js';

let start = +new Date(); // timer

// Default Usage
let powInput = '2,1::3849812431'; // example data
let result = createPow(powInput);
expect(true, verifyPow(result.rounds, powInput,result.multiplier).valid);

let end = +new Date(); console.log('Time cycles: ',end-start); // timer

// Custom PoW (Recommended)
let customMultiplier = 3; // relatively easy
let customFirstByte = 99;
let result2 = createPow(powInput,customMultiplier,customFirstByte);
console.log("customPow",result2);
expect(true, verifyPow(result2.rounds, powInput,result2.multiplier,customFirstByte).valid);

// PoW is invalid when.. examples:

// invalid rounds
expect(false, verifyPow(result.rounds-1, powInput,result.multiplier).valid);

// invalid firstByte
expect(false, verifyPow(result.rounds, powInput,result.multiplier,99).valid);

// often expect false, since increasing multipliier by one means next number has 50% chance of being correct too
expect(false, verifyPow(result.rounds, powInput,result.multiplier+1).valid);


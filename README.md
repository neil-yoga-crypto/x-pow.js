# x-pow.js
Simpe Proof of Work Function for Spam Prevention using 2X SHA-3. Customizeable First Byte and Multiplier. 

### Install
```
npm install @noble/hashes --save # install dependency for SHA3-384 hash function
## copy x-pow.js
```

### Usage
X-pow.js consists of 2 functions: createPow and verifyPow. You can verify the proof of work by letting verifyPow generate the hash using the rounds and your multiplier as input.  
```
import { createPow, verifyPow } from './x-pow.js';

// Default Usage
let powInput = '2,1::384981231'; // example data
let result = createPow(powInput);
console.log("expect true",verifyPow(result.rounds, powInput,result.multiplier));

// Custom PoW (Recommended)
let customMultiplier = 3; // relatively easy
let customFirstByte = 99;
let result2 = createPow(powInput,customMultiplier,customFirstByte);
console.log("customPow", verifyPow(result2.rounds, powInput,result2.multiplier,customFirstByte));

```

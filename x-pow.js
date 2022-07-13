import { sha3_384 } from '@noble/hashes/sha3';

// Supports up to x47 multipliers (because SHA3-384 is 48 bytes, and first byte is configured)
export function createPow(dataStr,multiplier=9,firstByte=120) {
    let rounds = 0;
  	let result = {};
    while(true)  {
        // prevent unlimited loops, context: 706353 rounds takes around 22 seconds on intel i5 desktop computer. 16777216 is 3 bytes (256^3) storage.
      	if(rounds > 16777216) { 
         		throw new Error("Couldn't find matching hash below 16777217 rounds."); 
        }
      	
        // try until valid hash is found.
      	result = verifyPow(rounds, dataStr, multiplier,firstByte);
      	if(result.valid) break;
        else  rounds++;
    }
  
  	return result;
}

export function verifyPow(rounds, dataStr,multiplier=9,firstByte=120) {
  		// Hashed 2 times to always use same length of input
        let hash = sha3_384(sha3_384(dataStr + rounds));
  
        // 1. Multipliers can increase difficulty by +/- 50%, just by checking if additional n bytes are below 128, since there is a 100% certainty that a byte's value is between 0 and 255 and a +/- %50 certainty that a byte's valye is between 0 and 128.
      	let validateMultiplier = true;
      	if(multiplier > 1) {
            for(let i=1;i<multiplier;i++) {
                if(hash[i] > 128) validateMultiplier = false;
            }
        }
        
       // 2. Main algorithm simply check if the first bytes of the produced hash match expected firstByte (0.0039% chance for exact match, since one byte holds 256 possibilities: (1/256) )
       let valid = hash[0] === firstByte && validateMultiplier;
  	   return { valid:valid,hash:hash,rounds:rounds,multiplier:multiplier};
}

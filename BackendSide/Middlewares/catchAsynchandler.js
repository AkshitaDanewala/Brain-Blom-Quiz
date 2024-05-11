
exports.CatchAsyncHandler = (func) => (req,res,next) => {
    Promise.resolve(func(req,res,next)).catch((next), (error) => {
        res.status(500).json({message: error.message});

    } )
}

// Yeh function kisi error ko handle karne ke liye banaya gaya hai jab hum asynchronous functions ka use karte hain, jaise ki database queries ya API calls.iska main aim hai ki error ko handle krna. 

// Iss function ka kaam hai ek asynchronous function ko wrap karna ek aur function mein jo ek HTTP request, response, aur next middleware ko accept karta hai. Jab yeh wrapped function call hoti hai, toh wo ek promise return karta hai. Agar yeh promise resolve hota hai, toh sab kuch thik hota hai. Lekin agar promise reject hota hai, matlab ki koi error aagaya hai, toh hum us error ko catch karte hain.
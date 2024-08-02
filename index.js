const express = require('express')
const app = express()
app.use(express.json());
const port = 8000;
app.get('/', (req, res) => {
  res.send('hello world')
})
const  separateAlphabetsAndNumbers=(inputArray)=> {
    const numbers = [];
    const alphabets = [];

    inputArray.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    return { numbers, alphabets };
}
const findHighestAlphabet=(alphabets)=> {
    if (alphabets.length === 0) return [];

    return alphabets.reduce((highest, current) => {
        return current.toLowerCase() > highest.toLowerCase() ? current : highest;
    });
}


app.post('/bfhl',(req,res)=>{
    const {data}=req.body;
        try{
          const {numbers,alphabets} = separateAlphabetsAndNumbers(data)
          const highestAlphabet=findHighestAlphabet(alphabets)
          res.status(200).json({
            "is_success":true,
            "user_id":"vaeez_mohamed_21112003",
            "email" : "mv5552@srmist.edu.in",
            "roll_number":"RA2111026010509",
            "Number":numbers,
            "Alphabets":alphabets,
            "highest_alphabet":highestAlphabet

          })

        }
        catch(e){
            res.status(404).json({
                Status:404,
                error:"Internal server error"
            })
        }
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    
  })
const express = require('express');
const fs = require("fs").promises;// reading
const cors = require('cors');
var Promise = require('promise');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    var obj = {
        array: await Line()
    };
    res.send(obj);
}
);

async function readFile(){
    let content = "";
    content =await fs.readFile('newdata.txt','utf-8',(err,data)=>{
        if(err)throw err;
        content+=""+data;
    });
   return content;
}
async function Line ()
{

    let content = await readFile();
    let  arr2 = modify(content);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(arr2);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return arr2;
}

function modify(content){
    let arr2=[];
    let y=content.split("\n"); // first split on space
    for(let j=0;j<y.length;j++) //loops over the n buses
    {
        let arr = [];
        let t = y[j]; //jth bus's route
        let p = t.split(" ");
        for (let i = 0; i < p.length; i++)// loop over the way points of the nth bus
        {
            let array = JSON.parse("[" + p[i] + "]");
            arr.push(array);
        }
        arr2.push(arr);
    }
    return arr2;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
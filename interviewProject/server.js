const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const port = process.env.PORT|| 5000 ;

 var bodyParser = require('body-parser')
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
app.use(bodyParser.text());
const taskArray = [];
const hospitalArray=[]
app.use('/',express.static(path.join(__dirname,'frontend')));
function new_id(){
    if(hospitalArray.length==0)
        return 1;
    else{
        return parseInt(hospitalArray[hospitalArray.length-1]['data[id]']) +1
    }
}
app.post('/add',(req,res)=> {
    data = req.body;
    data['data[id]'] = new_id()
    hospitalArray.push(data);
    db.insertDoc(data);
    res.send(hospitalArray);
})
app.post('/del',(req,res)=>{
    data = req.body
    // console.log("data: ")
    // console.log(data)
    for(var i=0;i<hospitalArray.length;i++)
    {
        if(hospitalArray[i]['data[id]'] ==data['data[id]'])
            {
                console.log("i: "+i)
                hospitalArray.splice(i,1)
                break
            }
    }
    console.log("after deleting: ")
    console.log(hospitalArray)
    db.delDoc(data);
})
app.post('/update',(req,res)=>{
    data = req.body
    // console.log(data['data[name]'])
    for(var i=0;i<hospitalArray.length;i++)
    {
        if(hospitalArray[i]['data[id]'] ==data['data[id]'])
        {   
            o_data = hospitalArray[i]
            u_data = data
            hospitalArray[i] = data
            break;
        }
    }
    // console.log('updated array:')
    // console.log(hospitalArray)
    db.udtDoc(o_data,u_data);
    res.send("updated")
    // console.log(hospitalArray);
})
app.get('/in_display',(req,res)=>{
    res.send(hospitalArray);
})
app.listen(port, () => {
    console.log(`Listening at ${port}`);
    db.connect(function(){
        fill_list();
    });
    
});
function fill_list(){
    db.getValues(function(data){
        // console.log(data)
        data.forEach(function(v){ delete v['_id'] });
        for(i = 0;i<data.length;i++){
            hospitalArray.push(data[i]);
        }
        console.log(hospitalArray)
        // console.log(data)
        // hospitalArray = data;
    })
}

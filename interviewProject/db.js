const mongodb = require(`mongodb`).MongoClient;
let dbuser = 'ketan';
let dbpassword = 'ketan18710';
let dbname = 'hospitals';
let collection = 'hospital';
let url = `mongodb://${dbuser}:${dbpassword}@ds121183.mlab.com:21183/hospitals`
function connect(cb) {
    mongodb.connect(url, function(err, client){
        if(err) throw err;
        let db = client.db(dbname);
        collection = db.collection(collection);
        cb();
    })
}

function insertDoc(data){
    // data = JSON.stringify(data)
   collection.insertOne(data,function(err, result){
       if (err) throw err;
       console.log(result); 
   })
}
function delDoc(data){
        collection.deleteOne({"data[id]" : data['data[id]']})
}
function udtDoc(o_data,u_data){
    // o_data = JSON.stringify(o_data)
    // u_data = JSON.stringify(u_data)
    collection.updateOne(
        {'data[id]' : o_data['data[id]']},
        {$set : {'data[name]': u_data['data[name]'],
        'data[city]': u_data['data[city]'],
        'data[country]': u_data['data[country]'],
        'data[desc]': u_data['data[desc]']
        }}
        ,function(err,result){
            if (err) throw err;
            
            console.log('updated');
            
        }
    )
}
function getValues(cb){
    var arr = [];
    collection.find({}).toArray(function(err, docs) {
        if (err) throw err ;
        // docs = JSON.parse(docs)
        for(i=0;i<docs.length;i++)
        {
            arr.push(docs[i]);
        }
        cb(arr);
      });
     
}

module.exports = {
    connect,
    insertDoc,
    udtDoc,
    delDoc,
    getValues
}

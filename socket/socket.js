var Bet = require('../models/bet');
var moment = require('moment');
var timezone = require('moment-timezone');
var Betorder = require('../models/betorder');
var Bettest = require('../models/bettest');
var User = require('../models/user');
function socket(io){

    io.sockets.on('connection', function(socket){
        
        console.log('a user1 connected ->' + 
        JSON.stringify(socket.request.connection._peername));
/*
        socket.remoteAddress = socket.request.connection._peername.address;
        socket.remotePort = socket.request.connection._peername.port;
*/



//socket.io data for admin page 

        socket.on('new data', function(newdata){
            console.log(newdata.timenow +  '서버에 데이터 들어옴');
            
            var betresult = [];
            
            Betorder.find({})
            .sort({"createdat" : 1})
            .exec(
              (function(err, docs) {
    
               

                var mydata1 = {
                    timenow : moment().utc().format('MDDHH'),
                    betresult : docs 
                  };  
                  io.sockets.emit('betnow', mydata1); 
              })   
            )




        });


        var testresult = [];

        Bettest.find({})
        .sort({"order" : 1})
        .exec(




          (function(err, bettests) {
            if (err) {
                return res.write('Error!');
              }



              for(var i = 0; i < bettests.length; i++){
                console.log('this is i ' + i);
                console.log(testresult);

                User.findOne({ email: bettests[i].userid})
                .sort({"email" : 1})
                .exec(

                    (function(err,result){
                        
                 
                if(err)throw err;

                if(result){

                    testresult.push(result);
                    
                  }

                  else{console.log("not found")}


                  }) 
               
                 ) } 
              


              var mydata = {
                timenow : testresult,
                betresult : bettests
              };  


            
                    setInterval(
                        function(){ 
                            io.sockets.emit('bet test', mydata); 
                            console.log('this is bet result ->' + testresult);

                        }, 
                        300000);



          })   
        )







//socket.io data for betstart page


        var betresult;

        Bet.find({})
        .sort({"order" : 1})
        .exec(
      
          (function(err, docs) {

            var betresult = JSON.stringify(docs[0].title);
            var timenow;      

            var commingmatch = [];
            var finishedmatch = [];

            setInterval(
                function(){ 
                 for (var i = 0; i < docs.length; i++){
                        if (docs[i].date > moment().utc().format('MDDHH'))
                        {
                            commingmatch.push(docs[i]);
                        } 
                        else 
                            {
                            finishedmatch.push(docs[i]);
                            }  
                      }
                     
                    var mydata = {
                      timenow : moment().utc().format('MDDHH'),
                      betresult : commingmatch
                      /*betresult : JSON.stringify(commingmatch)*/
                    };  

                    io.sockets.emit('bet message', mydata); 
                    commingmatch = [];
                    finishedmatch = [];
                    /*
                    console.log(moment().utc().format('MDDHH'));
                    console.log(moment().format('YYYYMMDDHHmm'));
                    moment().format('MMMM Do YYYY, h:mm:ss a')

                    console.log(moment().utc().format('MDDHH') + 'this is it')
                    console.log('-------------------------------------------------');
                    console.log('commingmatch ->' + commingmatch);
                    console.log('-------------------------------------------------');
                    console.log('finished match ->' + finishedmatch);
                    */
                }, 
                300000);

          })   
        )

        /*

        var data = {
            timenow : Date.now(),
            betresult : betresult

        };  
        setInterval(
            function(){ 
                io.sockets.emit('bet message', data); }, 
            3000);
*/
           

    });

}



module.exports = socket;

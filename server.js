var express = require('express');

var app = express();
var hbs = require('hbs');
var fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');


app.set('view engin','hbs');

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

// app.use((req,res,next)=>{
//   res.render('maintanance.hbs')
// })

app.use(express.static(__dirname + '/public'));
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log',log + '\n' );
next();
});


app.get('/',(req,res)=>{
  res.render('index.hbs',{
    pageTitle:'Welcome to My Website'
  });
})
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});


//
//  app.get('/',(req,res)=>{
//    //res.send("Hello Express !");
//    res.send('<h1>Hellow Express !<h1>')
//  });

//

// app.get('/about',(req,res)=>{
//     res.send({
//       name:'Aniruddh',
//       likes:[
//         'cricket',
//         'pc'
//       ]
//     });
// });

//
// app.get('/about',(req,res)=>{
//   res.send('<h2>About page !</h2>');
// });

// app.get('/bad',(req,res)=> {
//   res.send({
//     error:'Error Handling request'
//   });
// });

 app.listen(port,()=>{
   console.log(`Server is up on port ${port}`);
 });

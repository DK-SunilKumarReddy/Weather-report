const express=require("express");
const https=require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const city = (req.body.cityName);

    res.set("Content-Type","text/html");
    const url="https://api.openweathermap.org/data/2.5/weather?zip="+city+",in&appid=8ed9d9d3c675d7c635d88735c02a0f4b&units=metric";

https.get(url,function(response){
// console.log(response);
console.log(response.statusCode);

response.on("data",function(data){
    console.log(data);
    const wt=JSON.parse(data);
    console.log(wt);
    // var object={name:'sunil',college:'rvr'};
    // console.log(JSON.stringify(object));
    var temparature=wt.main.temp;
    var feel_like=wt.main.feels_like;
    var temp_min=wt.main.temp_min;
    var temp_max=wt.main.temp_max;
    var pressure=wt.main.pressure;
    var humidity=wt.main.humidity;
    var sea_level=wt.main.sea_level;
    var grnd_level=wt.main.grnd_level;
    const desc=wt.weather[0].description;
    const name=wt.name;
    console.log(temparature);

    
    res.write("<h1>The Temparature in <i>"+ name.toUpperCase() +"</i> is "+temparature+" Celsius</h1><hr>");
    res.write("<h2>Description: "+desc+"</h2><hr>");
    res.write("<h2 style='color:red;'>Other Information::</h2>");
    res.write("<h3>Temparature Feels_like: "+feel_like+"</h3>");
    res.write("<h3>Minimum Temparature: "+temp_min+"</h3>");
    res.write("<h3>Maximum Temparature: "+temp_max+"</h3>");
    res.write("<h3>Pressure: "+pressure+"</h3>");
    res.write("<h3>Humidity: "+humidity+"</h3>");
    res.write("<h3>Sea_level: "+sea_level+"</h3>");
    res.write("<h3>Ground_level: "+grnd_level+"</h3>");
});
});
    // res.send("Hello");
});







app.listen(process.env.PORT || 3000,function(){
    console.log("Server started at port 3000");
});
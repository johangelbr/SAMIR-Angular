///PACKAGES///
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Samir = require("./models/samir");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var pid = require("./models/pid");
var config = require("./config/database");
var data1={};
var data2={};


var pids = require("./routes/pids");
var users = require("./routes/users");


///INITIAL PARAMETERS///
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(cors());
app.use(bodyParser.json()); 

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

///CONECTING TO DB///
mongoose.connect(config.database, { useMongoClient: true });

mongoose.connection.on("connected", function(){
    console.log(config.database);
});

//error handling
mongoose.connection.on("error", function(err){
    console.log(err); 
});
// mongoose.connect("mongodb://localhost/Samirdb");


app.use("/pids",pids);
app.use("/users", users);

//////Split String by Comma//////

  function splitString(stringToSplit,index) {
  var arrayOfStrings = stringToSplit.split(',');// ArrayOfString is an Array filled with the spitted String values 

//   console.log('The original string is: "' + stringToSplit + '"');
//   console.log('The array has ' + arrayOfStrings.length + ' elements: '+arrayOfStrings[0] );
  return arrayOfStrings[index];
}
var test = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec';

splitString(test);

////PASSPORT CONFIG////


// app.use(require("express-session")({
//     secret: "Passport configuration",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());


// db.collection.find().limit(1).sort({$natural:-1})


//  ===================
//      INDEX ROUTES
//  ===================
///INDEX ROUTE///
app.get("/samir",function(req,res){
res.render("index");
});

app.get("8299241736",function(req,res){
    var vin = req.params.vin_code;
    //JTMZF31V29500 Toyota
    //5XYKT4A1XBG11 Kia
res.send("Johangel Baez 82992417368298546398");
});

///GETTING DATA///

// /:coolant_temp/:latitude/:longitude/:rpm/:speed/:diff/:acc_x/:acc_y/:acc_z/:acc_temp/:gyr_x/:gyr_y/:gyr_z/:gps_date/:gps_sat/:gps_alt/:gps_speed/:obd_voltaje/:avg_speed/:distance/:id_sd/:vin_vehicle/:dtc
app.get("/samir/obdmodule/:engine_load/:throttle/:diff/:latitude/:acel/:gps_speed",function(req,res){
var engine= req.params.engine_load,
    throttle= req.params.throttle,
    fuel= req.params.fuel_level,
    coolant= req.params.coolant_temp,
    lat= req.params.latitude,
    long= req.params.longitude,
    rpm= req.params.rpm,
    speed= req.params.speed,
    diff= req.params.diff,
    acel= req.params.acel,
    accx= req.params.acc_x,
    accy= req.params.acc_y,
    accz= req.params.acc_z,
    acctemp= req.params.acc_temp,
    gyrx= req.params.gyr_x,
    gyry= req.params.gyr_y,
    gyrz= req.params.gyr_z,
    gpsdate= req.params.gps_date,
    gpssat= req.params.gps_sat,
    gpsalt= req.params.gps_alt,
    gpsspeed= req.params.gps_speed,
    obdv= req.params.obd_voltaje,
    avgspeed= req.params.avg_speed,
    dist= req.params.distance,
    sdid= req.params.id_sd,
    vin= req.params.vin_vehicle,
    dtc= req.params.dtc;
    
data1 = {
 
    PID_ENGINE_LOAD1: engine, 
    PID_THROTTLE1: throttle, 
    DIFF1: diff,
    PID_LATITUD:lat,
    PID_ACEL: acel,
    GPS_SPEED: gpsspeed
   
    
};
res.send();
//    pid.create(newData,function(err,newly){
//   if(err){
//       console.log(err);
//   } else{
//         res.send("8299241736");
        
        
//   }
// }); 
});

app.get("/samir/obdmodule2/:rpm/:speed/:longitude/:acc_temp/:gps_date/:gyro",function(req,res){
var engine= req.params.engine_load,
    throttle= req.params.throttle,
    fuel= req.params.fuel_level,
    coolant= req.params.coolant_temp,
    lat= req.params.latitude,
    long= req.params.longitude,
    rpm= req.params.rpm,
    speed= req.params.speed,
    diff= req.params.diff,
    accx= req.params.acc_x,
    accy= req.params.acc_y,
    accz= req.params.acc_z,
    acctemp= req.params.acc_temp,
    gyrx= req.params.gyr_x,
    gyry= req.params.gyr_y,
    gyrz= req.params.gyr_z,
    gpsdate= req.params.gps_date,
    gpssat= req.params.gps_sat,
    gpsalt= req.params.gps_alt,
    gpsspeed= req.params.gps_speed,
    obdv= req.params.obd_voltaje,
    avgspeed= req.params.avg_speed,
    dist= req.params.distance,
    sdid= req.params.id_sd,
    vin= req.params.vin_vehicle,
    dtc= req.params.dtc,
    gyro= req.params.gyro
    
data2 = {
    PID_ENGINE_LOAD1: data1.PID_ENGINE_LOAD1, 
    PID_THROTTLE1: data1.PID_THROTTLE1, 
    DIFF1: data1.DIFF1,
    PID_LATITUD:data1.PID_LATITUD,
    PID_ACEL: data1.PID_ACEL,
    GPS_SPEED: data1.GPS_SPEED,
    PID_RPM1: rpm,
    PID_SPEED1: speed,
    PID_LONGITUD: long,
    ACC_TEMP: acctemp,
    GPS_DATE: gpsdate,
    PID_GYRO: gyro

};

res.json();

});

app.get("/samir/obdmodule3/:coolant_temp/:avg_speed/:distance/:id_sd/:vin_vehicle/:dtc",function(req,res){
var engine= req.params.engine_load,
    throttle= req.params.throttle,
    fuel= req.params.fuel_level,
    coolant= req.params.coolant_temp,
    lat= req.params.latitude,
    long= req.params.longitude,
    rpm= req.params.rpm,
    speed= req.params.speed,
    diff= req.params.diff,
    accx= req.params.acc_x,
    accy= req.params.acc_y,
    accz= req.params.acc_z,
    acctemp= req.params.acc_temp,
    gyrx= req.params.gyr_x,
    gyry= req.params.gyr_y,
    gyrz= req.params.gyr_z,
    gpsdate= req.params.gps_date,
    gpssat= req.params.gps_sat,
    gpsalt= req.params.gps_alt,
    gpsspeed= req.params.gps_speed,
    obdv= req.params.obd_voltaje,
    avgspeed= req.params.avg_speed,
    dist= req.params.distance,
    sdid= req.params.id_sd,
    vin= req.params.vin_vehicle,
    dtc= req.params.dtc,
    gyro= req.params.gyro
    
var newData = {
    PID_ENGINE_LOAD1: data2.PID_ENGINE_LOAD1, 
    PID_THROTTLE1: data2.PID_THROTTLE1, 
    DIFF1: data2.DIFF1,
    PID_LATITUD:data2.PID_LATITUD,
    PID_ACEL: data2.PID_ACEL,
    GPS_SPEED: data2.GPS_SPEED,
    PID_RPM1: data2.PID_RPM1,
    PID_SPEED1: data2.PID_SPEED1,
    PID_LONGITUD: data2.PID_LONGITUD,
    ACC_TEMP: data2.ACC_TEMP,
    GPS_DATE: data2.GPS_DATE,
    PID_GYRO: data2.PID_GYRO,
    PID_COOLANT_TEMP1:coolant ,
    AVG_SPEED: avgspeed,
    DISTANCE: dist,
    ID_OF_FILE_SD: sdid,
    VIN_OF_VEHICLE: vin,
    DTC_CODES: dtc

};

   pid.create(newData,function(err,newly){
   if(err){
       console.log(err);
   } else{
        res.send();
        
        
   }
}); 
});









//  ===================
//      DASHBOARD ROUTES
//  ===================

app.get("/samir/dash",function(req,res){
    
    pid.find({}).sort({_id:-1}).limit(1).exec(function(err, name) {
        if(err){
            console.log(err);
            
        }else{
          
          name.forEach(function(dash){
              
            console.log(splitString(dash.PID_LATITUD,2));
          });
              
            
        }
    });

});

app.get("/samir/dash/user",function(req,res){
res.render("user");
});

app.get("/samir/dash/table",function(req,res){
res.render("table");
});

app.get("/samir/dash/maps",function(req,res){
res.render("maps");
});

app.get("/samir/dash/noti",function(req,res){
res.render("notifications");
});


//  ===================
//      AUTH ROUTES
//  ===================

///SIGN UP ROUTE///
app.get("/signup",function(req,res){
res.render("sign");
});
//// SIGNUP logic///
app.post("/signup", function(req,res){
    var newUser= new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err,user){
      if(err){
          console.log(err);
          return res.render("sign");
      }
      passport.authenticate("local")(req,res,function(){
          res.redirect("/samir");
      });
  });
});

////LOGIN FORM////
app.get("/samir/login",function(req, res) {
res.render("login");
});
//////LOGIN LOGIC//////
app.post("/samir/login",passport.authenticate("local", {successRedirect: "/samir/dash", failureRedirect: "/samir/login"}) ,function(req, res) {

});


app.get('/find/:query', function(req, res) {
	var query = req.params.query;

	User.find({
		'username': query
	}, function(err, result) {
		if (err) throw err;
		if (result) {
			res.json(result)
		} else {
			res.send(JSON.stringify({
				error : 'Error'
			}))
		}
	})
})



//  ===================
//     SERVER ROUTES
//  ===================

///SERVER///
app.listen(process.env.PORT,process.env.IP,function(){
console.log("SAMIR SERVER ON");

pid.find({'_id': '5a04684a36866319323ca7af'}, function (err,docs) {
    if(err) throw err;
  var date;
    docs.forEach(function(res){
          date = new Date(res.date);
            // console.log(res.ID_OF_FILE_SD);
            console.log(date.getHours()+":"+date.getMinutes());
          });

    // pid.find({}).sort({_id:-1}).limit(1).exec(function(err, name) {
    //     if(err){
    //         console.log(err);
            
    //     }else{
          
    //      console.log(name);
             
    //     }
    // });



});
});



// import packages
var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),            //use to read POST from data
    mongoose       = require("mongoose"),               //connect to mongoDB
    flash          = require("connect-flash"),          //allows to pass non-persistent messeges across website
    passport       = require("passport"),               //authentication
    LocalStrategy  = require("passport-local"),         //local scheming for authentication 
    methodOverride = require("method-override"),        //used to send PUT, DELETE requests from html forms
    Campground     = require("./models/campground"),    //include the campground model
    Comment        = require("./models/comment"),       //include comments model
    User           = require("./models/user"),          //include user model
    seedDB         = require("./seeds");                //include Database seeding file

// requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require('./routes/index');
    
// set up the mongodb
var url =process.env.DATABASEURL || "mongodb://localhost:/yelp_camp";
mongoose.connect(url);

// set up body-parser
app.use(bodyParser.urlencoded({extended: true}));
// set up the ejs view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// set up method override
app.use(methodOverride("_method"));
// set up connect-flash
app.use(flash());

// seedBD for testing
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({              //manages browser session for logged in/out etc.
    secret: "Everything is awesome",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to create globle varible for currentUser
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// set up routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// set up the server
app.listen( 3000 , function () {
   console.log("The YelpCamp server is running"); 
});
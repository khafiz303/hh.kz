const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./User')

const jwtOptions ={

    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'poka'
    

}

passport.use(new JWTStrategy(jwtOptions, async(jwtPayload , done)=>{
    const user = await User.findByPk(jwtPayload.id)
    console.log(jwtPayload);


    if(user) done(null , user) 
    else done (null , false)
}))

module.exports = {
    jwtOptions
}


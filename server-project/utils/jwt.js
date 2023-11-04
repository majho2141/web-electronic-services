const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const expirationToken = new Date();
    //De la variable que contiene la fecha actual se consulta la hora y se le suma una hora
    expirationToken.setHours(expirationToken.getHours() + 1);
    //Se crea el objeto payload del jwt con la informacion que se quiere guardar en el token
    const payload = {
        id: user._id,
        email: user.email,
        iat: Date.now(),
        exp: parseInt(expirationToken.getTime() / 1000),
    };
    //Generamos el token con la informacion del payload y el secret
    const access = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);
    return access;
};

const refreshToken = (user) => {
    console.log(user);
    const expirationToken = new Date();
    expirationToken.setMonth(expirationToken.getMonth() + 1);
    const payload = {
        id: user._id,
        email: user.email,
        iat: Date.now(),
        exp: expirationToken.getTime(),
    };
    
    const refresh = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);
    return refresh;
}

const decodeAccessToken = (token) => {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    return verifyToken;
};

module.exports = {
    generateToken,
    refreshToken,
    decodeAccessToken,
};
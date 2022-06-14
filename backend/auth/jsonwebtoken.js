
   
const jwt = require('jsonwebtoken');

const signIn = (user, secret) => {
    const token = jwt.sign(
        {
            uid: usuario._id,
            user: user.nombre, // undefined porque no tenemos nombre en la DB, pero podemos añadirlo en un futuro
          
          
        },
        secret,
        { expiresIn: '1h' }
    );

    return token;
};

module.exports = { signIn };
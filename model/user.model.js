import connectDB from "../controller/database.controller";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,

});
const User = mongoose.model('User', userSchema);

const userLogin = new mongoose.Schema({
    username: String,
    password: String,
    sessionID: String,
    sessionExpire: Date
});
const UserLogin = mongoose.model('UserLogin', userLogin);


async function loginUser(username, password, sessionID = "") {
    dbClient = connectDB();
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    loginUser
}
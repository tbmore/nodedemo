const mongoose = require('mongoose');
const mongoDBURL = require('../config').mongoDBURL

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('mongoose connect "OK"')
    })
    .catch(err => {
        console.log(err, 'mongoose connect "FAIL"')
    });
module.exports = mongoose
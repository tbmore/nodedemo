const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 定义接口数据

// 用户信息
// Schema 
var UserSchema = new Schema({
    name: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, match: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ },
    date: { type: Date, default: Date.now },
    age: {
        type: Number,  //Types内置类型如下：String,Number,Boolean,Array,Buffer,Date,ObjectId,Mixed
        // lowercase: true, // 总是将test的值转化为小写
        // uppercase: true, // 总是将test的值转化为大写
        // required: true, //设定是否必填
        default: 18, //设定默认值
        // index: true, //设定索引值
        // unique: true, //索引值唯一
        // sparse: true, //是否启用稀疏索引
        // match: RegExp, //判断是否通过正则验证
        // enum: Array, //判断test值是否包含于enmu对应的数组中
        // min: 3, //判断对应值是否大于等于给定值
        // max: 1000, //判断对应值是否小于等于给定值
        // trim: true, //去除数据前后的空格
        // capped: 1024, //限定大小最大为1024字节
        // validate: [property=>(!this.updated || property.length), 'Please fill in your first name'], //为此属性添加一个验证器函数。
        // get: v => Math.round(v),//为这个属性定义一个定制的getter Object.defineProperty()。
        // set: v => Math.round(v),//定义此属性的自定义设置Object.defineProperty()。
    },
    buff: Buffer,
});

module.exports = mongoose.model('User', UserSchema);


// const User = require('../db/models/user')
// 增
// user = new User()  
// user.save({
//     name:'gan',
//     age:18,
//     bio:'gjx'
// })
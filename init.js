const mongoose = require("mongoose");

const Chat = require("./models/chat.js")

main()
.then(() => {
    console.log("connection Successful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
} 



let allchats = [
    {
    from:"neha",
    to: "sourabh",
    msg: "How are yoy ",
    created_at: new Date()
},
{
    from:"gourav",
    to: "dad",
    msg: "this is you ball",
    created_at: new Date()   
},{
    from:"dev",
    to: "anju",
    msg: "this is my pencile and pen ",
    created_at: new Date()
},{
    from:"jayesh",
    to: "neeraj",
    msg: "or bhai ki haal",
    created_at: new Date()
},{
    from:"pavan",
    to: "darshan",
    msg: "plz check your mail ",
    created_at: new Date()
},{
    from:"dishu",
    to: "sou",
    msg: "How are yovfvfe ",
    created_at: new Date()
},{
    from:"neema",
    to: "falsee",
    msg: "Hhow u tr days ",
    created_at: new Date()
},{
    from:"neh",
    to: "sourbh",
    msg: "How are yo ",
    created_at: new Date()
}];

Chat.insertMany(allchats);
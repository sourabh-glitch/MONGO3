const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));


main()
.then(() => {
    console.log("connection Successful");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatapp');
}  

let chat1= new Chat({
    from:"neha",
    to: "sourabh",
    msg: "How are yoy ",
    created_at: new Date()
});

chat1.save().then(res =>{
    console.log(res)
})
.catch(err => {
    console.log(err)
});

// Home Route

app.get("/", (req, res) => {
 res.send("root is working")
})

// Create Route

app.post("/chats", (req,res) =>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to:to,
        msg:msg,
        created_at: new Date()
    });
    newChat.save().then(res => {console.log("Chat was saved")}).catch(err =>{console.log(err)})
    res.redirect("/chats")
})

app.get ("/chats", async (req, res) =>{
    let chats =  await Chat.find()
    console.log(chats);
    res.render("index.ejs", {chats})
});

// New route
app.get("/chats/new", (req, res)=>{
    res.render("new.ejs")

})

// edit route

app.get("/chats/:id/edit", async (req, res) =>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat})
})

// update route
app.put("/chats/:id", async (req, res) =>{
    let {id}= req.params;
    let {msg: newmsg} = req.body;
    let updatedchat = await Chat.findByIdAndUpdate(
        id,{msg: newmsg},
        {runValidators: true, new: true}
    );
    console.log(updatedchat)
    res.redirect("/chats")
})

// Destroy route

app.delete("/chats/:id",  async (req, res)=>{
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");

})

app.listen(8080, () =>{
    console.log("Server is listeing on port 8080")
});

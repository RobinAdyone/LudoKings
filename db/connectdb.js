
const mongoose=require("mongoose");
mongoose.set('strictQuery', true);
const connectdb=async(DATABASE_URL)=>{
  await mongoose
    .connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`connection done...`);
    }).catch((err)=>{
      console.log(`Database is not connect for this error`,err);
    });
}

module.exports=connectdb;
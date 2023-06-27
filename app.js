const express = require("express")
const mongoose = require ("mongoose");
const bodyParser =require ("body-parser")
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connect with mongodb")
}).catch ((err)=>{
    console.log(err)
})


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
const productSchema = new  mongoose.Schema({
    name:String,
    description:String,
    price:Number,

})

const Product = new mongoose.model("Product",productSchema)

// create product

app.post("/api/v1/product/new",async(req,res)=>{

   const product =  await Product.create(req.body)
     res.status(200).json({
        success:true,
        product
     })
})




// Read Product
app.get("/api/v1/products",async(req,res)=>{
    const products =await Product.find();

    res.status(200).json({success:true,products})
})

// update product

app.put("/app/v1/product/:id",async(req,res)=>{
   let product = await  Product.findById(req.params.id)

   if (!product){
    return res.status(500).json({
        success:false,
        message:"product is not found"
    })
}
   product = await product.findByIdAndUpdate(req.params.id,req.body,
    {new:true,
useFindAndModify:false,
runValidators:true
})
res.status(200).json({
    success:true,
    product
})
})

// delet product

app.delete ("/api/v1/product/:id",async(req,res)=>{
    const product = await Product.findById(req.params.id);
if (!product){
    return res.status(500).json({
        success:false,
        message:"product is not found"
    })
}

    await product.remove();
    res.status(200).json({
        success:true,
        message:"product is delete succefully"
    })
})

app.listen (4500, ()=>{
    console.log("server is working http://localhost:4500")
}) 
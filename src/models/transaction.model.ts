import mongoose from "mongoose";


const transactionSchema=new mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    ammount:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
});


export default mongoose.model('Transaction',transactionSchema);
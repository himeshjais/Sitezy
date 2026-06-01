import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "ai"], // do hi log yha pe rhenge
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })

const websiteSchema = new mongoose.Schema({
    user: { // user needed to know which user created this website
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        default: "Untitled Website"
    },
    latestCode: {
        type: String,
        requried: true
    },
    conversation: [messageSchema],
    deployed: { type: Boolean, default: false },
    deployUrl: { type: String },
    slug:{type:String, unique:true, sparse:true}
}, { timestamps: true })

export const Website = mongoose.model("Website", websiteSchema)
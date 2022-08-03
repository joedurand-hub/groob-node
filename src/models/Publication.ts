import { Schema, model } from 'mongoose'

const publicationSchema = new Schema({
    content: {
        type: String, required: false, trim: true
    },
    image: {
        public_id: String,
        secure_url: String, 
        required: false, 
    },
    price: {
        type: Number, required: false, trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false
})

export default model('Publication', publicationSchema)
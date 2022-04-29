import { Schema, model } from 'mongoose'

const publicationSchema = new Schema({
    description: { 
        type: String, required: true, trim: true 
    },
    image: { 
        type: String, required: false, trim: true 
    },
    video: {
        type: String, required: false, trim: true 
    },
    url: { 
        type: String, required: false, trim: true 
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model('Publication', publicationSchema)
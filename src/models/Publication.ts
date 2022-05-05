import { Schema, model, Document } from 'mongoose'

export interface PublicationI extends Document {
    description: string;
    image: string;
    video: string;
    url: string;
    user: [string];
}

const publicationSchema = new Schema({
    content: {
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
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
}, {
    timestamps: true,
    versionKey: false
})

export default model<PublicationI>('Publication', publicationSchema)
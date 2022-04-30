import mongoose, { ConnectOptions } from "mongoose";

(async () => {
        try {
    const URI = `mongodb+srv://${process.env.MONGO_DATABASE}:${process.env.MONGO_PASSWORD}@cluster0.p7kqs.mongodb.net/test?retryWrites=true`
    await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    } as ConnectOptions);
} catch (error) {
    console.log(error)
}
})()

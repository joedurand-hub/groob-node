import mongoose, { ConnectOptions } from "mongoose";

(async () => {
        try {
    const URI = `mongodb+srv://upme:cFImdNMqAslga2py@cluster0.p7kqs.mongodb.net/test?retryWrites=true`
    await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    } as ConnectOptions);
} catch (error) {
    console.log(error)
}
})()

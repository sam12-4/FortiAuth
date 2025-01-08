import { app } from "./app.js";
import 'dotenv/config'
import { connectDB } from "./data/database.js";

const port = process.env.PORT || 3000;
connectDB();

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port} in ${process.env.NODE_ENV} mode`);
})

// for development mode use start : "set NODE_ENV=production && node server.js" and for "dev" : "set NODE_ENV=development && nodemon server.js" in package.json without using variables in .env file
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node server.js",
//     "dev": "nodemon server.js"
//   },

import express from 'express';
import { connectToDatabase } from "./services/database.service"
import { postsRouter } from './routes/post.router';

const app = express();

connectToDatabase()
    .then(() => {
        app.use("/posts", postsRouter);

        app.listen(4000, () => {
            console.log(`Server started at http://localhost:4000`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

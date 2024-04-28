import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Post from "../models/post";

export const postsRouter = express.Router();

postsRouter.use(express.json());

postsRouter.get("/filterByContent", async (req: Request, res: Response) => {
    try {
        // Find posts where content has more than 50 digits
        const filteredPosts = await collections.posts!
            .find({ content: { $regex: "\\d{50,}" } })
            .toArray();

        if (filteredPosts.length > 0) {
            res.status(200).send(filteredPosts);
        } else {
            res.status(404).send("No posts found matching the filter condition");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error filtering posts by content: ${error.message}`);
    }
});

postsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await collections.posts!.find().toArray();

        if (posts.length > 0) {
            res.status(200).send(posts);
        } else {
            res.status(404).send("No posts found");
        }
    } catch (error) {
        res.status(500).send(`Error finding posts: ${error.message}`);
    }
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // Check if id is undefined
        if (!id) {
            return res.status(400).send("Invalid ID");
        }

        const query = { _id: new ObjectId(id) };
        const post = (await collections.posts!.findOne(query)) as unknown as Post;

        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send(`No matching document found with id: ${id}`);
        }
    } catch (error) {
        res.status(500).send(`Error finding document: ${error.message}`);
    }
});

postsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newPost = req.body as Post;
        const result = await collections.posts!.insertOne(newPost);

        result
            ? res.status(201).send(`Successfully created a new post with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new post.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

postsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedGame: Post = req.body as Post;
        const query = { _id: new ObjectId(id) };

        const result = await collections.posts!.updateOne(query, { $set: updatedGame });

        result
            ? res.status(200).send(`Successfully updated post with id ${id}`)
            : res.status(304).send(`Post with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

postsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.posts!.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed post with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove post with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Post with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

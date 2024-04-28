import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { posts?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const postsCollection: mongoDB.Collection = db.collection(process.env.POST_COLLECTION_NAME!);

    collections.posts = postsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${postsCollection.collectionName}`);
}
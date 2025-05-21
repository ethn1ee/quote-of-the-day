import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
	let client;
	let database;
	let collection;

	try {
		const password = encodeURIComponent(process.env.PASSWORD);
		const uri = `mongodb+srv://ethantlee:${password}@personal.opviux4.mongodb.net/?retryWrites=true&w=majority&appName=Personal`;
		client = new MongoClient(uri, {
			autoSelectFamily: false,
			autoSelectFamilyAttemptTimeout: 300,
		});

		database = client.db("quote-of-the-day");
		collection = database.collection("quotes");
	} catch (err) {
		throw new Error(err);
	}

	console.log("✅ MongoDB connection successful");

	return { client, database, collection };
}

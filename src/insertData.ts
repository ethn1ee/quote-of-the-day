import fs from "fs";
import { connect } from "./connect";

async function run() {
	const { client, collection } = await connect();

	try {
		const data: Quote[] = JSON.parse(
			fs.readFileSync("./data/quotes.json", "utf8")
		);

		const deleted = await collection.deleteMany({});
		console.log(`${deleted.deletedCount} documents were deleted.`);

		const inserted = await collection.insertMany(data);
		console.log(`${inserted.insertedCount} documents were inserted`);
	} finally {
		await client.close();
	}
}

run().catch(console.dir);

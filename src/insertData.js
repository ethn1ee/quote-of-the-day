import fs from "fs";
import { connect } from "./connect";

async function reinsertQuotes(data) {
	const { client, collection } = await connect("quotes");

	try {
		const deleted = await collection.deleteMany({});
		console.log(`${deleted.deletedCount} documents were deleted.`);

		const inserted = await collection.insertMany(data);
		console.log(`${inserted.insertedCount} documents were inserted`);
	} finally {
		await client.close();
	}
}

reinsertQuotes().catch(console.dir);

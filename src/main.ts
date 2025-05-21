import express from "express";
import { connect } from "./connect.js";
import { formatQuote } from "./formatQuote.js";

const app = express();
const port = 3000;

const { collection } = await connect();

app.get("/", async (req, res) => {
	const randomQuote = (await collection
		.aggregate([{ $sample: { size: 1 } }])
		.toArray()) as Quote[];

	res.send(formatQuote(randomQuote[0]));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

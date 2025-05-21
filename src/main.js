import express from "express";
import { connect } from "./connect.js";
import { formatQuote } from "./formatQuote.js";
import cron from "node-cron";

const app = express();
const port = 3000;

const { collection } = await connect("quotes");
let currentQuote;

async function updateQuote() {
	const quote = await collection
		.aggregate([{ $sample: { size: 1 } }])
		.toArray();
	currentQuote = quote[0];
}

cron.schedule("0 0 * * *", updateQuote);

await updateQuote();

app.get("/", async (req, res) => {
	res.send(formatQuote(currentQuote));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

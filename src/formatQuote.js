export function formatQuote(quote) {
	const reset = "\x1b[0m",
		bold = "\x1b[1m",
		italic = "\x1b[3m",
		cyan = "\x1b[36m",
		yellow = "\x1b[33m",
		gray = "\x1b[90m";

	const words = quote.content.split(" ");
	const chunkedWords = [];
	for (let i = 0; i < words.length; i += 10) {
		chunkedWords.push(words.slice(i, i + 10).join(" "));
	}

	const formattedContent = `${bold}${cyan}"${chunkedWords.join(
		"\n\t"
	)}"${reset}`;

	const formattedAuthor = `${yellow}-- ${quote.author}${reset}`;

	const date = `${italic}${gray}${
		new Date().toISOString().split("T")[0]
	}${reset}`;

	return `
	${date}
	
	${formattedContent}

	${formattedAuthor}
  `;
}

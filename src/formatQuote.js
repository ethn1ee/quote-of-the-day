export function formatQuote(quote) {
	const reset = "\x1b[0m",
		bold = "\x1b[1m",
		cyan = "\x1b[36m",
		yellow = "\x1b[33m";

	const formattedContent = `${bold}${cyan}"${quote.content}"${reset}`;
	const formattedAuthor = `${yellow}-- ${quote.author}${reset}`;

	return `
  ${formattedContent}
  ${formattedAuthor}
  `;
}

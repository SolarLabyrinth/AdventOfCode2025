export async function readInputFile(file: string) {
	const text = await Bun.file(`inputs/${file}.txt`).text();
	return text.split("\n").map((line) => line.trim());
}

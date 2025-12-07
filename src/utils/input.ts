export async function readInputFileRaw(file: string) {
	const text = await Bun.file(`inputs/${file}.txt`).text();
	return text.split("\n");
}

export async function readInputFile(file: string) {
	const text = await readInputFileRaw(file);
	return text.map((line) => line.trim());
}

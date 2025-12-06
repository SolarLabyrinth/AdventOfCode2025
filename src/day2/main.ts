import { readInputFile } from "../utils/input";

async function solve(part: "part1" | "part2") {
	const lines = await readInputFile("day2");
	const ranges = lines[0]
		.split(",")
		.filter(Boolean)
		.map((range) => {
			const [start, end] = range.split("-").map((num) => parseInt(num, 10));
			return { start, end };
		});

	let sumDoubles = 0;

	for (const { start, end } of ranges) {
		for (let i = start; i <= end; i++) {
			if (part === "part1" && /^(\d+)\1$/.test(String(i))) {
				sumDoubles += i;
			}
			if (part === "part2" && /^(\d+)\1+$/.test(String(i))) {
				sumDoubles += i;
			}
		}
	}

	console.log(sumDoubles);
}

await solve("part1");
await solve("part2");

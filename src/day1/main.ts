import { readInputFile } from "../utils/input";

const DIAL_MIN = 0;
const DIAL_MAX = 99;

async function solve(part: "part1" | "part2") {
	const lines = await readInputFile("day1");

	let dial = 50;
	let numTimesZero = 0;
	for (const line of lines) {
		const direction = line[0];
		const amount = parseInt(line.slice(1), 10);

		for (let i = 0; i < amount; i++) {
			if (direction === "L") {
				dial -= 1;
			} else if (direction === "R") {
				dial += 1;
			}

			if (dial < DIAL_MIN) {
				dial = DIAL_MAX;
			} else if (dial > DIAL_MAX) {
				dial = DIAL_MIN;
			}

			if (part === "part2" && dial === 0) {
				numTimesZero += 1;
			}
		}

		if (part === "part1" && dial === 0) {
			numTimesZero += 1;
		}
	}

	console.log(numTimesZero);
}

await solve("part1");
await solve("part2");

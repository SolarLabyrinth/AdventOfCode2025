import { readInputFile } from "../utils/input";

function calculateJoltage(remaining: number[], numGroups: number) {
	const highestDigits: number[] = [];

	for (let i = 0; i < numGroups; i++) {
		const group =
			i === numGroups - 1
				? remaining
				: remaining.slice(0, remaining.length - (numGroups - i - 1));

		const highestDigit = Math.max(...group);
		const index = group.indexOf(highestDigit);

		highestDigits.push(highestDigit);
		remaining = remaining.slice(index + 1);
	}

	const joltage = parseInt(highestDigits.join(""), 10);
	return joltage;
}

async function solve(part: "part1" | "part2") {
	const lines = await readInputFile("day3");

	let totalJoltage = 0;

	for (const batteryBank of lines) {
		const digits = batteryBank.split("").map((d) => parseInt(d, 10));
		totalJoltage += calculateJoltage(digits, part === "part1" ? 2 : 12);
	}

	console.log("Total Joltage:", totalJoltage);
}

await solve("part1");
await solve("part2");

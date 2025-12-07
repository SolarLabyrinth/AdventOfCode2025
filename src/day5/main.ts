import { readInputFile } from "../utils/input";

type Range = {
	start: number;
	end: number;
};

async function parseInput() {
	const lines = await readInputFile("day5");

	let mode: "ranges" | "ids" = "ranges";
	const ranges: Range[] = [];
	const ids: number[] = [];

	for (const line of lines) {
		if (line === "") {
			mode = "ids";
			continue;
		}
		if (mode === "ranges") {
			const [start, end] = line.split("-").map(Number);
			ranges.push({ start, end });
		} else {
			ids.push(Number(line));
		}
	}

	return { ranges, ids };
}

function isWithinRange(range: Range, point: number) {
	return point >= range.start && point <= range.end;
}

async function solvePart1() {
	const { ranges, ids } = await parseInput();

	let numFreshIngredients = 0;

	for (const id of ids) {
		for (const range of ranges) {
			if (isWithinRange(range, id)) {
				numFreshIngredients += 1;
				break;
			}
		}
	}

	console.log(numFreshIngredients);
}

function consolidateRanges(ranges: Range[]) {
	const consolidatedRanges: Range[] = [];

	outer: for (const range of ranges) {
		for (const candidate of consolidatedRanges) {
			if (range.start >= candidate.start && range.end <= candidate.end) {
				continue outer;
			}

			const isOverlappingStart = isWithinRange(candidate, range.start);
			const isOverlappingEnd = isWithinRange(candidate, range.end);
			if (isOverlappingStart || isOverlappingEnd) {
				candidate.start = Math.min(range.start, candidate.start);
				candidate.end = Math.max(range.end, candidate.end);
				continue outer;
			}
		}

		consolidatedRanges.push(range);
	}

	return consolidatedRanges;
}

async function solvePart2() {
	const { ranges } = await parseInput();

	let consolidatedRanges = ranges;
	let lastLength = ranges.length;
	while (true) {
		lastLength = consolidatedRanges.length;
		consolidatedRanges = consolidateRanges(consolidatedRanges);
		// it works lol
		consolidatedRanges = consolidateRanges(consolidatedRanges.reverse());
		if (consolidatedRanges.length === lastLength) {
			break;
		}
	}

	let totalLength = 0;
	for (const range of consolidatedRanges) {
		totalLength += range.end - range.start + 1;
	}
	console.log(totalLength);
}

await solvePart1();
await solvePart2();

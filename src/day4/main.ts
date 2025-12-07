import { readInputFile } from "../utils/input";

async function solve(part: "part1" | "part2") {
	const lines = await readInputFile("day4");
	const grid: string[][] = [];
	for (const line of lines) {
		grid.push(line.split(""));
	}

	const ROWS = grid.length;
	const COLS = grid[0].length;

	function getCell(x: number, y: number) {
		if (x < 0 || x >= COLS || y < 0 || y >= ROWS) {
			return null;
		}
		return grid?.[y]?.[x] ?? null;
	}
	function setCell(x: number, y: number, value: string) {
		if (x < 0 || x >= COLS || y < 0 || y >= ROWS) {
			return;
		}
		grid[y][x] = value;
	}

	function getAdjacentCells(x: number, y: number) {
		const cells = [
			getCell(x - 1, y - 1),
			getCell(x, y - 1),
			getCell(x + 1, y - 1),
			getCell(x - 1, y),
			getCell(x + 1, y),
			getCell(x - 1, y + 1),
			getCell(x, y + 1),
			getCell(x + 1, y + 1),
		];
		return cells.filter((cell) => cell !== null);
	}

	function traverseGrid(fn: (x: number, y: number, value: string) => void) {
		for (let row = 0; row < ROWS; row++) {
			for (let col = 0; col < COLS; col++) {
				const value = getCell(col, row);
				if (value !== null) {
					fn(col, row, value);
				}
			}
		}
	}

	let totalValid = 0;

	while (true) {
		let numValid = 0;
		traverseGrid((x, y, value) => {
			if (value !== "@") return;

			const adjacentCells = getAdjacentCells(x, y);
			const isValid =
				adjacentCells.filter((v) => v === "@" || v === "X").length < 4;
			if (isValid) {
				numValid += 1;
				setCell(x, y, "X");
			}
		});
		traverseGrid((x, y, value) => {
			if (value !== "X") return;
			setCell(x, y, ".");
		});
		totalValid += numValid;
		if (part === "part1") {
			break;
		}
		if (part === "part2" && numValid === 0) {
			break;
		}
	}

	console.log(totalValid);
}

await solve("part1");
await solve("part2");

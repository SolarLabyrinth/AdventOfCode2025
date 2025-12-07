import { readInputFile, readInputFileRaw } from "../utils/input";

async function solvePart1() {
	const lines = await readInputFile("day6");

	const grid: (number | string)[][] = lines.map((line) =>
		line.split(/\s+/).map((cell) => (cell.match(/\d+/) ? Number(cell) : cell)),
	);

	const ROWS = grid.length;
	const COLS = grid[0].length;

	let total = 0;

	for (let x = 0; x < COLS; x++) {
		const items = [];
		let operation: "*" | "+" = "+";
		for (let y = 0; y < ROWS; y++) {
			const cell = grid[y][x];
			if (typeof cell === "number") {
				items.push(cell);
			} else {
				operation = cell === "*" ? "*" : "+";
				break;
			}
		}
		total += items.reduce(
			(acc, val) => (operation === "*" ? acc * val : acc + val),
			operation === "*" ? 1 : 0,
		);
	}

	console.log(total);
}

function solveProblem(problem: string[]) {
	const width = problem[0].length;
	const height = problem.length - 1;

	const operation = problem[height].trim();

	const nums: number[] = [];
	for (let x = width - 1; x >= 0; x--) {
		const strs: string[] = [];
		for (let y = 0; y < height; y++) {
			strs.push(problem[y][x]);
		}
		nums.push(Number(strs.join("")));
	}
	if (operation === "+") {
		return nums.reduce((acc, val) => acc + val, 0);
	} else if (operation === "*") {
		return nums.reduce((acc, val) => acc * val, 1);
	}
	throw new Error(`Unknown operation: ${operation}`);
}

async function solvePart2() {
	const lines = await readInputFileRaw("day6");

	const length = lines[0].length;
	const height = lines.length;

	const emptyColumns: number[] = [];
	for (let x = 0; x < length; x++) {
		let isEmptyColumn = true;
		for (let y = 0; y < height; y++) {
			if (lines[y][x] !== " ") {
				isEmptyColumn = false;
				break;
			}
		}
		if (isEmptyColumn) {
			emptyColumns.push(x);
		}
	}
	emptyColumns.push(length);

	let sum = 0;

	let lastEmptyIndex = 0;
	for (const colIndex of emptyColumns) {
		const problem = [];
		for (const line of lines) {
			problem.push(line.slice(lastEmptyIndex, colIndex));
		}
		lastEmptyIndex = colIndex + 1;

		sum += solveProblem(problem);
	}
	console.log(sum);
}

await solvePart1();
await solvePart2();

type UserMedals = Record<string, (number[] | null)[]>;
type Medals = Record<string, UserMedals>;

import medals from "./medals.json";
import { getRandom } from "./utils";

export type Complexities =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "nightmare";

export const complexities: Complexities[] = [
  "beginner",
  "intermediate",
  "advanced",
  "nightmare",
];

interface PuzzleComplexity {
  star1solutionTotal: number;
  star1solutionCount: number;
  star2solutionTotal: number;
  star2solutionCount: number;
  noSolutionCount: number;
}

async function getPuzzleClasses(medals: Medals) {
  const years = Object.keys(medals);
  const complexity: Record<string, PuzzleComplexity> = {};
  for (const year of years) {
    const yearUsers = Object.keys(medals[year]);
    for (const user of yearUsers) {
      const userMedals = medals[year][user];
      for (const day in userMedals) {
        const puzzleKey = `${year},${Number(day) + 1}`;
        if (!complexity[puzzleKey]) {
          complexity[puzzleKey] = {
            star1solutionCount: 0,
            star1solutionTotal: 0,
            star2solutionCount: 0,
            star2solutionTotal: 0,
            noSolutionCount: 0,
          };
        }
        if (userMedals[day] !== null) {
          if (userMedals[day]?.[0] != null) {
            complexity[puzzleKey].star1solutionCount += 1;
            complexity[puzzleKey].star1solutionTotal +=
              userMedals[day]?.[0] || 0;
          }
          if (userMedals[day]?.[1] != null) {
            complexity[puzzleKey].star2solutionCount += 1;
            complexity[puzzleKey].star2solutionTotal +=
              userMedals[day]?.[1] || 0;
          }
        } else {
          complexity[puzzleKey].noSolutionCount += 1;
        }
      }
    }
  }

  const puzzles = Object.entries(complexity).map(([key, entry]) => {
    const [year, day] = key.split(",");
    return {
      year,
      day,
      id: `${year}/day/${day}`,
      complexity:
        Math.round(entry.star1solutionTotal / entry.star1solutionCount) +
        Math.round(entry.star2solutionTotal / entry.star2solutionCount),
      noSolutionCount: entry.noSolutionCount,
    };
  });

  const classes = puzzles
    .sort((a, b) =>
      a.complexity === b.complexity
        ? b.noSolutionCount - a.noSolutionCount
        : b.complexity - a.complexity
    )
    .reduce<Record<Complexities, string[]>>(
      (accu, item) => {
        if (item.complexity < 450) {
          accu.beginner.push(item.id);
        } else if (item.complexity < 800) {
          accu.intermediate.push(item.id);
        } else if (item.complexity < 1400) {
          accu.advanced.push(item.id);
        } else {
          accu.nightmare.push(item.id);
        }
        return accu;
      },
      { beginner: [], intermediate: [], advanced: [], nightmare: [] }
    );
  const noSolutionAverage = Math.round(
    puzzles.reduce((accu, p) => p.noSolutionCount + accu, 0) / puzzles.length
  );
  return [classes, puzzles, noSolutionAverage] as const;
}

export type Puzzle = {
  name: string;
  url: string;
  year: number;
  day: number;
  complexity: number;
  noSolutionDiff: number;
};

export async function getRandomPuzzle(name: Complexities) {
  const [classes, puzzles, noSolutionAverage] = await getPuzzleClasses(medals);
  const puzzleId = getRandom(classes[name]);
  const puzzle = puzzles.find((puzzle) => puzzle.id === puzzleId);
  return {
    year: Number(puzzle?.year || 0),
    day: Number(puzzle?.day || 0),
    name: puzzleId,
    url: `https://adventofcode.com/${puzzleId}`,
    complexity: puzzle!.complexity,
    noSolutionDiff: puzzle!.noSolutionCount - noSolutionAverage,
  };
}

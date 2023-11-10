"use client";

import { Puzzle, getRandomPuzzle } from "@/puzzles";
import { getRandom } from "@/utils";
import Link from "next/link";
import { useState } from "react";

const complexityColor: Record<string, string> = {
  easy: "text-sky-500",
  advanced: "text-lime-600",
  professional: "text-yellow-500",
  expert: "text-red-600",
};

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [complexity, setComplexity] = useState<string>("");
  const years = [2018, 2019, 2020, 2021, 2022];
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleClick = async (name: string) => {
    setComplexity(name);
    const puzzle: Puzzle = {
      url: "",
      name: "",
      year: 0,
      day: 0,
      complexity: 0,
      noSolutionDiff: 0,
    };

    setPuzzle(puzzle);

    const incrementTime = 150;

    let timer = setInterval(() => {
      const year = getRandom(years);
      const day = getRandom(days);
      setPuzzle({ ...puzzle, year, day });
    }, incrementTime);

    setTimeout(async () => {
      clearInterval(timer);

      setPuzzle(await getRandomPuzzle(name));
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-48">
      <div>
        <div className="text-3xl font-bold pb-16">
          Advent of Code Random Puzzle Picker
        </div>
        <div className="text-xl font-bold">Pick a complexity</div>
        <div className="flex flex-row gap-4 py-8">
          <button
            type="button"
            className="block border border-sky-500 rounded-md text-sky-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={async () => handleClick("easy")}
          >
            Easy
          </button>
          <button
            type="button"
            className="block border border-lime-600 rounded-md text-lime-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            onClick={async () => handleClick("advanced")}
          >
            Advanced
          </button>
          <button
            type="button"
            className="block border border-yellow-500 rounded-md text-yellow-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={async () => handleClick("professional")}
          >
            Professional
          </button>
          <button
            type="button"
            className="block border border-red-600 rounded-md text-red-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={async () => handleClick("expert")}
          >
            Expert
          </button>
        </div>
        {puzzle ? (
          <div>
            {puzzle.url ? (
              <div>
                <div>
                  I&apos;ve selected{" "}
                  <a
                    href={puzzle.url}
                    target="_blank"
                    className={
                      (complexityColor[complexity] ?? "") + " font-bold"
                    }
                  >
                    {puzzle.year} day {puzzle.day}
                  </a>{" "}
                  for you.
                </div>
                <div className="text-sm">
                  (complexity score: {puzzle.complexity};{" "}
                  {puzzle.noSolutionDiff == 0 ? (
                    <span>it has the average number of solutions</span>
                  ) : (
                    <span>
                      it has {Math.abs(puzzle.noSolutionDiff)}{" "}
                      {puzzle.noSolutionDiff < 0 ? "more" : "less"} solutions
                      than average
                    </span>
                  )}
                  )
                </div>
                <div className="pt-4">
                  <a
                    className="underline text-sky-500"
                    href={puzzle.url}
                    target="_blank"
                  >
                    Take me to it!
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  Looking for {complexity} puzzles; examining: {puzzle.year} day{" "}
                  {puzzle.day}.
                </div>
                <div className="text-sm">&nbsp;</div>
                <div className="pt-4">&nbsp;</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div>
              <div>&nbsp;</div>
              <div className="text-sm">&nbsp;</div>
              <div className="pt-4">&nbsp;</div>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm">
        <div>
          Please note that some puzzles in the advent of code are follow-ups to
          puzzles from a previous day. Those puzzles often expect you to extend
          on the solution from that day. Be aware that the backstory that Eric
          writes for the puzzles always suggests that there is a continuation.
          That might be true for the backstory, but is most often not the case
          for the puzzles themselves. So read carefully.
        </div>
        <div className="pt-2">
          If you happen to run into such a puzzle then please come back here and
          press your favorite button again for a new puzzle.
        </div>
        <div className="pt-2">
          At the moment I haven&apos;t implemented a check for these follow-up
          puzzles. If you want to add the then please go ahead and submit a PR.
          More info on the colophon page.
        </div>
      </div>
      <div>
        <Link href="colophon" className="underline text-lime-400">
          Colophon
        </Link>
      </div>
    </main>
  );
}

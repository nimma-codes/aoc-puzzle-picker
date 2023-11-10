"use client";

import { Puzzle, getRandomPuzzle } from "@/puzzles";
import { getRandom } from "@/utils";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const years = [2018, 2019, 2020, 2021, 2022];
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleClick = async (name: string) => {
    const puzzle: Puzzle = {
      url: "",
      name: "",
      year: 0,
      day: 0,
      complexity: 0,
      noSolution: 0,
    };

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
        <div className="text-lime-500 text-2xl font-bold">
          Pick a complexity
        </div>
        <div className="flex flex-row gap-4 py-8">
          <button
            type="button"
            className="block border border-sky-500 rounded-md text-sky-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={async () => handleClick("c1")}
          >
            Easy
          </button>
          <button
            type="button"
            className="block border border-lime-600 rounded-md text-lime-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            onClick={async () => handleClick("c2")}
          >
            Advanced
          </button>
          <button
            type="button"
            className="block border border-yellow-500 rounded-md text-yellow-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={async () => handleClick("c3")}
          >
            Professional
          </button>
          <button
            type="button"
            className="block border border-red-600 rounded-md text-red-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={async () => handleClick("c4")}
          >
            Expert
          </button>
        </div>
        {puzzle && (
          <div>
            {puzzle.url ? (
              <div>
                I&apos;ve selected{" "}
                <a
                  href={puzzle.url}
                  target="_blank"
                  className="text-lime-600 font-bold"
                >
                  {puzzle.year} day {puzzle.day}
                </a>{" "}
                for you.
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
                Examining: {puzzle.year} day {puzzle.day}.{" "}
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <Link href="colophon" className="underline text-lime-400">Colophon</Link>
      </div>
    </main>
  );
}

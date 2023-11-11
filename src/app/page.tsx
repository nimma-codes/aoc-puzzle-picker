"use client";

import { Complexities, Puzzle, getRandomPuzzle } from "@/puzzles";
import { getRandom } from "@/utils";
import Link from "next/link";
import { useState } from "react";
import QRCode from "react-qr-code";
import colors from "tailwindcss/colors";

const complexityQrColor: Record<Complexities, string> = {
  beginner: colors.sky[500],
  intermediate: colors.lime[600],
  advanced: colors.yellow[500],
  nightmare: colors.red[600],
};

const complexityColor: Record<Complexities, string> = {
  beginner: "text-sky-500",
  intermediate: "text-lime-600",
  advanced: "text-yellow-500",
  nightmare: "text-red-600",
};

export default function Home() {
  const [puzzle, setPuzzle] = useState<Puzzle>();
  const [complexity, setComplexity] = useState<Complexities>();
  const availableYears = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
  const days = Array.from({ length: 25 }, (_, i) => i + 1);

  const [years, setYears] = useState([
    2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ]);

  const toggleYear = (year: number) => {
    years.includes(year)
      ? setYears(years.filter((y) => y !== year))
      : setYears([year, ...years]);
  };

  const handleClick = async (name: Complexities) => {
    setComplexity(name);
    const puzzle: Puzzle = {
      url: "",
      name: "",
      year: 0,
      day: 0,
      complexity: 0,
      noSolutionDiff: 0,
    };
    const yearsToConsider = years.length ? years : availableYears;

    setPuzzle(puzzle);

    const incrementTime = 150;

    let timer = setInterval(() => {
      const year = getRandom(yearsToConsider);
      const day = getRandom(days);
      setPuzzle({ ...puzzle, year, day });
    }, incrementTime);

    setTimeout(async () => {
      clearInterval(timer);

      setPuzzle(await getRandomPuzzle(name, yearsToConsider));
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col justify-between p-4 md:p-16 lg:py-24 lg:px-48">
      <div>
        <div className="text-3xl font-bold pb-8 md:pb-16">
          Advent of Code Random Puzzle Picker
        </div>
        <div className="text-xl font-bold">Pick a complexity and years</div>
        <div className="flex gap-1 flex-row flex-wrap md:gap-2 pt-8 opacity-100 hover:opacity-100">
          {availableYears.map((y) => (
            <button
              key={y}
              type="button"
              className={`
                ${
                  years.includes(y)
                    ? "bg-gray-400 text-black border-gray-900"
                    : "bg-gray-900 text-gray-400 border-gray-400"
                }
                block border rounded-md px-2 py-1 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-600`}
              onClick={() => toggleYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 pt-4 pb-16">
          <button
            type="button"
            className="block border border-sky-500 rounded-md text-sky-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            onClick={async () => handleClick("beginner")}
          >
            Beginner
          </button>
          <button
            type="button"
            className="block border border-lime-600 rounded-md text-lime-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
            onClick={async () => handleClick("intermediate")}
          >
            Intermediate
          </button>
          <button
            type="button"
            className="block border border-yellow-500 rounded-md text-yellow-500 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
            onClick={async () => handleClick("advanced")}
          >
            Advanced
          </button>
          <button
            type="button"
            className="block border border-red-600 rounded-md text-red-600 px-3.5 py-2.5 text-lg font-semibold hover:text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={async () => handleClick("nightmare")}
          >
            Nightmare
          </button>
        </div>
        {puzzle && (
          <div>
            {puzzle.url ? (
              <div>
                <div>
                  I&apos;ve selected{" "}
                  <a
                    href={puzzle.url}
                    target="_blank"
                    className={
                      (complexity ? complexityColor[complexity] : "") +
                      " font-bold"
                    }
                  >
                    {puzzle.year} day {puzzle.day}
                  </a>{" "}
                  for you.
                </div>
                <div className="text-sm pt-2">
                  (complexity score: {puzzle.complexity};{" "}
                  {puzzle.noSolutionDiff == 0 ? (
                    <span>
                      the average number of people have submitted a solution
                    </span>
                  ) : (
                    <span>
                      {Math.abs(puzzle.noSolutionDiff)}{" "}
                      {puzzle.noSolutionDiff < 0 ? "more" : "less"} people have
                      submitted a solution than average
                    </span>
                  )}
                  )
                </div>
                <div className="pt-8 text-2xl">
                  <a
                    className={
                      (complexity ? complexityColor[complexity] : "") +
                      " underline"
                    }
                    href={puzzle.url}
                    target="_blank"
                  >
                    Take me to it!
                    <div className="h-[200px] w-[200px] text-sky-500 pt-4">
                      <QRCode
                        size={200}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        fgColor="#0f0f23"
                        bgColor={
                          complexity ? complexityQrColor[complexity] : "#fffff"
                        }
                        value={puzzle.url}
                        viewBox={`0 0 200 200`}
                      />
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  Looking for {complexity} puzzles; examining: {puzzle.year} day{" "}
                  {puzzle.day}.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 items-end justify-between pt-16">
        <Link href="about" className="underline">
          About
        </Link>
        {/* This is only a simple AoC tribute site, let's not do extremely heavy image optimization (at higher hosting costs). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="opacity-25 hidden sm:inline-block mt-[-200px]"
          src="qr-url-to-prod.png"
          alt="QR code linking to https://aoc.nimma.codes"
        />
      </div>
    </main>
  );
}

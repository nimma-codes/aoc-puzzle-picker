import Link from "next/link";

export default function Colophon() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-48">
      <div>
        <div className="text-lime-500 text-2xl font-bold py-2">Colophon</div>
        <div>
          This site was created by{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/jeroenhuinink/"
            className="underline text-sky-500"
          >
            Jeroen Huinink
          </a>{" "}
          for the{" "}
          <a
            target="_blank"
            className="underline text-sky-500"
            href="https://nimma.codes"
          >
            Nimma.codes
          </a>{" "}
          Advent-of-code Dojo in December 2023
        </div>
        <div>
          This site uses data from{" "}
          <a
            href="https://github.com/mevdschee/aoc-stats"
            target="_blank"
            className="underline text-sky-500"
          >
            https://github.com/mevdschee/aoc-stats
          </a>
        </div>
        <div>The source for this repo can be found on Github</div>
        <div className="py-8">
          <Link className="underline text-lime-400" href="/">Back</Link>
        </div>
      </div>
    </main>
  );
}

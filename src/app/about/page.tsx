import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col justify-between py-24 px-48">
      <div>
        <div className="text-lime-500 text-2xl font-bold py-2">About</div>
        <div className="text-sm">
          <div className="pt-8">
            We want to thank{" "}
            <a
              href="http://was.tl"
              target="_blank"
              className="underline text-sky-500"
            >
              Eric Wastl
            </a>{" "}
            for creating the{" "}
            <a
              target="_blank"
              className="underline text-sky-500"
              href="https://adventofcode.com"
            >
              Advent of Code
            </a>
            , one of the most fun programming events of the year.
          </div>
          <div className="pt-8">
            <div>
              Please note that some puzzles in the advent of code are follow-ups
              to puzzles from a previous day. Those puzzles often expect you to
              extend on the solution from that day. Be aware that the backstory
              that Eric writes for the puzzles always suggests that there is a
              continuation. That might be true for the backstory, but is most
              often not the case for the puzzles themselves. So read carefully.
            </div>
            <div className="pt-2">
              If you happen to run into such a puzzle then please come back here
              and press your favorite button again for a new puzzle.
            </div>
            <div className="pt-2">
              At the moment I haven&apos;t implemented a check for these
              follow-up puzzles. If you want to add the then please go ahead and
              submit a PR.
            </div>
          </div>
          <div className="pt-8">
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
            Advent-of-code Dojo in{" "}
            <a
              href="https://www.meetup.com/nimma-codes-meetup-group/events/296183299/"
              className="underline text-sky-500"
              target="_blank"
            >
              December 2023
            </a>
            , using Nextjs, Tailwindcss and Github pages for hosting.
          </div>
          <div className="pt-2">
            The source for this repo can be found on{" "}
            <a
              href="https://github.com/nimma-codes/aoc-puzzle-picker"
              target="_blank"
              className="underline text-sky-500"
            >
              Github
            </a>
            .
          </div>
          <div className="pt-8">
            <p>
              This site uses data from{" "}
              <a
                href="https://github.com/mevdschee/aoc-stats"
                target="_blank"
                className="underline text-sky-500"
              >
                https://github.com/mevdschee/aoc-stats
              </a>
              . Maurits created a tool that collects data from the advent of
              code and visualizes that. I have grabbed the file{" "}
              <a
                href="https://github.com/mevdschee/aoc-stats/blob/master/output/medals.json"
                target="_blank"
                className="underline text-sky-500"
              >
                medals.json
              </a>{" "}
              from his repo and used this data to calculate the puzzle
              complexity.
            </p>
            <p className="pt-2">
              The data in the file shows the time it took the top 100
              participants on the global leaderboard to collect the two medals
              for every day, if they made it that day. I calculate the
              complexity as the sum of the average score for the first medal and
              the average score for the second medal.
            </p>
            <p className="pt-2">
              We can of course debate whether this is the best way to assess the
              complexity, but hey, this is just for fun. And if my method really
              annoys you, feel free to submit a PR with an alternative
              algorithm. (See above for the link to the repo).
            </p>
          </div>
        </div>
        <div className="pt-16">
          <Link className="underline text-lime-400" href="/">
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}

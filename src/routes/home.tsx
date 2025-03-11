import questions from "@/questions.json";
import type { FC } from "hono/jsx";

export const Home: FC = () => {
	return (
		<>
			<h1 className="font-bold text-2xl">CMU Purity Test</h1>
			<p>Have you ever...</p>
			<ol className="list-decimal pl-5">
				{questions.map((question) => (
					<li key={question}>
						<label className="inline-flex gap-2">
							<input type="checkbox" className="size-4" />
							<span>{question}</span>
						</label>
					</li>
				))}
			</ol>
		</>
	);
};

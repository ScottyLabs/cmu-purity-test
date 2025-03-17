import questions from "@/questions.json";
import type { FC } from "hono/jsx";

export const Result: FC<{ score: number }> = ({ score }) => {
	return (
		<div class="py-4">
			<h2 class="text-2xl font-bold text-center">
				Your score: <span class="text-[#A6192E]">{score}%</span>
			</h2>

			<div class="w-full bg-gray-100 rounded-full h-2.5 my-6">
				<div
					class="h-full bg-[#A6192E] rounded-full transition-all duration-700 ease-out"
					style={{ width: `${score}%` }}
				/>
			</div>

			<p class="text-gray-600 text-center mb-6">
				Give them a comment based on their score here
			</p>

			<div class="text-center">
				<button
					type="button"
					class="text-[#A6192E] hover:underline cursor-pointer transition-all"
					hx-get="/api/reset"
					hx-target="body"
					hx-swap="innerHTML"
				>
					Take again
				</button>
			</div>
		</div>
	);
};

export const Questions: FC = () => {
	return (
		<>
			<div class="w-full h-screen flex flex-col">
				<div class="bg-[#A6192E] text-white py-6 px-8">
					<h1 class="text-2xl font-bold">CMU Purity Test</h1>
					<p class="mt-1 text-white/90 text-sm">
						This is a spin-off of the classic Rice Purity Test,
						adapted for CMU students. Click on every item you've
						done.
					</p>
				</div>

				<div class="flex-1 py-6 px-8 bg-white">
					<div id="test-container">
						<p class="mb-4 text-gray-700 font-medium">
							Have you ever...
						</p>
						<div class="mb-8">
							{questions.map((question, index) => (
								<div
									key={question}
									class="flex items-center py-1.5"
								>
									<span class="w-6 text-right text-sm text-gray-500">
										{index + 1}.
									</span>
									<div class="ml-3 flex items-center">
										<input
											type="checkbox"
											id={`question-${index}`}
											name="index"
											value={index}
											class="h-4 w-4 rounded border-gray-300 text-[#A6192E] focus:ring-[#A6192E] cursor-pointer"
											hx-post="/api/toggle-item"
											hx-trigger="change"
											hx-swap="none"
										/>
										<label
											for={`question-${index}`}
											class="ml-2.5 text-sm text-gray-700 cursor-pointer"
										>
											{question}
										</label>
									</div>
								</div>
							))}
						</div>

						<div class="flex justify-end">
							<button
								type="button"
								class="bg-[#A6192E] text-white px-4 py-1.5 text-sm rounded cursor-pointer"
								hx-post="/api/calculate-score"
								hx-target="#test-container"
								hx-swap="innerHTML"
							>
								Calculate score
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

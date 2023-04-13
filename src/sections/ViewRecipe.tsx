import { IReceivedRecipe, TMacro } from "../Types";

interface IViewRecipe {
	recipe: IReceivedRecipe;
	handleExitClick: () => void;
}

function macroUnits(macroName: string) {
	if (macroName === "protein" || macroName === "fat") {
		return "g";
	} else if (macroName === "calories") {
		return "cals";
	} else return;
}

export function ViewRecipe({ recipe, handleExitClick }: IViewRecipe) {
	return (
		<>
			{recipe ? (
				<div className="absolute col-span-3 h-[768px] w-3/5 border border-neutral-400 bg-neutral-900 py-4 px-6">
					<div className="mb-4 ml-6 flex items-center gap-4">
						<button
							onClick={handleExitClick}
							className="border border-neutral-400 bg-black px-4 py-2 text-lg font-semibold transition-all duration-300 hover:border-red-500 hover:text-red-500"
						>
							X
						</button>
					</div>

					<div className="grid grid-cols-2 grid-rows-2">
						<div className="">
							<div className="h-96 w-96 bg-black pl-6"></div>
						</div>
						<div className="row-span-2 w-96 px-6">
							<p className="mb-2">ID: {recipe.id}</p>
							<h2 className="text-2xl font-bold">{recipe.name}</h2>
							<p className="mb-2">Prep Time: {recipe.duration} Minutes</p>
							{recipe.macros ? (
								<div className="flex gap-1">
									{recipe.macros.map((macro, i) => (
										<div key={i} className="">
											{Object.entries(macro).map(([key, value], i) => (
												<div
													key={i}
													className="mb-1 flex w-min gap-x-1 rounded-md border border-orange-400 py-1 px-2"
												>
													<p className="">{key}: </p>
													<div className="flex">
														<p>{value}</p>
														{macroUnits(key)}
													</div>
												</div>
											))}
										</div>
									))}
								</div>
							) : (
								<></>
							)}

							<ul className="my-2 flex flex-wrap gap-1">
								{recipe.tags.map((tag, i) => (
									<li
										key={i}
										className="w-min whitespace-nowrap rounded-md border border-blue-400 py-1 px-2"
									>
										{tag}
									</li>
								))}
							</ul>
							<h3 className="mb-4 text-xl font-semibold">
								{recipe.description}
							</h3>
							{recipe.instructions ? (
								<ol className="">
									{recipe.instructions.map((step, i) => (
										<li key={i} className="flex gap-x-1">
											<p className="">{i + 1}:</p>
											<p>{step}</p>
										</li>
									))}
								</ol>
							) : (
								<></>
							)}
						</div>

						<div className="flex gap-8 p-6">
							<ul className="mb-2 flex flex-col">
								<p className="font-bold">Ingredients:</p>
								{recipe.ingredients.map((ingredient, i) => (
									<li key={i} className="">
										{ingredient}
									</li>
								))}
							</ul>
							<ul>
								<p className="font-bold">Seasonings:</p>
								{recipe.seasoning.map((seasoning, i) => (
									<li key={i}>{seasoning}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

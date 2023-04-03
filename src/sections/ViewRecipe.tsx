import { IReceivedRecipe } from "../Types";
import ChickenPhoto from "../assets/IMG_5591.jpg";

interface IViewRecipe {
	recipe: IReceivedRecipe | undefined;
	handleExitClick: () => void;
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
							<div className="h-96 w-96 pl-6">
								<img src={ChickenPhoto} />
							</div>
						</div>
						<div className="row-span-2 w-96 px-6">
							<p className="mb-2">ID: {recipe.id}</p>
							<h2 className="text-2xl font-bold">{recipe.name}</h2>
							<p className="mb-2">Prep Time: {recipe.duration} Minutes</p>
							<h3 className="mb-4 text-xl font-semibold">
								{recipe.description}
							</h3>
							<ul className="mb-4 flex flex-wrap gap-1">
								{recipe.tags.map((tag, i) => (
									<li
										key={i}
										className="w-min whitespace-nowrap rounded-md border border-blue-400 py-1 px-2"
									>
										{tag}
									</li>
								))}
							</ul>
							<h4 className="text-lg font-bold">Instructions:</h4>
							<p className="whitespace-wrap">1. Organize ingredients</p>
							<p className="whitespace-wrap">2. Prepare ingredients</p>
							<p className="whitespace-wrap">3. Mix seasonings</p>
							<p className="whitespace-wrap">4. Cook food</p>
							<p className="whitespace-wrap">5. Eat!</p>
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

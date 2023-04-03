import { IExploreRecipes, IReceivedRecipe } from "../Types";

interface IExplore {
	exploreRecipes: IExploreRecipes;
}

export function Explore({ exploreRecipes }: IExplore) {
	return (
		<>
			<h2 className="mx-auto mb-4 flex w-3/5 text-3xl font-semibold">
				Explore
			</h2>
			<div className="mx-auto grid w-3/5 grid-cols-3 grid-rows-3 gap-4">
				{exploreRecipes ? (
					exploreRecipes.value.map((recipe, i) => (
						<div
							key={i}
							className="flex h-64 flex-col justify-end rounded-md border border-white bg-red-500"
						>
							<div className="bg-gradient-to-t from-neutral-800 to-transparent py-4 px-4 pt-2">
								<h3 className="mb-2 text-2xl font-bold">{recipe.name}</h3>
								<p className="text-xs">{recipe.id}</p>
							</div>
						</div>
					))
				) : (
					<></>
				)}
			</div>
		</>
	);
}

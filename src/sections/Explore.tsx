import { IExploreRecipes, IReceivedRecipe } from "../Types";
import { useState } from "react";
import { ViewRecipe } from "./ViewRecipe";
interface IExplore {
	exploreRecipes: IExploreRecipes;
}

export function Explore({ exploreRecipes }: IExplore) {
	const [focusedView, setFocusedView] = useState<boolean>(false);
	const [focusedRecipe, setFocusedRecipe] = useState<IReceivedRecipe>();

	function handleExitClick() {
		setFocusedView(false);
	}

	return (
		<>
			<div className="mx-auto grid w-3/5 grid-cols-3 grid-rows-3">
				{exploreRecipes ? (
					exploreRecipes.value.map((recipe, i) => (
						<div
							key={i}
							className={`flex h-64 flex-col justify-end border border-black bg-red-500 transition-all duration-300 hover:cursor-pointer hover:border-white`}
							onClick={() => {
								setFocusedView(true);
								setFocusedRecipe(recipe);
							}}
						>
							<div className="bg-gradient-to-t from-neutral-800 to-transparent py-4 px-4 pt-2">
								<h3 className="mb-2 text-xl font-bold">{recipe.name}</h3>
								<p className="text-xs">{recipe.id}</p>
							</div>
						</div>
					))
				) : (
					<></>
				)}
				{focusedView ? (
					<ViewRecipe
						recipe={focusedRecipe}
						handleExitClick={handleExitClick}
					/>
				) : (
					<></>
				)}
			</div>
		</>
	);
}

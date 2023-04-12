import { IExploreRecipes, IReceivedRecipe } from "../Types";
import { useState } from "react";
import { ViewRecipe } from "./ViewRecipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEgg,
	faBowlRice,
	faFish,
	faShrimp,
	faDrumstickBite,
	faSeedling,
	faIceCream,
	faAppleWhole,
	faCookieBite,
	faCubesStacked,
	faPepperHot,
	faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
interface IExplore {
	exploreRecipes: IExploreRecipes;
}

export function Explore({ exploreRecipes }: IExplore) {
	const [focusedView, setFocusedView] = useState<boolean>(false);
	const [focusedRecipe, setFocusedRecipe] = useState<IReceivedRecipe>();

	function handleExitClick() {
		setFocusedView(false);
	}

	// TO DO: create a tag -> svg function that takes a tag and will
	//	return a JSX element of its svg icon
	// 	for each tag, call the function and use the JSX icon it returns
	function getIconFromTag(tag: string | undefined) {
		if (tag === undefined || tag === "") {
			return <FontAwesomeIcon icon={faBowlFood} />;
		}
		const lowerTag = tag.toLowerCase();

		interface ITagIconMap {
			[key: string]: JSX.Element;
		}

		const tagToIconMap: ITagIconMap = {
			"egg": <FontAwesomeIcon icon={faEgg} />,
			"rice": <FontAwesomeIcon icon={faBowlRice} />,
			"fish": <FontAwesomeIcon icon={faFish} />,
			"shrimp": <FontAwesomeIcon icon={faShrimp} />,
			"chicken": <FontAwesomeIcon icon={faDrumstickBite} />,
			"vegetarian": <FontAwesomeIcon icon={faSeedling} />,
			"fruit": <FontAwesomeIcon icon={faAppleWhole} />,
			"dessert": <FontAwesomeIcon icon={faIceCream} />,
			"snack": <FontAwesomeIcon icon={faCubesStacked} />,
			"spicy": <FontAwesomeIcon icon={faPepperHot} />,
			"": <FontAwesomeIcon icon={faBowlFood} />,
		};

		return tagToIconMap[lowerTag];
	}

	return (
		<>
			<div className="mx-auto grid w-3/5 grid-cols-3 grid-rows-3">
				{exploreRecipes ? (
					exploreRecipes.value.map((recipe, i) => (
						<div
							key={i}
							className={`flex h-64 flex-col justify-between border border-neutral-500 bg-neutral-900 transition-all duration-300 hover:cursor-pointer hover:border-white`}
							onClick={() => {
								setFocusedView(true);
								setFocusedRecipe(recipe);
							}}
						>
							<div className="mt-12 flex w-full items-center justify-center text-center">
								<div className="flex w-4/5 items-center justify-center gap-2 rounded-md bg-black py-8 text-2xl">
									{getIconFromTag(recipe.tags[0])}
									{getIconFromTag(recipe.tags[1])}
									{getIconFromTag(recipe.tags[2])}
								</div>
							</div>
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

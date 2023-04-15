import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "./components/ui/Header";
import { IRecipe, IReceivedRecipe, IExploreRecipes, TPageState } from "./Types";
import { CreateRecipe } from "./sections/CreateRecipe";
import { Explore } from "./sections/Explore";
import { Loading } from "./components/ui/Loading";
import { EditRecipe } from "./sections/EditRecipe";
import RecipeRepo from "./repositories/RecipeRepo";
import { ViewRecipe } from "./sections/ViewRecipe";

function App() {
	const [exploreRecipes, setExploreRecipes] = useState<IExploreRecipes | "">(
		""
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [activePage, setActivePage] = useState<TPageState>("explore");
	const [recipe, setRecipe] = useState<IReceivedRecipe>();

	const recipeRepo = new RecipeRepo();

	useEffect(() => {
		fetchExploreRecipes();
	}, []);

	async function fetchExploreRecipes() {
		const response = await recipeRepo.exploreRecipes();
		setExploreRecipes(response);
		setLoading(false);
	}

	// Create
	async function handleCreateRecipe(newRecipeData: IRecipe) {
		const response = await recipeRepo.sendRecipe(newRecipeData);
		setActivePage("explore");
	}

	// Read
	async function handleGetRecipe(id: string) {
		const response = await recipeRepo.getRecipe(id);
		handleChangePage("view");
		console.log(response);
		setRecipe(response);
	}

	// Upsert
	async function handleUpsertRecipe(recipe: IReceivedRecipe) {
		const response = await recipeRepo.updateRecipe(recipe);
		console.log(response);
	}

	// Delete
	async function handleDeleteRecipe(id: string) {
		const response = await recipeRepo.deleteRecipe(id);
		console.log(response);
	}

	function handleChangePage(pageName: TPageState) {
		setActivePage(pageName);
	}

	const PageNotFound = () => {
		return <div>Page not found!</div>;
	};

	let content = <PageNotFound />;

	if (activePage === "explore" && exploreRecipes !== "") {
		content = <Explore exploreRecipes={exploreRecipes} />;
	} else if (activePage === "view") {
		content = (
			<ViewRecipe
				recipe={recipe}
				handleExitClick={() => handleChangePage("explore")}
			/>
		);
	} else if (activePage === "create") {
		content = <CreateRecipe createRecipeForm={handleCreateRecipe} />;
	} else if (activePage === "edit") {
		// TO DO: update to pass errors props if the updateRecipe has invalid data
		// TO DO: complete the change to using recipeHandlers once ability to click
		//	on and target YOUR recipes is complete(after auth added)
		content = (
			<EditRecipe
				recipe={recipe}
				handleRecipeUpdate={(recipeData) => {
					// updateRecipe(recipeData);
					handleUpsertRecipe(recipeData);
				}}
				handleRecipeDelete={(id) => {
					// deleteRecipe(id);
					handleDeleteRecipe(id);
				}}
			/>
		);
	}

	return (
		<div className="h-screen w-screen bg-neutral-900 text-white">
			<div>
				<Header
					changePage={(pageName) => handleChangePage(pageName)}
					getById={(id) => handleGetRecipe(id)}
				/>
				<section className="w-screeen flex h-screen flex-col items-center justify-center">
					{loading ? <Loading /> : <>{content}</>}
				</section>
			</div>
		</div>
	);
}

export default App;

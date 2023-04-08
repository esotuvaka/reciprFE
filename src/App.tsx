import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Header } from "./components/ui/Header";
import { IRecipe, IReceivedRecipe, IExploreRecipes, TPageState } from "./Types";
import { CreateRecipe } from "./sections/CreateRecipe";
import { Explore } from "./sections/Explore";
import { Loading } from "./components/ui/Loading";
import { EditRecipe } from "./sections/EditRecipe";
import RecipeRepo from "./repositories/RecipeRepo";

function App() {
	const [exploreRecipes, setExploreRecipes] = useState<IExploreRecipes | "">(
		""
	);
	const [loading, setLoading] = useState<boolean>(true);

	const [activePage, setActivePage] = useState<TPageState>("explore");

	const [recipe, setRecipe] = useState<IReceivedRecipe>();

	const BACKEND = import.meta.env.VITE_BACKEND_URL;
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
		// setRecipe(response.data);
		setActivePage("explore");
	}

	// Read
	async function handleGetRecipe(id: string) {
		const response = await recipeRepo.getRecipe(id);
		// TO DO: once the recipe is received, set it to state and use somewhere
	}

	// // Read
	// function getRecipe(id: string) {
	// 	axios
	// 		.get(`${BACKEND}/${id}`)
	// 		.then((response) => {
	// 			setRecipe(response.data);
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	// Upsert
	async function handleUpsertRecipe(recipe: IReceivedRecipe) {
		const response = await recipeRepo.updateRecipe(recipe);
		console.log(response);
	}

	// // Upsert
	// function updateRecipe(recipeData: IReceivedRecipe) {
	// 	axios
	// 		.put(`${BACKEND}/${recipeData.id}`, recipeData, {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		})
	// 		.then((response) => {
	// 			console.log("Successfully updated recipe: " + response.status);
	// 			console.log(response);
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	// Delete
	async function handleDeleteRecipe(id: string) {
		const response = await recipeRepo.deleteRecipe(id);
		console.log(response);
	}

	// // Delete
	// function deleteRecipe(id: string) {
	// 	axios
	// 		.delete(`${BACKEND}/${id}`)
	// 		.then((response) => {
	// 			console.log("Successfully delete recipe: ");
	// 			console.log(response);
	// 		})
	// 		.then((error) => console.log(error));
	// }

	function handleChangePage(pageName: TPageState) {
		setActivePage(pageName);
	}

	const PageNotFound = () => {
		return <div>Page not found!</div>;
	};

	let content = <PageNotFound />;

	if (activePage === "explore" && exploreRecipes !== "") {
		content = <Explore exploreRecipes={exploreRecipes} />;
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
				<Header changePage={(pageName) => handleChangePage(pageName)} />
				<section className="w-screeen flex h-screen flex-col items-center justify-center">
					{loading ? <Loading /> : <>{content}</>}
				</section>
			</div>
		</div>
	);
}

export default App;

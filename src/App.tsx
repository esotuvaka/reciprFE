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

	// Create
	function sendRecipe(createRecipeData: IRecipe) {
		axios
			.post(`${BACKEND}`, createRecipeData)
			.then((response) => {
				setRecipe(response.data);
				setActivePage("edit");
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}

	// Read
	function getRecipe(id: string) {
		axios
			.get(`${BACKEND}/${id}`)
			.then((response) => {
				setRecipe(response.data);
			})
			.catch((error) => console.log(error));
	}

	// Upsert
	function updateRecipe(recipeData: IReceivedRecipe) {
		axios
			.put(`${BACKEND}/${recipeData.id}`, recipeData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log("Successfully updated recipe: " + response.status);
				console.log(response);
			})
			.catch((error) => console.log(error));
	}

	// Delete
	function deleteRecipe(id: string) {
		axios
			.delete(`${BACKEND}/${id}`)
			.then((response) => {
				console.log("Successfully delete recipe: ");
				console.log(response);
			})
			.then((error) => console.log(error));
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
	} else if (activePage === "create") {
		content = <CreateRecipe createRecipeForm={handleCreateRecipe} />;
	} else if (activePage === "edit") {
		// TO DO: Update to pass errors props if the updateRecipe has invalid data
		content = (
			<EditRecipe
				recipe={recipe}
				handleRecipeUpdate={(recipeData) => {
					updateRecipe(recipeData);
				}}
				handleRecipeDelete={(id) => deleteRecipe(id)}
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

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ChickenPhoto from "./assets/IMG_5591.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Header } from "./components/ui/Header";
import { IRecipe, IReceivedRecipe, IExploreRecipes, TPageState } from "./Types";
import { CreateRecipe } from "./sections/CreateRecipe";
import { Explore } from "./sections/Explore";
import { Loading } from "./components/ui/Loading";
import { EditRecipe } from "./sections/EditRecipe";

function App() {
	const [exploreRecipes, setExploreRecipes] = useState<IExploreRecipes | "">(
		""
	);
	const [loading, setLoading] = useState<boolean>(true);

	const [activePage, setActivePage] = useState<TPageState>("explore");

	const [recipe, setRecipe] = useState<IReceivedRecipe>();

	const BACKEND = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		fetchRecipes();
	}, []);

	async function fetchRecipes() {
		try {
			const response = await axios.get(`${BACKEND}/explore`);
			const data = response.data;
			console.log(response);
			setExploreRecipes(data.value);
			console.log(data.value);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
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

	function handleRecipeSubmit(data: IRecipe) {
		sendRecipe(data);
	}

	const PageNotFound = () => {
		return <div>Page not found!</div>;
	};

	let content = <PageNotFound />;

	if (activePage === "explore" && exploreRecipes !== "") {
		content = <Explore exploreRecipes={exploreRecipes} />;
	} else if (activePage === "create") {
		content = <CreateRecipe createRecipeForm={handleRecipeSubmit} />;
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

	function handleChangePage(pageName: TPageState) {
		setActivePage(pageName);
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

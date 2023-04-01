import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ChickenPhoto from "./assets/IMG_5591.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Header } from "./components/ui/Header";
import { IRecipe, IReceivedRecipe, IExploreRecipes } from "./Types";
import { CreateRecipe } from "./sections/CreateRecipe";
import { Explore } from "./sections/Explore";

function App() {
	const [exploreRecipes, setExploreRecipes] = useState<IExploreRecipes | "">(
		""
	);
	const [loading, setLoading] = useState<boolean>(true);

	const [recipe, setRecipe] = useState<IReceivedRecipe | null>();

	const [showEditModal, setShowEditModal] = useState<boolean>(false);
	const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

	const [editName, setEditName] = useState<string>("");
	const [editDuration, setEditDuration] = useState<number>(0);
	const [editDescription, setEditDescription] = useState<string>("");
	const [editTags, setEditTags] = useState<Array<string>>([""]);
	const [editIngredients, setEditIngredients] = useState<Array<string>>([""]);
	const [editSeasoning, setEditSeasoning] = useState<Array<string>>([""]);

	const BACKEND = import.meta.env.VITE_BACKEND_URL;

	// Whenever the recipe changes and isn't null,
	//	set the editModal placeholders to the recipe data
	useEffect(() => {
		if (recipe) {
			setEditName(recipe.name);
			setEditDescription(recipe.description);
			setEditDuration(recipe.duration);
			setEditTags(recipe.tags);
			setEditIngredients(recipe.ingredients);
			setEditSeasoning(recipe.seasoning);
		}
	}, [recipe]);

	useEffect(() => {
		fetchRecipes();
	}, []);

	async function fetchRecipes() {
		try {
			const response = await axios.get(`${BACKEND}/explore`);
			const data = response.data;
			setExploreRecipes(data.value);
			console.log(data.value);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	}

	const handleShowEditModal = () => setShowEditModal(true);
	const handleHideEditModal = () => setShowEditModal(false);

	const handleShowConfirmModal = () => setShowConfirmModal(true);
	const handleHideConfirmModal = () => setShowConfirmModal(false);

	// Create
	function sendRecipe(createRecipeData: IRecipe) {
		axios
			.post(`${BACKEND}`, createRecipeData)
			.then((response) => {
				setRecipe(response.data);
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
	function updateRecipe(id: string) {
		const data = {
			"name": editName,
			"description": editDescription,
			"duration": editDuration,
			"tags": editTags,
			"ingredients": editIngredients,
			"seasoning": editSeasoning,
		};

		axios
			.put(`${BACKEND}/${id}`, data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				console.log("Successfully updated recipe: " + response.status);
				console.log(response);

				// Modifying state here via these functions forces a rerender
				//	so recipe Data is always synchronized
				getRecipe(id);
				clear();
				handleHideEditModal();
			})
			.catch((error) => console.log(error));
	}

	// Delete
	function deleteRecipe(id: string) {
		setRecipe(null);
		axios
			.delete(`${BACKEND}/${id}`)
			.then((response) => {
				console.log("Successfully delete recipe: ");
				console.log(response);
			})
			.then((error) => console.log(error));
	}

	function handleEditStringToArray(stringItems: string, arrayName: string) {
		const stringArray = stringItems.split(", ");

		switch (arrayName) {
			case "tags":
				setEditTags(stringArray);
				break;
			case "ingredients":
				setEditIngredients(stringArray);
				break;
			case "seasoning":
				setEditSeasoning(stringArray);
				break;
		}
	}

	function handleRecipeSubmit(data: IRecipe) {
		sendRecipe(data);
	}

	function clear() {
		setEditName("");
		setEditDuration(0);
		setEditDescription("");
		setEditTags([""]);
		setEditIngredients([""]);
		setEditSeasoning([""]);
	}

	return (
		<div className="h-screen w-screen bg-neutral-900 text-white">
			<div className="">
				<Header />
				<section className="w-screeen flex h-screen flex-col items-center justify-center">
					{loading ? (
						<></>
					) : (
						<>
							{exploreRecipes !== "" ? (
								<Explore exploreRecipes={exploreRecipes} />
							) : (
								<></>
								// <CreateRecipe createRecipeForm={handleRecipeSubmit} />
							)}
						</>
					)}

					<div className="">
						{recipe ? (
							<div className="rounded-md border border-white py-4 px-6">
								<p className="mb-2">ID: {recipe.id}</p>

								<div className="grid grid-cols-2 grid-rows-2">
									<div>
										<div className="h-96 w-96 pl-6">
											<img src={ChickenPhoto} />
										</div>
									</div>
									<div className="row-span-2 w-96 px-6">
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
										{/* <div className="ml-2 flex flex-col gap-2">
											<p className="align-middle">
												<FontAwesomeIcon
													icon={faHeart}
													className="mr-1 h-5 w-5 text-red-500"
												/>
												1,234
											</p>
											<p className="align-middle">
												<FontAwesomeIcon
													icon={faBookmark}
													className="mr-1 h-5 w-5 text-neutral-300"
												/>
												321
											</p>
										</div> */}
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

								<div className="my-4 flex items-center justify-center gap-4">
									<div className="">
										<button
											className="rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-white"
											onClick={() => handleShowEditModal()}
										>
											EDIT THIS RECIPE
										</button>
									</div>
									<div className="">
										<button
											className="rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-red-500"
											onClick={() => handleShowConfirmModal()}
										>
											DELETE THIS RECIPE
										</button>
									</div>
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
				</section>
				{showEditModal ? (
					<div className="absolute top-0 z-10 h-screen w-screen bg-black/50">
						<div className="flex h-screen items-center justify-center">
							<div className="flex flex-col rounded-md border bg-black">
								<h2 className="px-6 pt-4 text-3xl">Editing Recipe</h2>
								<div className="flex flex-col py-2 px-6">
									<label>Name</label>
									<input
										type="text"
										name="editName"
										id="editName"
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										className="w-96 rounded-md border border-neutral-400 bg-black px-2"
										placeholder={`${recipe!.name}`}
									/>
								</div>
								<div className="flex flex-col bg-black py-2 px-6">
									<label>Time to prepare (in minutes)</label>
									<input
										type="text"
										name="editName"
										id="editName"
										value={editDuration}
										onChange={(e) => setEditDuration(parseInt(e.target.value))}
										className="w-96 rounded-md border border-neutral-400 bg-black px-2"
										placeholder={`${recipe!.duration}`}
									/>
								</div>
								<div className="flex flex-col bg-black py-2 px-6">
									<label>Description</label>
									<textarea
										rows={3}
										name="editName"
										id="editName"
										value={editDescription}
										onChange={(e) => setEditDescription(e.target.value)}
										className="w-96 rounded-md border border-neutral-400 bg-black px-2"
										placeholder={`${recipe!.description}`}
									/>
								</div>
								<div>
									<p className="mt-4 w-96 px-6">
										Separate <span className="font-bold">Tags</span>,{" "}
										<span className="font-bold">Ingredients</span>, and{" "}
										<span className="font-bold">Seasonings</span> by using
										commas
									</p>
									<div className="flex flex-col bg-black py-2 px-6">
										<label>Tags</label>
										<textarea
											rows={2}
											name="editTags"
											id="editTags"
											value={editTags.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "tags")
											}
											className="w-96 rounded-md border border-neutral-400 bg-black px-2"
											placeholder={
												recipe
													? `${recipe?.tags[0]}, ${recipe?.tags[1]}, ${recipe?.tags[2]}`
													: "Edit Tags"
											}
										/>
									</div>
									<div className="flex flex-col bg-black py-2 px-6">
										<label>Ingredients</label>
										<textarea
											rows={8}
											name="editIngredients"
											id="editIngredients"
											value={editIngredients.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "ingredients")
											}
											className="w-96 rounded-md border border-neutral-400 bg-black px-2"
											placeholder={
												recipe
													? `${recipe?.ingredients[0]}, ${recipe?.ingredients[1]}, ${recipe?.ingredients[2]}, etc.`
													: "Edit Ingredients"
											}
										/>
									</div>
									<div className="flex flex-col bg-black py-2 px-6">
										<label>Seasoning</label>
										<textarea
											rows={3}
											name="editSeasoning"
											id="editSeasoning"
											value={editSeasoning.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "seasoning")
											}
											className="w-96 rounded-md border border-neutral-400 bg-black px-2"
											placeholder={
												recipe
													? `${recipe?.seasoning[0]}, ${recipe?.seasoning[1]}, ${recipe?.seasoning[2]}, etc.`
													: "Edit Seasoning"
											}
										/>
									</div>
								</div>
								<div className="mx-auto flex gap-4">
									<div className="">
										{recipe ? (
											<button
												className="mx-auto mt-4 mb-6 w-min whitespace-nowrap rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-blue-500"
												type="button"
												onClick={() => updateRecipe(recipe.id)}
											>
												Save Changes
											</button>
										) : (
											<></>
										)}
									</div>
									<div className="">
										<button
											className="mx-auto mt-4 mb-6 w-min whitespace-nowrap rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-red-500"
											type="button"
											onClick={() => handleHideEditModal()}
										>
											Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
				{showConfirmModal ? (
					<div className="absolute top-0 z-10 h-screen w-screen bg-black/50">
						<div className="flex h-screen items-center justify-center">
							<div className="flex flex-col rounded-lg border border-white bg-black px-6 py-4">
								<p className="text-2xl">
									Are you sure you want to Delete this Recipe?
								</p>
								<p>(Deleting can't be undone!)</p>
								<div className="mx-auto flex gap-4">
									{recipe ? (
										<button
											className="mt-4 mb-6 w-min whitespace-nowrap rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-blue-500"
											type="button"
											onClick={() => {
												handleHideConfirmModal();
												deleteRecipe(recipe.id);
											}}
										>
											Confirm
										</button>
									) : (
										<></>
									)}

									<button
										className="mt-4 mb-6 w-min whitespace-nowrap rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-red-500"
										type="button"
										onClick={() => handleHideConfirmModal()}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export default App;

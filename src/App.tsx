import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
	interface IRecipe {
		id: string;
		name: string;
		description: string;
		duration: string;
		tags: Array<string>;
		ingredients: Array<string>;
		seasoning: Array<string>;
	}

	const [recipe, setRecipe] = useState<IRecipe | null>();
	const [showEditModal, setShowEditModal] = useState<boolean>(false);

	const [editName, setEditName] = useState<string>("");
	const [editDuration, setEditDuration] = useState<string>("");
	const [editDescription, setEditDescription] = useState<string>("");

	const [editTags, setEditTags] = useState<Array<string>>([""]);
	const [editIngredients, setEditIngredients] = useState<Array<string>>([""]);
	const [editSeasoning, setEditSeasoning] = useState<Array<string>>([""]);

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

	const BACKEND = "http://localhost:5223/meals";
	const TEST_RECIPE = {
		"name": "Chicken Alfredo FROM FRONTEND",
		"description": "38g protein. That's crazy!",
		"duration": "60",
		"tags": ["Dinner", "High Protein", "Chicken"],
		"ingredients": [
			"chicken",
			"pasta",
			"garlic paste",
			"skimmed milk",
			"mozarella",
			"parsley",
		],
		"seasoning": ["garlic powder", "paprika", "salt", "black pepper"],
	};

	const handleShowModal = () => setShowEditModal(true);
	const handleHideModal = () => setShowEditModal(false);

	// Create
	function sendRecipe() {
		axios
			.post(BACKEND, TEST_RECIPE)
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
				console.log("getRecipe CALLED!");
				console.log(recipe);
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
				handleHideModal();
			})
			.catch((error) => console.log(error));
	}

	// Delete
	function handleDeleteRecipeClick(id: string) {
		setRecipe(null);
		axios
			.delete(`${BACKEND}/${id}`)
			.then((response) => console.log(response))
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

	function clear() {
		setEditName("");
		setEditDuration("");
		setEditDescription("");
	}

	return (
		<div className="h-screen w-screen bg-black text-white">
			<div className="">
				<header className="w-full fixed top-0 border-y border-neutral-400">
					<div className="mx-auto w-3/5 h-20 items-center flex justify-between">
						<a href="/">
							<h1 className="text-4xl font-bold">reciPR</h1>
						</a>
						<input
							placeholder="Search or filter by..."
							className="w-[600px] px-4 flex items-center bg-black h-10 border-neutral-400 hover:border-white duration-300 transition-all border rounded-xl"
						/>
						<div />
					</div>
				</header>
				<section className="h-screen w-screeen flex flex-col justify-center items-center">
					<div className="flex gap-4 mb-4">
						<div className="border-white border px-4 py-2 font-bold rounded-md">
							<button onClick={() => sendRecipe()}>SEND RECIPE</button>
						</div>
						{/* <div className="border-white border px-4 py-2 font-bold rounded-md">
							<button onClick={() => getRecipe(recipeID)}>GET A RECIPE</button>
						</div> */}
					</div>
					<div className="">
						{recipe ? (
							<div className="border-white border py-4 px-6 rounded-md">
								<p className="mb-2">ID: {recipe.id}</p>
								<div className="flex gap-8 mb-4">
									<div>
										<div className="bg-red-500 w-96 h-96" />
									</div>
									<div>
										<h2 className="text-2xl w-64">{recipe.name}</h2>
										<p className="mb-2">Prep Time: {recipe.duration} Minutes</p>
										<h3 className="text-xl mb-4">{recipe.description}</h3>
										<ul className="flex gap-1 mb-4">
											{recipe.tags.map((tag, i) => (
												<li
													key={i}
													className="border-blue-400 border py-1 px-2 rounded-md w-min whitespace-nowrap"
												>
													{tag}
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="flex gap-8 pl-4">
									<ul className="flex flex-col mb-2">
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
								<div className="flex gap-4 mt-4">
									<div className="border-white border px-4 py-2 font-bold rounded-md">
										<button onClick={() => handleShowModal()}>
											EDIT THIS RECIPE
										</button>
									</div>
									<div className="border-white border px-4 py-2 font-bold rounded-md">
										<button onClick={() => handleDeleteRecipeClick(recipe.id)}>
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
					<div className="bg-black/50 z-10 top-0 absolute h-screen w-screen">
						<div className="h-screen flex justify-center items-center">
							<div className="bg-black border rounded-md flex flex-col">
								<h2 className="px-6 text-3xl pt-4">Editing Recipe</h2>
								<div className="py-2 px-6 flex flex-col">
									<label>Name</label>
									<input
										type="text"
										name="editName"
										id="editName"
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
										placeholder={`${recipe!.name}`}
									/>
								</div>
								<div className="py-2 px-6 bg-black flex flex-col">
									<label>Time to prepare (in minutes)</label>
									<input
										type="text"
										name="editName"
										id="editName"
										value={editDuration}
										onChange={(e) => setEditDuration(e.target.value)}
										className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
										placeholder={`${recipe!.duration}`}
									/>
								</div>
								<div className="py-2 px-6 bg-black flex flex-col">
									<label>Description</label>
									<textarea
										rows={2}
										name="editName"
										id="editName"
										value={editDescription}
										onChange={(e) => setEditDescription(e.target.value)}
										className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
										placeholder={`${recipe!.description}`}
									/>
								</div>
								<div>
									<p className="w-72 px-6 mt-4">
										Separate <span className="font-bold">Tags</span>,{" "}
										<span className="font-bold">Ingredients</span>, and{" "}
										<span className="font-bold">Seasonings</span> by using
										commas
									</p>
									<div className="py-2 px-6 bg-black flex flex-col">
										<label>Tags</label>
										<input
											type="text"
											name="editTags"
											id="editTags"
											value={editTags.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "tags")
											}
											className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
											placeholder={
												recipe
													? `${recipe?.tags[0]}, ${recipe?.tags[1]}, ${recipe?.tags[2]}`
													: "Edit Tags"
											}
										/>
									</div>
									<div className="py-2 px-6 bg-black flex flex-col">
										<label>Ingredients</label>
										<input
											type="text"
											name="editIngredients"
											id="editIngredients"
											value={editIngredients.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "ingredients")
											}
											className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
											placeholder={
												recipe
													? `${recipe?.ingredients[0]}, ${recipe?.ingredients[1]}, ${recipe?.ingredients[2]}, etc.`
													: "Edit Ingredients"
											}
										/>
									</div>
									<div className="py-2 px-6 bg-black flex flex-col">
										<label>Seasoning</label>
										<input
											type="text"
											name="editSeasoning"
											id="editSeasoning"
											value={editSeasoning.join(", ")}
											onChange={(e) =>
												handleEditStringToArray(e.target.value, "seasoning")
											}
											className="w-72 bg-black border border-neutral-400 px-2 rounded-md"
											placeholder={
												recipe
													? `${recipe?.seasoning[0]}, ${recipe?.seasoning[1]}, ${recipe?.seasoning[2]}, etc.`
													: "Edit Seasoning"
											}
										/>
									</div>
								</div>
								<div className="flex mx-auto gap-4">
									<div className="">
										<button
											className="border-neutral-400 hover:border-blue-500 transition-all duration-300 border px-4 py-2 font-bold rounded-md w-min whitespace-nowrap mx-auto mt-4 mb-6"
											type="button"
											onClick={() => updateRecipe(recipe!.id)}
										>
											Save Changes
										</button>
									</div>
									<div className="">
										<button
											className="border-neutral-400 hover:border-red-500 transition-all duration-300 border px-4 py-2 font-bold rounded-md w-min whitespace-nowrap mx-auto mt-4 mb-6"
											type="button"
											onClick={() => handleHideModal()}
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
			</div>
		</div>
	);
}

export default App;

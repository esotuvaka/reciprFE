import { FormEvent, useState } from "react";

import { IRecipe } from "../Types";

interface ICreateRecipe {
	createRecipeForm: (data: IRecipe) => void;
}

export function CreateRecipe({ createRecipeForm }: ICreateRecipe) {
	const [name, setName] = useState<string>("");
	const [duration, setDuration] = useState<number>(0);
	const [description, setDescription] = useState<string>("");
	const [tags, setTags] = useState<Array<string>>([""]);
	const [ingredients, setIngredients] = useState<Array<string>>([""]);
	const [seasoning, setSeasoning] = useState<Array<string>>([""]);

	function handleSubmit() {
		const formData: IRecipe = {
			name: name,
			description: description,
			duration: duration,
			tags: tags,
			ingredients: ingredients,
			seasoning: seasoning,
		};
		console.log(formData);
		createRecipeForm(formData);
	}

	function handleStringToArray(stringItems: string, arrayName: string) {
		const stringArray = stringItems.split(", ");

		switch (arrayName) {
			case "tags":
				setTags(stringArray);
				break;
			case "ingredients":
				setIngredients(stringArray);
				break;
			case "seasoning":
				setSeasoning(stringArray);
				break;
		}
	}

	// TO DO: once auth is implemented, have spam protections like one new recipe submission every 10mins
	return (
		<div className="mb-4 mt-12 flex flex-col gap-4 border border-white bg-neutral-900 px-6 py-4">
			<form>
				<h2 className="text-2xl font-bold underline underline-offset-2">
					CREATE A RECIPE
				</h2>
				<div className="flex flex-col  py-2 px-6">
					<label>Name</label>
					<input
						type="text"
						name="createName"
						id="createName"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
						placeholder={`What is the name of your recipe?`}
					/>
				</div>
				<div className="flex flex-col  py-2 px-6">
					<label>Description</label>
					<textarea
						rows={3}
						name="editName"
						id="editName"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
						placeholder={`Describe the recipe`}
					/>
				</div>
				<div className="flex flex-col  py-2 px-6">
					<label>Time to prepare (in minutes)</label>
					<input
						type="number"
						name="editName"
						id="editName"
						value={duration}
						onChange={(e) => setDuration(parseInt(e.target.value))}
						className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
						placeholder={`15, 30, 60, etc`}
					/>
				</div>
				<div>
					<p className="mt-4 w-96 px-6 text-sm">
						<span className="text-xl text-red-500">* </span>Separate{" "}
						<span className="font-bold">Tags</span>,{" "}
						<span className="font-bold">Ingredients</span>, and{" "}
						<span className="font-bold">Seasonings</span> by using commas
					</p>
					<div className="flex flex-col py-2 px-6">
						<label>
							Tags <span className="text-xl text-red-500">* </span>
						</label>
						<textarea
							rows={2}
							name="editTags"
							id="editTags"
							value={tags.join(", ")}
							onChange={(e) => handleStringToArray(e.target.value, "tags")}
							className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
							placeholder={"Add tags (air fryer, high protein, vegan, etc.)"}
						/>
					</div>
					<div className="flex flex-col py-2 px-6">
						<label>
							Ingredients <span className="text-xl text-red-500">* </span>
						</label>
						<textarea
							rows={6}
							name="editIngredients"
							id="editIngredients"
							value={ingredients.join(", ")}
							onChange={(e) =>
								handleStringToArray(e.target.value, "ingredients")
							}
							className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
							placeholder={
								"Add ingredients needed (600g Chicken, 30g butter, etc)"
							}
						/>
					</div>
					<div className="flex flex-col  py-2 px-6">
						<label>
							Seasoning <span className="text-xl text-red-500">* </span>
						</label>
						<textarea
							rows={3}
							name="editSeasoning"
							id="editSeasoning"
							value={seasoning.join(", ")}
							onChange={(e) => handleStringToArray(e.target.value, "seasoning")}
							className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
							placeholder={
								"Add seasoning needed (1Tbsp Garlic Powder, 2 Tbsp Oregano, 1 Pinch of Cilantro)"
							}
						/>
					</div>
				</div>
			</form>
			<button
				className="rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-white"
				type="submit"
				onClick={() => {
					console.log("CLICKED!");
					handleSubmit();
				}}
			>
				+ CREATE RECIPE
			</button>
		</div>
	);
}

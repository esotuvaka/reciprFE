import { FormEvent, useState } from "react";

import { IRecipe, TMacro } from "../Types";

interface ICreateRecipe {
	createRecipeForm: (data: IRecipe) => void;
}

export function CreateRecipe({ createRecipeForm }: ICreateRecipe) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [macros, setMacros] = useState<Array<TMacro>>([]);
	const [duration, setDuration] = useState<number>(0);
	const [tags, setTags] = useState<Array<string>>([""]);
	const [ingredients, setIngredients] = useState<Array<string>>([""]);
	const [seasoning, setSeasoning] = useState<Array<string>>([""]);
	const [instructions, setInstructions] = useState<Array<string>>([""]);

	function handleSubmit() {
		const formData: IRecipe = {
			name: name,
			description: description,
			macros: macros,
			duration: duration,
			tags: tags,
			ingredients: ingredients,
			seasoning: seasoning,
			instructions: instructions,
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
			case "instructions":
				setInstructions(stringArray);
				break;
		}
	}

	// TO DO: once auth is implemented, have spam protections like one new recipe submission every 10mins
	return (
		<div className="absolute col-span-3 w-3/5 border border-neutral-400 bg-neutral-900  ">
			<div className="grid grid-cols-2 grid-rows-2 p-6">
				<div className="flex">
					<div className="h-96 w-96 bg-red-500"></div>
				</div>
				<div className="px-6">
					<label>
						<h2 className="text-2xl font-bold">NAME</h2>
					</label>
					<input
						type="text"
						name="createName"
						id="createName"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mb-2 w-full border border-neutral-400 bg-black px-2"
						placeholder={`What is the name of your recipe?`}
					/>
					<label>
						<p className="text-xl font-semibold">PREP TIME, MINS</p>
					</label>
					<input
						type="number"
						name="editDuration"
						id="editDuration"
						value={duration}
						onChange={(e) => setDuration(parseInt(e.target.value))}
						className="mb-2 w-full border border-neutral-400 bg-black px-2"
						placeholder={`15, 30, 60, etc`}
					/>
					<label>
						<h3 className="text-xl font-semibold">DESCRIPTION</h3>
					</label>
					<textarea
						rows={3}
						name="editDescription"
						id="editDescription"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mb-2 w-full border border-neutral-400 bg-black px-2"
						placeholder={`Describe the recipe`}
					/>
					<label>
						<p className="text-xl font-semibold">
							TAGS<span className="text-xl text-red-500">* </span>{" "}
							<span className="text-base">- used for recipe filtering</span>
						</p>
					</label>
					<textarea
						rows={3}
						name="editTags"
						id="editTags"
						value={tags.join(", ")}
						onChange={(e) => handleStringToArray(e.target.value, "tags")}
						className="mb-2 w-full border border-neutral-400 bg-black px-2 pb-1"
						placeholder={
							"Add up to 3 tags. These should be the cooking method, protein source, and diet restrictions (vegan, vegetarian, ...)"
						}
					/>
				</div>

				<div className="flex gap-8  ">
					<div className="flex h-min flex-col pt-6">
						<label>
							<p className="text-xl font-semibold">
								INGREDIENTS<span className="text-xl text-red-500">* </span>
							</p>
						</label>
						<textarea
							rows={12}
							name="editTags"
							id="editTags"
							value={tags.join(", ")}
							onChange={(e) => handleStringToArray(e.target.value, "tags")}
							className="mb-2 w-full border border-neutral-400 bg-black  px-2"
							placeholder={"600g chicken, Tbsp garlic powder, Tbsp cumin, ..."}
						/>
					</div>
					<div className="flex h-min flex-col pt-6">
						<label>
							<p className="text-xl font-semibold">
								SEASONING<span className="text-xl text-red-500">* </span>
							</p>
						</label>
						<textarea
							rows={12}
							name="editTags"
							id="editTags"
							value={tags.join(", ")}
							onChange={(e) => handleStringToArray(e.target.value, "tags")}
							className="mb-2 w-full border border-neutral-400 bg-black  px-2"
							placeholder={"cumin, garlic powder, oregano, ..."}
						/>
					</div>
				</div>

				<div className="px-6 pt-6">
					<label>
						<h4 className="text-xl font-semibold">
							INSTRUCTIONS<span className="text-xl text-red-500">* </span>
						</h4>
					</label>
					<textarea
						rows={12}
						name="editTags"
						id="editTags"
						value={tags.join(", ")}
						onChange={(e) => handleStringToArray(e.target.value, "tags")}
						className="mb-2 w-full border border-neutral-400 bg-black  px-2"
						placeholder={
							"1. Organize utensils and cookware, 2. Rinse ingredients if needed, 3. Begin cooking, 4. Enjoy!"
						}
					/>
				</div>
			</div>
		</div>
		// <div className="mb-4 mt-12 flex flex-col gap-4 border border-neutral-400 bg-neutral-900 px-6 py-4">
		// 	<form>
		// 		<h2 className="text-2xl font-bold underline underline-offset-2">
		// 			CREATE A RECIPE
		// 		</h2>
		// 		<div className="flex flex-col  py-2 px-6">
		// 			<label>Name</label>
		// 			<input
		// 				type="text"
		// 				name="createName"
		// 				id="createName"
		// 				value={name}
		// 				onChange={(e) => setName(e.target.value)}
		// 				className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 				placeholder={`What is the name of your recipe?`}
		// 			/>
		// 		</div>
		// 		<div className="flex flex-col  py-2 px-6">
		// 			<label>Description</label>
		// 			<textarea
		// 				rows={3}
		// 				name="editName"
		// 				id="editName"
		// 				value={description}
		// 				onChange={(e) => setDescription(e.target.value)}
		// 				className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 				placeholder={`Describe the recipe`}
		// 			/>
		// 		</div>
		// 		<div className="flex flex-col  py-2 px-6">
		// 			<label>Macros</label>
		// 			<textarea
		// 				rows={3}
		// 				name="editMacros"
		// 				id="editMacros"
		// 				value={description}
		// 				// TO DO: Fix Macros onChange handler
		// 				onChange={(e) => setDescription(e.target.value)}
		// 				className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 				placeholder={`What are the recipe's macros?`}
		// 			/>
		// 		</div>
		// 		<div className="flex flex-col  py-2 px-6">
		// 			<label>Time to prepare (in minutes)</label>
		// 			<input
		// 				type="number"
		// 				name="editName"
		// 				id="editName"
		// 				value={duration}
		// 				onChange={(e) => setDuration(parseInt(e.target.value))}
		// 				className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 				placeholder={`15, 30, 60, etc`}
		// 			/>
		// 		</div>
		// 		<div>
		// 			<p className="mt-4 w-96 px-6 text-sm">
		// 				<span className="text-xl text-red-500">* </span>Separate by using
		// 				commas
		// 			</p>
		// 			<div className="flex flex-col py-2 px-6">
		// 				<label>
		// 					Tags <span className="text-xl text-red-500">* </span>
		// 				</label>
		// 				<textarea
		// 					rows={2}
		// 					name="editTags"
		// 					id="editTags"
		// 					value={tags.join(", ")}
		// 					onChange={(e) => handleStringToArray(e.target.value, "tags")}
		// 					className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 					placeholder={"Add tags (air fryer, high protein, vegan, etc.)"}
		// 				/>
		// 			</div>
		// 			<div className="flex flex-col py-2 px-6">
		// 				<label>
		// 					Ingredients <span className="text-xl text-red-500">* </span>
		// 				</label>
		// 				<textarea
		// 					rows={6}
		// 					name="editIngredients"
		// 					id="editIngredients"
		// 					value={ingredients.join(", ")}
		// 					onChange={(e) =>
		// 						handleStringToArray(e.target.value, "ingredients")
		// 					}
		// 					className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 					placeholder={
		// 						"Add ingredients needed (600g Chicken, 30g butter, etc)"
		// 					}
		// 				/>
		// 			</div>
		// 			<div className="flex flex-col py-2 px-6">
		// 				<label>
		// 					Seasoning <span className="text-xl text-red-500">* </span>
		// 				</label>
		// 				<textarea
		// 					rows={3}
		// 					name="editSeasoning"
		// 					id="editSeasoning"
		// 					value={seasoning.join(", ")}
		// 					onChange={(e) => handleStringToArray(e.target.value, "seasoning")}
		// 					className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 					placeholder={
		// 						"Add seasoning needed (1Tbsp Garlic Powder, 2 Tbsp Oregano, 1 Pinch of Cilantro)"
		// 					}
		// 				/>
		// 			</div>
		// 			<div className="flex flex-col py-2 px-6">
		// 				<label>
		// 					Instructions <span className="text-xl text-red-500">* </span>
		// 				</label>
		// 				<textarea
		// 					rows={3}
		// 					name="editInstructions"
		// 					id="editInstructions"
		// 					value={seasoning.join(", ")}
		// 					onChange={(e) =>
		// 						handleStringToArray(e.target.value, "instructions")
		// 					}
		// 					className="w-96 rounded-md border border-neutral-400 bg-black  px-2"
		// 					placeholder={"What are the instructions for the recipe?"}
		// 				/>
		// 			</div>
		// 		</div>
		// 	</form>
		// 	<button
		// 		className="rounded-md border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-white"
		// 		type="submit"
		// 		onClick={() => {
		// 			console.log("CLICKED!");
		// 			handleSubmit();
		// 		}}
		// 	>
		// 		+ CREATE RECIPE
		// 	</button>
		// </div>
	);
}

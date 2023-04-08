import { FormEvent, useState } from "react";

import { IRecipe, TMacro } from "../Types";

interface ICreateRecipe {
	createRecipeForm: (data: IRecipe) => void;
}

export function CreateRecipe({ createRecipeForm }: ICreateRecipe) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [macros, setMacros] = useState<Array<TMacro>>([{ name: "", value: 0 }]);
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

	function parseMacroString(macroString: string) {
		const macrosArr = macroString.split(",").map((m) => {
			const [name, value] = m.split(":").map((item) => item.trim());
			const parsedValue = parseInt(value, 10);

			return {
				name,
				value: parsedValue,
			};
		});
		setMacros(macrosArr);
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
	// TO DO: create a macros state, and function that parses out macro info into TMacro data shape
	// TO DO: ? possibly update these divs to use reusable input components??
	return (
		<div className="absolute col-span-3 w-3/5 border border-neutral-400 bg-neutral-900">
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
						rows={1}
						name="editTags"
						id="editTags"
						value={tags.join(", ")}
						onChange={(e) => handleStringToArray(e.target.value, "tags")}
						className="mb-2 w-full border border-neutral-400 bg-black px-2 pb-1"
						placeholder={"Add 3 tags (chicken, air fryer, rice)"}
					/>
					<label>
						<p className="text-xl font-semibold">
							MACROS<span className="text-xl text-red-500">* </span>{" "}
							<span className="text-base">- used for recipe filtering</span>
						</p>
					</label>
					<textarea
						rows={1}
						name="editMacros"
						id="editMacros"
						// TO DO: Update value here to use macro information
						value={tags.join(", ")}
						onChange={(e) => parseMacroString(e.target.value)}
						className="mb-2 w-full border border-neutral-400 bg-black px-2 pb-1"
						placeholder={"Add macros (protein: 30, calories: 500, fat: 5)"}
					/>
				</div>

				<div className="col-span-2">
					<div className="flex flex-col">
						<div className="flex w-full">
							<div className="flex w-1/2 gap-8">
								<div className="flex h-min flex-col ">
									<label>
										<p className="text-xl font-semibold">
											INGREDIENTS
											<span className="text-xl text-red-500">* </span>
										</p>
									</label>
									<textarea
										rows={12}
										name="editIngredients"
										id="editIngredients"
										value={ingredients.join(", ")}
										onChange={(e) =>
											handleStringToArray(e.target.value, "ingredients")
										}
										className="w-full border border-neutral-400 bg-black  px-2"
										placeholder={
											"600g chicken, Tbsp garlic powder, Tbsp cumin, ..."
										}
									/>
								</div>
								<div className="flex h-min flex-col">
									<label>
										<p className="text-xl font-semibold">
											SEASONING<span className="text-xl text-red-500">* </span>
										</p>
									</label>
									<textarea
										rows={12}
										name="editSeasoning"
										id="editSeasoning"
										value={seasoning.join(", ")}
										onChange={(e) =>
											handleStringToArray(e.target.value, "seasoning")
										}
										className="w-full border border-neutral-400 bg-black  px-2"
										placeholder={"cumin, garlic powder, oregano, ..."}
									/>
								</div>
							</div>
							<div className="w-1/2 px-6">
								<label>
									<h4 className="text-xl font-semibold">
										INSTRUCTIONS<span className="text-xl text-red-500">* </span>
									</h4>
								</label>
								<textarea
									rows={12}
									name="editInstructions"
									id="editInstructions"
									value={instructions.join(", ")}
									onChange={(e) =>
										handleStringToArray(e.target.value, "instructions")
									}
									className="mb-2 w-full border border-neutral-400 bg-black  px-2"
									placeholder={
										"How do you make this recipe? (Organize cookware, Begin cooking, Enjoy!)"
									}
								/>
							</div>
						</div>
						<div className="mt-6 flex gap-4">
							<button
								onClick={() => handleSubmit()}
								className="border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-white"
							>
								Create
							</button>
							{/* TO DO: make cancel button send user to explore page */}
							<button className="border border-neutral-400 px-4 py-2 font-bold transition-all duration-300 hover:border-red-500">
								Cancel
							</button>
							<p>
								<span className="text-xl text-red-500">* </span>Separate with
								commas and a space. e.g: chicken, rice, lemon
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

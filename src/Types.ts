export interface IRecipe {
	name: string;
	description: string;
	duration: string;
	tags: Array<string>;
	ingredients: Array<string>;
	seasoning: Array<string>;
}

export interface IReceivedRecipe extends IRecipe {
	id: string;
}

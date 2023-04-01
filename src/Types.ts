export interface IRecipe {
	name: string;
	description: string;
	duration: number;
	tags: Array<string>;
	ingredients: Array<string>;
	seasoning: Array<string>;
}

export interface IReceivedRecipe extends IRecipe {
	id: string;
}

export interface IExploreRecipes {
	contentType: null;
	serializerSettings: null;
	statusCode: null;
	value: IReceivedRecipe[];
}

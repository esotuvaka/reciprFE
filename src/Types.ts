export interface IRecipe {
	name: string;
	description: string;
	macros: TMacro[] | null;
	duration: number;
	tags: string[];
	ingredients: string[];
	seasoning: string[];
	instructions: string[] | null;
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

export type TPageState = "explore" | "create" | "edit";

export type TMacro = {
	name: string;
	value: number;
};

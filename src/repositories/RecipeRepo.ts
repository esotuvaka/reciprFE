import { IRecipe, IReceivedRecipe, IExploreRecipes } from "../Types";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

class RecipeRepo {
	async exploreRecipes(): Promise<IExploreRecipes> {
		try {
			const response = await axios.get(`${BACKEND}/explore`);
			const data = response.data.value;
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to fetch EXPLORE recipes");
		}
	}

	async getTaggedRecipes(tags: string): Promise<IExploreRecipes> {
		try {
			const response = await axios.get(`${BACKEND}/explore?tags=${tags}`);
			const data = response.data.value;
			console.log(data);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to fetch filtered EXPLORE recipes");
		}
	}

	async sendRecipe(newRecipeData: IRecipe) {
		try {
			const response = await axios.post(`${BACKEND}`, newRecipeData);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to send recipe");
		}
	}

	async getRecipe(id: string): Promise<IReceivedRecipe> {
		try {
			const response = await axios.get(`${BACKEND}/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to get recipe");
		}
	}

	async updateRecipe(recipeData: IReceivedRecipe) {
		try {
			const response = await axios.put(
				`${BACKEND}/${recipeData.id}`,
				recipeData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to update recipe");
		}
	}

	async deleteRecipe(id: string) {
		try {
			const response = await axios.delete(`${BACKEND}/${id}`);
			return response.data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to delete recipe");
		}
	}
}

export default RecipeRepo;

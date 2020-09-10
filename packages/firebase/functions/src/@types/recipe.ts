
/**
 * Typings detailing transition to Recipe Collection in Firestore
 */

interface Ingredient {
  ingredientId: string
  commodityId: string
  department: string
  entity: string
  amount: string
  uom: string
}

// option 1
type SingleRecipe = {
  recipeId: string;
  dishTitle: string;
  isCooked: boolean;
  time: string;
  ingredients: Ingredient[]; // * a map, not a sub-collection
  servings: number;
  syncs: RecipeSyncs[];
}

// option 2
type Recipes = Omit<SingleRecipe, 'ingredients'> & {
  servings: { // * a map, not a sub-collection
    1: Ingredient[]
    2: Ingredient[]
    // more serving sizes here
  },
  syncs: RecipeSyncs[]
}

interface RecipeSyncs {
  createdAt: Date
  completedAt: Date
  servingsToSync: number[]
  triggeredBy: string
  status: 'queued' | 'pending' | 'success' | 'failure'
}

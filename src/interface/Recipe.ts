export interface Recipe {
  author: string
  description: string
  difficulty: string
  id: number
  ingredients: Ingredient[]
  instructions: string[]
  slug: string
  thumbnail: string
  title: string
}

interface Ingredient {
  id: number
  name: string
  quantity: number
  unit: string
}

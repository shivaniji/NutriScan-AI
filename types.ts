export interface NutritionData {
  foodName: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  healthTip: string;
}

export interface MacroDataPoint {
  name: string;
  value: number;
  fill: string;
}
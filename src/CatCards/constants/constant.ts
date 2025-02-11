import { BreedInfo } from "../OneCard/types/types";

export const API_KEY =
    "live_Q7eypd6MW81skStdAEfxcQ38QkgvudsuucUJkozHuGTJ1Lr0n2ERBqRkTWpvEcZg";

export const BASE_URL = "https://api.thecatapi.com/v1/images/search?&limit=15";

export const BREED_PROPS: (keyof BreedInfo)[] = ["name", "temperament", "description", "origin",
    "life_span", "child_friendly", "dog_friendly", "energy_level", "hypoallergenic"];
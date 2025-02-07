export type BreedInfo = {
    id: string,
    name: string,
    temperament: string,
    description: string,
    origin: string,
    life_span: string,
    child_friendly: number,
    dog_friendly: number,
    energy_level: number,
    hypoallergenic: number,
};

export type CatInfo = {
    url: string;
    id: string;
    categories: Array<{ name: string }>
    breeds: Array<BreedInfo>
};
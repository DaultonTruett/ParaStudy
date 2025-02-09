export interface Medication {
    _id: string,
    classification: string,
    name: string,
    age: string,
    indications_dose: {
        indication: string,
        dose_and_route: {
            dose: string,
            mu: string,
            route: string,
            notes: String
        }[]
    }[],
    contraindications: string,
    side_effects: string,
    actions: string,
    considerations: string
};

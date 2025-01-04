export interface Medication {
    _id: string,
    classification: string,
    name: string,
    age: string,
    contraindications: string,
    sideEffects: string,
    actions: string,
    notes: string
    indications_dose: {
        indication: string,
        dose_and_route: {
            dose: string,
            mu: string,
            route: string
        }[]
    }[]
};

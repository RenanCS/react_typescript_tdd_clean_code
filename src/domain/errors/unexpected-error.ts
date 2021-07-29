export class UnexpectedError extends Error {
    constructor() {
        super('Algo de erro aconteceu, tente novamente');
        this.name = "UnexpectedError"
    }
}
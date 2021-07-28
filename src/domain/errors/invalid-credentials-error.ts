export class InvalidCredencialErro extends Error {
    constructor() {
        super('Credenciais inválidas');
        this.name = "InvalidCredencialErro"
    }
}
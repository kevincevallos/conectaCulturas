export interface ConsultaResponse {
  usuario: {
    id: number,
    nombre: string,
    email: string,
    access_token: string,
    expires_in: number
}
}

import { physioRepository } from "../repository/physio.repository";
import { PhisioDTO } from "./definitions";


export const physioService = {
    createPhisio : async (phisio: PhisioDTO) : Promise<PhisioDTO> =>{
        // verificar que no tenga numeros


        // crear phisio, llamar al repositorio

        const createPhisio = await physioRepository.create(phisio)
        return createPhisio
    }
}
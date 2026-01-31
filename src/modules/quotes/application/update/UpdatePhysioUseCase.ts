import { Physio, validatePhysio } from "../../domain/Quote";
import { PhysioRepository } from "../../domain/QuoteRepository";

export const upatePhysioUseCase = async (physio : Physio, physioRepository : PhysioRepository ) : Promise<Physio> => {
    validatePhysio(physio);
    return await physioRepository.update (physio.id, physio.name);
}
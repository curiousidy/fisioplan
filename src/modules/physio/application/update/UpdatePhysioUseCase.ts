import { Physio, validatePhysio } from "../../domain/Physio";
import { PhysioRepository } from "../../domain/PhysioRepository";

export const upatePhysioUseCase = async (physio : Physio, physioRepository : PhysioRepository ) : Promise<Physio> => {
    validatePhysio(physio);
    return await physioRepository.update (physio.id, physio.name);
}
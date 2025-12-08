import { Physio, validatePhysio } from "../../domain/Physio";
import { PhysioRepository } from "../../domain/PhysioRepository";

export const deletePhysioUseCase = async (physio : Physio, physioRepository : PhysioRepository ) : Promise<Physio | null > => {
    validatePhysio(physio);
    const physioDeleted = await physioRepository.findById(physio.id);
    await physioRepository.delete (physio.id);
    return physioDeleted;
}
import { Physio, validatePhysioId } from "../../domain/Physio";
import { PhysioRepository } from "../../domain/PhysioRepository";

export const deletePhysioUseCase = async (physio : Physio, physioRepository : PhysioRepository ) : Promise<Physio | null > => {
    validatePhysioId(physio.id);
    const physioDeleted = await physioRepository.findById(physio.id);
    await physioRepository.delete (physio.id);
    return physioDeleted;
}
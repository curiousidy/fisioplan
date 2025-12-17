import { Physio, validatePhysioId } from "../../domain/Physio";
import { PhysioRepository } from "../../domain/PhysioRepository";

export const findByIdUseCase = async (id:string , physioRepository: PhysioRepository) : Promise<Physio | null > => {
    validatePhysioId(id);
    return await physioRepository.findById(id);
}
import { Physio, validatePhysioId } from "../../domain/Quote";
import { PhysioRepository } from "../../domain/QuoteRepository";

export const findByIdUseCase = async (id:string , physioRepository: PhysioRepository) : Promise<Physio | null > => {
    validatePhysioId(id);
    return await physioRepository.findById(id);
}
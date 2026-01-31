
import { Physio } from "../../domain/Quote";
import { PhysioRepository } from "../../domain/QuoteRepository";

export const findAllUseCase = async (physioRepository: PhysioRepository) : Promise<Physio[]> => {
    return await physioRepository.findAll();
}
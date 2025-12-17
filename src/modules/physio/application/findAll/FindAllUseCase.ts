
import { Physio } from "../../domain/Physio";
import { PhysioRepository } from "../../domain/PhysioRepository";

export const findAllUseCase = async (physioRepository: PhysioRepository) : Promise<Physio[]> => {
    return await physioRepository.findAll();
}
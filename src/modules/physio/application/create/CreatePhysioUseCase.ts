import { Physio, validatePhysioName } from '../../domain/Physio';
import { PhysioRepository } from '../../domain/PhysioRepository';



export const createPhysioUseCase = async (name: string, physioRepository: PhysioRepository): Promise<Physio> => {
  validatePhysioName(name);
  return await physioRepository.create(name)
};

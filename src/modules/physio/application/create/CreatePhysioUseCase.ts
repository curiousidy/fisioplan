import { PhysioRepository } from '../../domain/PhysioRepository';
import { Physio, validatePhysioName } from '../../domain/Physio';
import { CreatePhysioCommand } from './CreatePhysioCommand';

export interface CreatePhysioUseCase {
  execute(command: CreatePhysioCommand): Promise<Physio>;
}

export const createPhysioUseCase = (
  physioRepository: PhysioRepository
): CreatePhysioUseCase => ({
  execute: async (command: CreatePhysioCommand): Promise<Physio> => {
    // Validar el nombre usando la lógica del dominio
    validatePhysioName(command.name);

    // Crear el physio usando el repositorio
    const physio = await physioRepository.create(command.name);

    return physio;
  }
});

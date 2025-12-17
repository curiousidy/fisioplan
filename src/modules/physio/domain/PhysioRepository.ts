import { Physio } from './Physio';

export interface PhysioRepository {
  create(name: string): Promise<Physio>;
  findById(id: string): Promise<Physio | null>;
  findAll(): Promise<Physio[]>;
  update(id: string, name: string): Promise<Physio>;
  delete(id: string): Promise<void>;
}

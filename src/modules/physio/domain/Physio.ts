export interface Physio {
  id: string;
  name: string;
}

export const validatePhysioName = (name: string): void => {
  if (!name || typeof name !== 'string') {
    throw new Error('El nombre es requerido y debe ser una cadena de texto');
  }

  if (name.trim().length === 0) {
    throw new Error('El nombre no puede estar vacío');
  }

  if (/\d/.test(name)) {
    throw new Error('El nombre no puede contener números');
  }
};

export const createPhysio = (id: string, name: string): Physio => {
  validatePhysioName(name);
  return { id, name };
};

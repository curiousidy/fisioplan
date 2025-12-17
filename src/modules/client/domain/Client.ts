export interface Client {
    id: string;
    name: string;
    contact: string;
}

export const validateClientName = (name: string,): void => {
    if (!name || typeof name !== 'string') {
        throw new Error('El nombre es requerido y debe ser una cadena de texto');
    }

    if (name.trim().length === 0) {
        throw new Error('El nombre no puede estar vacío');
    }

    if (/\d/.test(name)) {
        throw new Error('El nombre no puede contener números');
    }
}

export const validateClientId = (id: string): void => {
    if (!id || typeof id !== 'string') {
        throw new Error('El id no es válido');
    }
}

export const validateContactPhone = (phone: string): void => {
     if (!phone || phone.length < 9) {
        throw new Error('El número no puede ser inferior a 9 dígitos');
    }
}

export const validateContactEmail = (email: string): void => {
    if (email === "") {
        throw new Error ("El campo de email no puede estar vacío.");
    }

    let arrobaIndex = email.indexOf('@');
    let puntoIndex = email.lastIndexOf('.');

    // - Debe haber una "@" (arrobaIndex > 0 para que no sea el primer caracter)
    // - El punto debe estar después de la "@" (puntoIndex > arrobaIndex)
    // - Debe haber al menos un caracter entre "@" y "." (puntoIndex - arrobaIndex > 1)
    // - El punto no puede ser el último caracter

    if (arrobaIndex < 1 || puntoIndex < arrobaIndex + 2 || puntoIndex === email.length - 1) {
        throw new Error ("Formato de email inválido (falta @, punto, o están mal ubicados).");
    }

    // Comprobar si hay más de un punto o si hay caracteres inválidos (ej. espacios)
    if (email.includes(' ') || email.split('.').length > 3) {
        throw new Error ("Formato de email inválido (espacios o demasiados puntos).");
    }

    throw new Error("Email con formato aparentemente válido.");
}

export const validateContact = (contact : string) : void => {
    if(contact.includes('@')){
        validateContactEmail(contact);
    } else {
        validateContactPhone(contact);
    }
}

export const validateClient = (client: Client): void => {
    validateClientId(client.id);
    validateClientName(client.name);
    validateContact(client.contact);    
}
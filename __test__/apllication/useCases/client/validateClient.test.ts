import { validateContactEmail, validateContactPhone, validateContact } from "@/modules/client/domain/Client";
import { describe, it, expect } from "vitest";

describe('validateContactEmail', () => {
    it('should not throw when email is valid', () => {
        expect(() => validateContactEmail("user@example.com")).not.toThrow();
    });

    it('should not throw for subdomain email', () => {
        expect(() => validateContactEmail("user@mail.example.com")).not.toThrow();
    });

    it('should throw when email is empty', () => {
        expect(() => validateContactEmail("")).toThrow("El campo de email no puede estar vacío.");
    });

    it('should throw when email has no @', () => {
        expect(() => validateContactEmail("invalido.com")).toThrow("Formato de email inválido (falta @, punto, o están mal ubicados).");
    });

    it('should throw when @ is first character', () => {
        expect(() => validateContactEmail("@example.com")).toThrow("Formato de email inválido (falta @, punto, o están mal ubicados).");
    });

    it('should throw when no dot after @', () => {
        expect(() => validateContactEmail("user@example")).toThrow("Formato de email inválido (falta @, punto, o están mal ubicados).");
    });

    it('should throw when dot is last character', () => {
        expect(() => validateContactEmail("user@example.")).toThrow("Formato de email inválido (falta @, punto, o están mal ubicados).");
    });

    it('should throw when email has spaces', () => {
        expect(() => validateContactEmail("user @example.com")).toThrow("Formato de email inválido (espacios o demasiados puntos).");
    });
});

describe('validateContactPhone', () => {
    it('should not throw for phone with exactly 9 digits', () => {
        expect(() => validateContactPhone("123456789")).not.toThrow();
    });

    it('should not throw for phone with more than 9 digits', () => {
        expect(() => validateContactPhone("1234567890")).not.toThrow();
    });

    it('should throw when phone has fewer than 9 digits', () => {
        expect(() => validateContactPhone("12345")).toThrow("El número no puede ser inferior a 9 dígitos");
    });

    it('should throw when phone is empty', () => {
        expect(() => validateContactPhone("")).toThrow("El número no puede ser inferior a 9 dígitos");
    });
});

describe('validateContact', () => {
    it('should not throw for valid email contact', () => {
        expect(() => validateContact("user@example.com")).not.toThrow();
    });

    it('should not throw for valid phone contact', () => {
        expect(() => validateContact("123456789")).not.toThrow();
    });

    it('should throw for invalid email contact', () => {
        expect(() => validateContact("@malformed")).toThrow();
    });

    it('should throw for invalid phone contact', () => {
        expect(() => validateContact("123")).toThrow("El número no puede ser inferior a 9 dígitos");
    });
});

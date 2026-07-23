import { describe, it, expect } from 'vitest';
import { validateQuoteDates } from '@/modules/quotes/domain/Quote';

describe('validateQuoteDates', () => {
  it('should not throw when endDate is after startDate', () => {
    const startDate = new Date('2026-01-01T10:00:00');
    const endDate = new Date('2026-01-01T11:00:00');

    expect(() => validateQuoteDates(startDate, endDate)).not.toThrow();
  });

  it('should throw when endDate equals startDate', () => {
    const date = new Date('2026-01-01T10:00:00');

    expect(() => validateQuoteDates(date, date)).toThrow(
      'La fecha de fin debe ser posterior a la fecha de inicio'
    );
  });

  it('should throw when endDate is before startDate', () => {
    const startDate = new Date('2026-01-01T11:00:00');
    const endDate = new Date('2026-01-01T10:00:00');

    expect(() => validateQuoteDates(startDate, endDate)).toThrow(
      'La fecha de fin debe ser posterior a la fecha de inicio'
    );
  });

  it('should throw when startDate is an invalid Date', () => {
    const invalidDate = new Date('not-a-date');
    const endDate = new Date('2026-01-01T11:00:00');

    expect(() => validateQuoteDates(invalidDate, endDate)).toThrow(
      'La fecha de inicio no es válida'
    );
  });

  it('should throw when endDate is an invalid Date', () => {
    const startDate = new Date('2026-01-01T10:00:00');
    const invalidDate = new Date('not-a-date');

    expect(() => validateQuoteDates(startDate, invalidDate)).toThrow(
      'La fecha de fin no es válida'
    );
  });

  it('should not throw when endDate is 1ms after startDate', () => {
    const startDate = new Date('2026-01-01T10:00:00.000');
    const endDate = new Date('2026-01-01T10:00:00.001');

    expect(() => validateQuoteDates(startDate, endDate)).not.toThrow();
  });
});

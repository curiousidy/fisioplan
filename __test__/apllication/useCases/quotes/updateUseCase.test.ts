import { QuoteRepository } from "@/modules/quotes/domain/QuoteRepository";
import { updateQuoteUseCase } from "@/modules/quotes/application/update/UpdateQuoteUseCase";
import { beforeEach, describe, it, vi, expect } from "vitest";

describe('Quote use cases', () => {
  const mockQuoteRepository: QuoteRepository = {
    create: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    findByDate: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('updateQuoteUseCase', () => {
    it('should update an existing quote', async () => {
      // Arrange
      const existingQuote = {
        id: 'abc-123',
        physio: { id: 'p1', name: 'Dr. García' },
        physioId: 'p1',
        client: { id: 'c1', name: 'Juan', contact: '1234567890' },
        clientId: 'c1',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-02'),
        status: 'agendada' as const,
      };

      vi.mocked(mockQuoteRepository.findById).mockResolvedValue(existingQuote);
      vi.mocked(mockQuoteRepository.update).mockResolvedValue({
        ...existingQuote,
        status: 'completada' as const,
      });

      // Act
      const result = await updateQuoteUseCase(
        'abc-123',
        { status: 'completada' },
        mockQuoteRepository
      );

      // Assert
      expect(mockQuoteRepository.findById).toHaveBeenCalledWith('abc-123');
      expect(mockQuoteRepository.update).toHaveBeenCalledWith(
        'abc-123',
        expect.objectContaining({ status: 'completada' })
      );
      expect(result.status).toBe('completada');
    });

    it('should throw error when quote does not exist', async () => {
      // Arrange
      vi.mocked(mockQuoteRepository.findById).mockResolvedValue(null);

      // Act & Assert
      await expect(
        updateQuoteUseCase('no-existe', { status: 'completada' }, mockQuoteRepository)
      ).rejects.toThrow('Cita no encontrada');

      expect(mockQuoteRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when status is invalid', async () => {
      // Arrange
      const existingQuote = {
        id: 'abc-123',
        physio: { id: 'p1', name: 'Dr. García' },
        physioId: 'p1',
        client: { id: 'c1', name: 'Juan', contact: '1234567890' },
        clientId: 'c1',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-02'),
        status: 'agendada' as const,
      };

      vi.mocked(mockQuoteRepository.findById).mockResolvedValue(existingQuote);

      // Act & Assert
      await expect(
        updateQuoteUseCase('abc-123', { status: 'invalido' }, mockQuoteRepository)
      ).rejects.toThrow();

      expect(mockQuoteRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when endDate is before startDate after merge', async () => {
      // Arrange
      const existingQuote = {
        id: 'abc-123',
        physio: { id: 'p1', name: 'Dr. García' },
        physioId: 'p1',
        client: { id: 'c1', name: 'Juan', contact: '1234567890' },
        clientId: 'c1',
        startDate: new Date('2026-01-01T10:00:00'),
        endDate: new Date('2026-01-01T11:00:00'),
        status: 'agendada' as const,
      };

      vi.mocked(mockQuoteRepository.findById).mockResolvedValue(existingQuote);

      // Act & Assert — nueva endDate anterior a startDate existente
      await expect(
        updateQuoteUseCase(
          'abc-123',
          { endDate: '2026-01-01T09:00:00' },
          mockQuoteRepository
        )
      ).rejects.toThrow('La fecha de fin debe ser posterior a la fecha de inicio');

      expect(mockQuoteRepository.update).not.toHaveBeenCalled();
    });

    it('should throw error when endDate equals startDate after merge', async () => {
      // Arrange
      const existingQuote = {
        id: 'abc-123',
        physio: { id: 'p1', name: 'Dr. García' },
        physioId: 'p1',
        client: { id: 'c1', name: 'Juan', contact: '1234567890' },
        clientId: 'c1',
        startDate: new Date('2026-01-01T10:00:00'),
        endDate: new Date('2026-01-01T11:00:00'),
        status: 'agendada' as const,
      };

      vi.mocked(mockQuoteRepository.findById).mockResolvedValue(existingQuote);

      // Act & Assert — nueva endDate igual a startDate existente
      await expect(
        updateQuoteUseCase(
          'abc-123',
          { endDate: '2026-01-01T10:00:00' },
          mockQuoteRepository
        )
      ).rejects.toThrow('La fecha de fin debe ser posterior a la fecha de inicio');

      expect(mockQuoteRepository.update).not.toHaveBeenCalled();
    });
  });
});

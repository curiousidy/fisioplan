export interface UpdateQuoteDTO {
  physio_id?: string;
  startDate?: string; // ISO 8601 — viene crudo del body HTTP
  endDate?: string;   // ISO 8601
  status?: string;    // string — validado luego en dominio
}

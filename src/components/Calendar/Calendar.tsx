'use client'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date) => void;
  disabled?: { before: Date };
}

export default function Calendar({ selected, onSelect, disabled }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => date && onSelect(date)}
      disabled={disabled}
    />
  );
}

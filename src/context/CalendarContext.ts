import { createContext } from 'react';
import type { Todos } from '../types/Todos';

interface ContextType {
  currentDate: Date;
  updateCurrentDate: (date: Date) => void;
  todos: Todos;
  updateTodos: (todo: Todos) => void;
}

export const CalendarContext = createContext<ContextType | undefined>(
  undefined
);

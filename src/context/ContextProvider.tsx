import { useEffect, useState } from 'react';
import type { Todos } from '../types/Todos';
import { CalendarContext } from './CalendarContext';

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState<Todos>(() =>
    JSON.parse(localStorage.getItem('todos') || '{}')
  );

  const updateCurrentDate = (date: Date) => {
    setCurrentDate(date);
  };

  const updateTodos = (todo: Todos) => {
    setTodos(todo);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <CalendarContext.Provider
      value={{ currentDate, updateCurrentDate, todos, updateTodos }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

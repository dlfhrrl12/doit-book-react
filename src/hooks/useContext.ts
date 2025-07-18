import { useContext } from 'react';
import { CalendarContext } from '../context/CalendarContext'; // <- 새로 분리된 Context 임포트

export function useDate() {
  const context = useContext(CalendarContext); // CalendarContext 사용
  if (!context) {
    throw new Error('useDate는 ContextProvider 내에서 사용해야 합니다.');
  }
  const { currentDate, updateCurrentDate } = context;
  return { currentDate, updateCurrentDate };
}

export function useTodos() {
  const context = useContext(CalendarContext); // CalendarContext 사용
  if (!context) {
    throw new Error('useTodos는 ContextProvider 내에서 사용해야 합니다.');
  }
  const { todos, updateTodos } = context;
  return { todos, updateTodos };
}

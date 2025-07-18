import { useDate, useTodos } from '../../../hooks/useContext';

const getMonthDays = (year: number, month: number) => {
  const days: (number | null)[] = [];
  const date = new Date(year, month, 1);
  const firstDayOfWeek = date.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const CalendarContent = () => {
  const { currentDate, updateCurrentDate } = useDate();
  const { todos } = useTodos();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();
  const days = getMonthDays(year, month);
  const weekdayHeaders = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDateClick = (day: number | null) => {
    if (day !== null) {
      const newDate = new Date(year, month, day);
      updateCurrentDate(newDate);
    }
  };

  const getTodoStatus = (year: number, month: number, day: number): string => {
    const dateKey = `${year} - ${String(month + 1).padStart(2, '0')} - ${String(
      day
    ).padStart(2, '0')}`;
    const dayTodos = todos[dateKey] || [];

    const allDone = dayTodos.every((todo) => todo.completed);
    const anyTodo = dayTodos.length > 0;

    if (anyTodo && allDone) {
      return 'done';
    } else if (anyTodo) {
      return 'doing';
    }

    return '';
  };

  return (
    <section className=" bg-white border rounded-[1.5rem] h-[95%] overflow-hidden">
      <div className=" gird grid-cols-7 h-full">
        {weekdayHeaders.map((header) => (
          <div
            key={header}
            className="pt-[0.625rem] text-center font-bold flex justify-center items-center"
          >
            {header}
          </div>
        ))}
        {days.map((day, index) => {
          const dayStatus = day ? getTodoStatus(year, month, day) : '';
          const isSelected = day !== null && day === today;
          const dayClasses = `
            relative p-2.5 flex justify-center items-center overflow-hidden
            ${
              day ? 'cursor-pointer hover:bg-accent' : ''
            } // day가 null이 아닐 때만 커서 및 호버 적용
            ${isSelected ? 'bg-accent' : ''} // 선택된 날짜에만 적용
            ${
              dayStatus === 'doing' ? 'doing' : ''
            } // doing 상태 클래스 (::after용)
            ${
              dayStatus === 'done' ? 'done' : ''
            }   // done 상태 클래스 (::after용)
          `;
          return (
            <div
              onClick={() => handleDateClick(day)}
              key={index}
              className={dayClasses}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CalendarContent;

import { useDate, useTodos } from '../../hooks/useContext';

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
    <section className="bg-white border rounded-3xl h-[95%] overflow-hidden shadow-lg">
      {' '}
      {/* rounded-[1.5rem] -> rounded-3xl (Tailwind 기본값), shadow 추가 */}
      <div className="grid grid-cols-7 h-full">
        {' '}
        {/* 'gird' 오타 수정: grid */}
        {weekdayHeaders.map((header) => (
          <div
            key={header}
            className="p-2.5 text-center font-bold flex justify-center items-center text-gray-600 border-b border-gray-200" // pt-[0.625rem] -> p-2.5 (상하좌우), 색상 및 테두리 추가
          >
            {header}
          </div>
        ))}
        {days.map((day, index) => {
          const dayStatus = day ? getTodoStatus(year, month, day) : '';
          // 오늘 날짜와 현재 day가 같고, 같은 월에 있는지 확인
          const isSelected =
            day !== null &&
            day === today &&
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === month;

          const dayClasses = `
            relative p-2.5 flex justify-center items-center text-gray-800 text-lg
            ${day ? 'cursor-pointer hover:bg-blue-100' : 'text-gray-400'}
            ${
              isSelected ? 'bg-accent font-bold rounded-full text-red-500' : ''
            } // 문제의 원인
            ${dayStatus === 'doing' ? 'doing' : ''}
            ${dayStatus === 'done' ? 'done' : ''}
          `;

          return (
            <div
              onClick={() => handleDateClick(day)}
              key={index}
              className={`${dayClasses} text-gray-800`}
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

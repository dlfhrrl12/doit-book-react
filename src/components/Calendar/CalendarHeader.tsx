import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from 'react-icons/io';
import { monthNames } from '../../data/month';
import { useDate } from '../../hooks/useContext';

const CalendarHeader = () => {
  const { currentDate, updateCurrentDate } = useDate();

  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const handleUpdateDate = (value: number, type: 'm' | 'y') => {
    const newDate = new Date(currentDate);
    if (type === 'y') {
      newDate.setFullYear(
        currentDate.getFullYear() + value,
        currentDate.getMonth(),
        1
      );
    } else if (type === 'm') {
      newDate.setMonth(currentDate.getMonth() + value, 1);
    }
    updateCurrentDate(newDate);
  };

  const handleTodayClick = () => {
    updateCurrentDate(new Date());
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white rounded-t-3xl border-b border-gray-200">
      {/* 왼쪽: 연도 이동 버튼 */}
      <nav className="flex items-center space-x-1">
        {' '}
        {/* 버튼 간격 */}
        <button
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 text-3xl" /* 아이콘 크기를 조정 */
          onClick={() => handleUpdateDate(-1, 'y')}
        >
          <IoMdArrowDropleft />
        </button>
        <span className="text-xl font-semibold text-gray-800">{year}</span>
        <button
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 text-3xl"
          onClick={() => handleUpdateDate(1, 'y')}
        >
          <IoMdArrowDropright />
        </button>
      </nav>

      {/* 중앙: 오늘 날짜 버튼 */}
      <nav>
        <button
          className="py-1.5 px-3 bg-orange-500 text-white rounded-md font-bold whitespace-nowrap shadow-sm hover:opacity-90 transition-opacity" /* Tailwind 색상 사용 및 스타일 개선 */
          onClick={handleTodayClick}
        >
          오늘
        </button>
      </nav>

      {/* 오른쪽: 월 이동 버튼 */}
      <nav className="flex items-center space-x-1">
        {' '}
        {/* 버튼 간격 */}
        <button
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 text-2xl"
          onClick={() => handleUpdateDate(-1, 'm')}
        >
          <IoIosArrowBack />
        </button>
        <span className="text-xl font-semibold text-gray-800 w-24 text-center">
          {' '}
          {/* 월 이름을 위한 고정 너비와 중앙 정렬 */}
          {month}
        </span>
        <button
          className="p-1 rounded-full hover:bg-gray-100 text-gray-600 text-2xl"
          onClick={() => handleUpdateDate(1, 'm')}
        >
          <IoIosArrowForward />
        </button>
      </nav>
    </header>
  );
};

export default CalendarHeader;

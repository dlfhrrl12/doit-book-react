import CalendarContent from './CalendarContent';
import CalendarHeader from './CalendarHeader';

const Calendar = () => {
  return (
    <section className="flex flex-col gap-3">
      <CalendarHeader />
      <CalendarContent />
    </section>
  );
};

export default Calendar;

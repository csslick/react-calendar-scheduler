import { useState, useRef } from 'react';
import Infobox from './Infobox';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [saveKey, setSaveKey] = useState('');
  const [data, setData] = useState([
    {id: '2023-5-1', content: '일정 1'},
    {id: '2023-5-2', content: '일정 2'},
  ]);

  interface DataItem {
    id: string ;
    content: string;
  }

  const [todayData, setTodayData] = useState<DataItem | null>(null); 
  const inputRef = useRef<HTMLInputElement>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

  const dates = [];
  for (let i = 1; i <= lastDay; i++) {
    dates.push(i);
  }

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
      return prevMonth === 0 ? 11 : prevMonth - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
      return prevMonth === 11 ? 0 : prevMonth + 1;
    });
  };

  const getCalendarInfo = (e:React.MouseEvent<HTMLTableCellElement>) => {
    const saveKey = `${currentYear}-${currentMonth+1}-${e.currentTarget.innerText}`
    console.log(saveKey);
    setSaveKey(saveKey);
    const res = data.find(item => {
      return item.id == saveKey
    })
    console.log('find item = ', res);
    if(res) {
      setTodayData(res);
    } else {
      setTodayData(null);
    }
  }

  return (
    <div className='mt-4'>
      <button className='btn btn-dark' onClick={goToPreviousMonth}>이전달</button>&nbsp;
      <button className='btn btn-dark' onClick={goToNextMonth}>다음달</button>

      <table className='table mt-4 caption-top'>
        <caption>{currentYear}년 <b>{currentMonth + 1}월</b></caption>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((firstDay + lastDay) / 7) }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const dayNumber = weekIndex * 7 + dayIndex - firstDay + 1;
                const isCurrentMonth = dayNumber > 0 && dayNumber <= lastDay;
                // 달력 날짜와 같은 data 일정(날짜)이 존재하는지 확인
                const hasSchedule = data.find(item => {
                  let curDayInfo = `${currentYear}-${currentMonth+1}-${dayNumber}`
                  return item.id == curDayInfo;
                })
                return (
                  <td
                    // 일정이 있는 날은 스타일 지정
                    style={hasSchedule && {'background': '#0d6efd', 'color': 'white'}}
                    onClick={(e) => {
                      // 선택된 날짜와 일정 조회
                      getCalendarInfo(e);
                    }} 
                    key={dayIndex} 
                    className={(dayIndex % 6) == 0 ? 'text-red' : ''}>
                    {isCurrentMonth ? dayNumber : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <Infobox 
        data={data} 
        setData={setData} 
        setTodayData={setTodayData as any} 
        saveKey={saveKey} 
        todayData={todayData} 
        inputRef={inputRef} />
      
    </div>
  );
};

export default Calendar;

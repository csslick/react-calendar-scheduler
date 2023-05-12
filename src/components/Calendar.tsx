import { useState, useRef, useEffect } from 'react';
import Infobox from './Infobox';

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [saveKey, setSaveKey] = useState('');
  const [data, setData] = useState([]);

  // 앱 시작시 DB에서 데이터 가져오기
  useEffect(() => {
    console.log('mount1')
    const isData = localStorage.getItem('calendar');
    if(isData) setData(JSON.parse(isData));
  }, [])

  // DB 업데이트
  useEffect(() => {
    console.log('mount2, update');
    localStorage.setItem('calendar', JSON.stringify(data))
  }, [data])


  interface DataItem {
    id: string ;
    content: string;
  }

  const [todayData, setTodayData] = useState<DataItem | null>(null); 
  // 버튼 상태: 일정이 있으면 true 
  const [btnStatus, setBtnStatus] = useState<any>(false);
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
    // 빈 날짜가 아니면(달력을 올바르게 클릭했는지 채크)
    if(e.currentTarget.innerText) {
      setSaveKey(saveKey);
      // 해당 일에 일정이 있나?
      const res = data.find(item => {
        return item.id == saveKey
      })
      console.log('find item = ', res);
      // 클릭한 일에 일정이 있으면 저장
      if(res) {
        setTodayData(res);
        // 버튼 상태: 입력 | 수정
        setBtnStatus(true);
      } else {
        setTodayData(null);
        setBtnStatus(false);
      }
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
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
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
        inputRef={inputRef}
        btnStatus={btnStatus} 
        setBtnStatus={setBtnStatus}
      />
      
    </div>
  );
};

export default Calendar;

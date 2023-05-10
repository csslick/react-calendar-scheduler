import { useState, useRef } from 'react';

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
    id: string | undefined;
    content: string | undefined;
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
                return (
                  <td
                    onClick={(e) => {
                      const saveKey = `${currentYear}-${currentMonth+1}-${e.currentTarget.innerText}`
                      console.log(saveKey, dayIndex);
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

      <div className='info-box border p-3'>
        <p>{saveKey ? saveKey : '오늘의 스케쥴'}</p>
        <p>{todayData ? todayData.content : '일정없음'}</p>
        <div className="input-group">
          <input 
            ref={inputRef}
            className="form-control" 
            type="text" placeholder='여기에 일정 입력'/>
          <button 
            onClick={() => {
              // 날짜 선택 확인
              if(saveKey) {
                // 입력 확인
                if(inputRef.current?.value !== '') {
                  console.log(inputRef.current?.value);
                  const isSameData = data.find(item => {
                    return item.id === saveKey
                  })
                  // 같은 키의 자료가 없으면 일정 저장
                  if(!isSameData) {
                    let copy:any = [...data, {
                      id: saveKey,
                      content: inputRef.current?.value 
                    }]
                    setData(copy);
                    // 스케쥴 표시 업데이트
                    setTodayData({
                      id: saveKey, 
                      content: inputRef.current?.value 
                    });             
                  }
                  console.log('isSameData = ', isSameData)
                }
              } else {
                alert('날짜를 선택해주세요')
              }
            }} 
            className="btn btn-primary">입력</button>
        </div>
        {
          data.map((item) => {
            return (
              <p key={item.id}>{item.id}: {item.content}</p>
            )
          })
        }
      </div>
      
    </div>
  );
};

export default Calendar;

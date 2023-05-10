import React, { RefObject } from 'react'

interface InfoboxProps {
  data: { id: string, content: string }[];
  setData: (data: { id: string, content: string }[]) => void;
  setTodayData: (data: { id: string, content: string | undefined} | null) => void;
  saveKey: string;
  todayData: { id: string, content: string } | null;
  inputRef: RefObject<HTMLInputElement>;
}

export default function Infobox(props: InfoboxProps) {
  const { data, setData, setTodayData, saveKey, todayData, inputRef } = props;

  return (
    <div className='info-box border p-3'>
      <p>{saveKey ? saveKey : '오늘의 스케쥴'}</p>
      <p>{todayData ? todayData.content : '일정없음'}</p>
      <div className="input-group">
        <input
          ref={inputRef}
          className="form-control"
          type="text" placeholder='여기에 일정 입력' />
        <button
          onClick={() => {
            // 날짜 선택 확인
            if (saveKey) {
              // 입력 확인
              if (inputRef.current?.value !== '') {
                console.log(inputRef.current?.value);
                const isSameData = data.find(item => {
                  return item.id === saveKey
                })
                // 같은 키의 자료가 없으면 일정 저장
                if (!isSameData) {
                  let copy: any = [...data, {
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
      <h3 className='mt-4'>전체일정</h3>
      <ul className='list-group'>
        {
          data.reverse().map((item:{id:string, content:string}) => {
            return (
              <li
                className='list-group-item'
                key={item.id}>{item.id}: {item.content}</li>
            )
          })
        }
      </ul>
    </div>
  )

}
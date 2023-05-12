import { RefObject } from 'react'

interface InfoboxProps {
  data: { id: string, content: string }[];
  setData: (data: { id: string, content: string }[]) => void;
  setTodayData: (data: { id: string, content: string } | null) => void;
  saveKey: string;
  todayData: { id: string, content: string } | null;
  inputRef: RefObject<HTMLInputElement>;
  btnStatus: boolean | undefined;
  setBtnStatus: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function Infobox(props: InfoboxProps) {
  const { 
    data, 
    setData, 
    setTodayData, 
    saveKey, 
    todayData, 
    inputRef, 
    btnStatus, 
  } = props;

  return (
    <div className='info-box border p-3'>
      <p>{saveKey ? saveKey : '오늘의 스케쥴'}</p>
      <p>{todayData ? todayData.content : '일정없음'}</p>
      <div className="input-group">
        <input
          ref={inputRef}
          className="form-control"
          type="text" placeholder='여기에 일정 입력' />
        {
          // 일정이 있으면 수정 아니면 입력 버튼
          !btnStatus ? 
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
                    content: inputRef.current?.value || ""
                  });
                }
                console.log('isSameData = ', isSameData)
              }
            } else {
              alert('날짜를 선택해주세요')
            }
          }}
          className="btn btn-primary">입력</button> :
          <button 
            onClick={()=> {
              console.log('수정:', saveKey);
              const updateData = data.map(item => {
                if(item.id == saveKey) {
                  // 값이 있을 때만 수정
                  if(inputRef.current?.value) {
                    item.content = inputRef.current?.value;
                  }
                }
                return item;
              })
              setData(updateData);
            }}
            className="btn btn-warning">수정</button>
        }  

      </div>
      <h3 className='mt-4'>전체일정</h3>
      <ul className='list-group'>
        {
          data.map((item) => {
            return (
              <li
                className='list-group-item'
                key={item.id}>
                <span>{item.id}: {item.content}</span>
                <button 
                  className='btn btn-danger ms-2'
                  onClick={()=>{
                    console.log('delete ', item.id);
                    let delItem = data.filter(res => {
                      return item.id !== res.id;
                    })
                    let copy = [...delItem];
                    setData(copy);
                  }}
                >삭제</button>
              </li>
            )
          })
        }
      </ul>
    </div>
  )

}
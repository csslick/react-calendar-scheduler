# Calendar 일정 앱
demo: https://react-calendar-scheduler-gjut.vercel.app/

## 주요기능
1. 달력 기능
2. 이전달, 다음달 전환
3. 일정이 있는 날의 위치 강조
4. 스케쥴 표시 UI(달력 하단)
  - 일정 삭제
  - 추가 및 수정
    - 일정이 없으면 입력 버튼으로 입력
    - 일정이 있을때만 일정 정보 표시, 수정 버튼으로 수정
5. local storage에 저장(useEffec로 변경상태 관리)
<br><br>

## 이슈
  - [x] 달력 빈 영역을 클릭시 예외 처리
  - [ ] 목록의 내림차순 정렬
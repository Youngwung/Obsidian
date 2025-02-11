---
created: <% tp.date.now('YY-MM-DD') %>
updates:
  - date: <% tp.date.now('YY-MM-DD') %>
    content: 내용 작성
tags:
  - 상위폴더/서브폴더
  - 지식관리
---
# 수정 이력
```dataview
table update.date as "수정 날짜", update.content as "수정 내용"
where file.folder = this.file.folder and file.name != this.file.name and updates
flatten updates as update 
sort update.date desc
```

#  제목 작성

## 학습 목표
- 학습 목표 작성
## 개념 구조
### 1. 
- [[]]
  - [[]]

### 2. 
- [[]]
  - [[]]

### 3. 
- [[]]
  - [[]]

## 학습 진행 현황
- [ ] 체크리스트


## 주요 질문들
<!-- 이 주제와 관련된 중요한 질문들을 모아봅니다 -->

## 📚 핵심 참고자료
<!-- 답변을 찾은 출처나 추가 학습에 도움이 될 자료들의 링크를 기록합니다 --> 
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
where contains(file.folder, this.file.folder) 
    and file.name != this.file.name 
    and updates
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

# 미작성 백링크 리스트
```dataviewjs

// 현재 파일의 폴더 경로를 가져옵니다.
const folderPath = dv.current().file.folder;

// 현재 폴더 내의 모든 마크다운 파일을 가져옵니다.
const filesInFolder = app.vault.getMarkdownFiles().filter(f => f.path.startsWith(folderPath + "/"));

// 모든 파일의 링크를 검사하여 존재하지 않는 링크들을 수집합니다.
let unresolvedLinks = new Set();

for (let file of filesInFolder) {
    let cache = app.metadataCache.getFileCache(file);
    if (cache && cache.links) {
        for (let link of cache.links) {
            let linkedFile = app.metadataCache.getFirstLinkpathDest(link.link, file.path);
            if (!linkedFile) {
                unresolvedLinks.add(link.link);
            }
        }
    }
}

// 수집된 링크들을 배열로 변환하고, 링크 형식으로 감싸줍니다.
let linkArray = Array.from(unresolvedLinks).map(link => `[[${link}]]`);

// 링크들의 리스트를 출력합니다.
dv.list(linkArray);

```
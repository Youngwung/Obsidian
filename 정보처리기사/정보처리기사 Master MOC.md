---
tags:
  - 정보처리기사
  - 지식관리
---
#  노트 리스트
```dataview
table regexreplace(regexreplace(file.folder, ".*/", ""), "\\d+\\.\\s*", "" ) as "폴더", choice(contains(tags, "핵심"), "핵심", "보조") as "구분", priority as "prio", file.mtime as "수정시간", note
from ""
where contains(file.folder, this.file.folder)  and (contains(tags, "핵심") or contains(tags, "보조"))
sort file.folder desc, choice(contains(tags, "핵심"), 0, 1) asc, file.ctime asc

```

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

# Require Review List
```dataview
table regexreplace(regexreplace(file.folder, ".*/", ""), "\\d+\\.\\s*", "" ) as "폴더", choice(contains(tags, "핵심"), "핵심", "보조") as "구분", priority, file.mtime as "수정시간" from "" where contains(file.folder, this.file.folder)  and (contains(tags, "핵심") or contains(tags, "보조")) and (date(now) - file.mtime) > dur(7 days) sort file.folder desc, choice(contains(tags, "핵심"), 0, 1) asc, file.ctime asc
```

# 학습 목표
- 학습 목표 작성

# 학습 진행 현황
- [ ] 체크리스트

# 주요 질문들
<!-- 이 주제와 관련된 중요한 질문들을 모아봅니다 -->

# 📚 핵심 참고자료
<!-- 답변을 찾은 출처나 추가 학습에 도움이 될 자료들의 링크를 기록합니다 --> 


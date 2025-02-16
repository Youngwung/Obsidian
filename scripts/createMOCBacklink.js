async function createMOCBacklink(tp) {
  // 현재 노트의 전체 경로 (예: "정보처리기사/섹션1/지식노트.md")
  let filePath = tp.file.path(true);
  
  // 경로를 슬래시("/") 기준으로 분할
  let parts = filePath.split("/");
  
  // 주제 폴더는 경로의 첫번째 요소로 가정 (예: "정보처리기사")
  let subjectFolder = parts[0];
  
  // 주제 폴더 이름을 이용해 Master MOC의 제목 생성
  let masterTitle = subjectFolder + " Master MOC";
  
  // 백링크 형식의 문자열 반환
  return `- [[${masterTitle}]]`;
}

module.exports = createMOCBacklink;

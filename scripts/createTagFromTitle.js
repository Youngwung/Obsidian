async function createTagFromTitle(tp) {
  let title = tp.file.title;
  // 1. 공백 모두 제거
  let tag = title.replace(/\s+/g, '');
  // 2. 괄호와 괄호 내 문자열 제거 (여러 개의 괄호도 처리)
  tag = tag.replace(/\(.*?\)/g, '');
  // 3. 특수문자 제거 (영어, 숫자, 한글, 슬래시 제외)
  tag = tag.replace(/[^A-Za-z0-9가-힣\/]/g, '');
  
  // 결과 문자열 생성
  let result = `  - ${tag}`;
  return result;
}

module.exports = createTagFromTitle;
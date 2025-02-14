# Vault 폴더 구조

<%*
// 1. 현재 볼트의 모든 파일을 가져옴
const files = app.vault.getFiles();

// 1-1. 제외할 폴더 이름을 설정 (원하는 폴더 이름으로 수정)
const excludeFolders = ["Template", ".git", ".obsidian", ".trash", "Excalidraw"];

// 1-2. 파일 경로에 제외할 폴더가 포함되어 있으면 해당 파일을 제외
const filteredFiles = files.filter(file => {
  const parts = file.path.split("/");
  return !parts.some(part => excludeFolders.includes(part));
});

// 2. 파일 경로를 기반으로 폴더 트리 구조를 생성하는 함수
function buildTree(files) {
  let tree = {};
  files.forEach(file => {
    const parts = file.path.split('/');
    let current = tree;
    parts.forEach((part, index) => {
      if (!current[part]) {
        // 마지막이면 파일(true)로 표시, 아니면 폴더({})
        current[part] = (index === parts.length - 1) ? { _isFile: true, file: file } : {};
      }
      current = current[part];
    });
  });
  return tree;
}

// 3. 트리 구조를 재귀적으로 순회하며 마크다운 리스트를 생성하는 함수
function renderTree(tree, parentPath="") {
  let output = "";
  // 보기 좋게 정렬
  const keys = Object.keys(tree).filter(k => k !== "_isFile").sort();
  for (const key of keys) {
    const node = tree[key];
    const fullPath = parentPath ? `${parentPath}/${key}` : key;
    if (node._isFile) {
      // 파일인 경우, Obsidian 링크 생성 (파일명을 클릭하면 해당 노트 열림)
      output += `- [${key}](obsidian://open?vault=${encodeURIComponent(app.vault.getName())}&file=${encodeURIComponent(fullPath)})\n`;
    } else {
      // 폴더인 경우: 폴더명은 굵게 표시하고, 하위 항목은 들여쓰기
      output += `- **${key}**\n`;
      const childOutput = renderTree(node, fullPath)
        .split('\n')
        .map(line => line ? "  " + line : "")
        .join('\n');
      output += childOutput + "\n";
    }
  }
  return output;
}

// 4. 필터링된 파일 목록으로 트리 구조 생성 및 출력
const tree = buildTree(filteredFiles);
tR += renderTree(tree);
%>

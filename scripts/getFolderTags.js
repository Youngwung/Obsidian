async function getFolderTags(tp) {
	// 현재 파일의 상대 경로 가져오기 (파일명 포함)
	const fullPath = tp.file.path(true);
	
	// 파일명을 제외한 폴더 경로만 추출
	const folderPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
	
	// 루트 폴더가 아닌 경우에만 처리
	if (!folderPath || folderPath === '/') {
			return '';
	}

	// 폴더 경로를 배열로 분할하고 빈 문자열 제거
	const folders = folderPath.split('/').filter(f => f !== '');
	
	// 태그 생성 함수
	function sanitizeTag(text) {
			return text
					// 숫자. 로 시작하는 패턴 제거 (예: "1. ", "12. ", "123. " 등)
					.replace(/^\d+\.\s+/, '')
					// 공백 제거
					.replace(/\s+/g, '')
					// 특수문자 처리
					.replace(/[&+$~=\\/:?<>{}()[\]^%!@*#]/g, '_')
					// 연속된 언더스코어 제거
					.replace(/_+/g, '_')
					// 시작과 끝의 언더스코어 제거
					.replace(/^_|_$/g, '');
	}

	// 태그 생성
	let tags = [];
	let currentPath = '';
	
	// 첫 번째 폴더(루트 다음 폴더)부터 시작
	if (folders.length > 0) {
			currentPath = sanitizeTag(folders[0]);
			tags.push(currentPath);
			
			// 나머지 폴더들에 대해 계층적 태그 생성
			for (let i = 1; i < folders.length; i++) {
					currentPath += '/' + sanitizeTag(folders[i]);
					tags.push(currentPath);
			}
	}

	// YAML 형식으로 태그 반환
	return tags.map(tag => `  - ${tag}`).join('\n');
}

module.exports = getFolderTags;
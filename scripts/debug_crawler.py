import requests
from bs4 import BeautifulSoup
import json

def debug_site_structure():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    sites = [
        {
            'name': 'CGV',
            'url': 'http://www.cgv.co.kr/culture-event/event/'
        },
        {
            'name': '메가박스',
            'url': 'https://www.megabox.co.kr/event/curtaincall'
        },
        {
            'name': '롯데시네마',
            'url': 'https://www.lottecinema.co.kr/NLCHS/Event'
        },
        {
            'name': 'MaxMovie',
            'url': 'https://www.maxmovie.com/event'
        }
    ]
    
    for site in sites:
        print(f"\n{'='*50}")
        print(f"{site['name']} 분석")
        print(f"{'='*50}")
        
        try:
            response = requests.get(site['url'], headers=headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # 제목이 있을 만한 요소들 찾기
            title_candidates = []
            
            # h1, h2, h3 태그들
            for tag in ['h1', 'h2', 'h3', 'h4']:
                elements = soup.find_all(tag)
                for elem in elements[:3]:  # 처음 3개만
                    text = elem.get_text(strip=True)
                    if text and len(text) > 5:
                        title_candidates.append({
                            'tag': tag,
                            'class': elem.get('class', []),
                            'text': text
                        })
            
            # 특정 클래스를 가진 요소들
            class_patterns = ['title', 'event', 'name', 'subject', 'heading']
            for pattern in class_patterns:
                elements = soup.find_all(class_=lambda x: x and pattern in x.lower())
                for elem in elements[:3]:
                    text = elem.get_text(strip=True)
                    if text and len(text) > 5:
                        title_candidates.append({
                            'tag': elem.name,
                            'class': elem.get('class', []),
                            'text': text
                        })
            
            # 링크 텍스트들
            links = soup.find_all('a', href=True)
            for link in links[:5]:
                text = link.get_text(strip=True)
                if text and len(text) > 5 and not text.isdigit():
                    title_candidates.append({
                        'tag': 'a',
                        'href': link.get('href'),
                        'text': text
                    })
            
            print(f"발견된 제목 후보들:")
            for i, candidate in enumerate(title_candidates[:10]):
                print(f"{i+1}. {candidate}")
            
            # 페이지 구조 분석
            print(f"\n페이지 구조:")
            print(f"- 제목 후보: {len(title_candidates)}개")
            print(f"- 전체 링크: {len(links)}개")
            
        except Exception as e:
            print(f"오류: {e}")

if __name__ == "__main__":
    debug_site_structure() 
import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
from datetime import datetime, timedelta
import time
import random
import os
import re

class ImprovedMovieEventCrawler:
    def __init__(self):
        self.events = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def clean_title(self, title):
        """제목 정리 및 개선 - 강화된 필터링"""
        if not title:
            return ""
        
        # 불필요한 문자 제거
        title = re.sub(r'[^\w\s가-힣\[\]()<>]', '', title)
        title = title.strip()
        
        # 너무 짧은 제목 필터링
        if len(title) < 5:
            return ""
        
        # 의미없는 제목 필터링 - 강화된 버전
        meaningless = [
            '더보기', '이전', '다음', '닫기', '보기', '이벤트', 'EVENT',
            '사업자정보확인', '당첨자발표', '당첨자', '발표', '확인',
            '공지사항', '안내', '알림', '정보', '관련', '문의',
            '고객센터', '고객지원', '고객서비스', '고객안내',
            '이용약관', '개인정보처리방침', '개인정보', '약관',
            '로그인', '회원가입', '마이페이지', '예매', '예약',
            '상영시간', '상영관', '영화관', '극장', '매장',
            '홈', '메인', '메뉴', '검색', '찾기', '바로가기',
            '새창', '팝업', '레이어', '모달', '다이얼로그',
            '버튼', '링크', '클릭', '터치', '스와이프',
            '로딩', '로드', '업로드', '다운로드', '업데이트',
            '새로고침', '새로고침', '새로고침', '새로고침',
            'copyright', 'all rights reserved', 'copyright',
            '주식회사', '㈜', '(주)', '유한회사', '(유)',
            'corporation', 'company', 'inc', 'ltd', 'co',
            '서울', '부산', '대구', '인천', '광주', '대전', '울산',
            '강남', '강북', '강서', '강동', '서초', '송파',
            '마포', '영등포', '용산', '성동', '광진', '동대문',
            '중랑', '성북', '강북', '도봉', '노원', '은평',
            '양천', '구로', '금천', '동작', '관악', '서초',
            '강남', '송파', '강동', '광주', '경기', '인천',
            '부산', '대구', '울산', '대전', '세종', '충북',
            '충남', '전북', '전남', '경북', '경남', '제주'
        ]
        
        # 정확히 일치하는 경우 제외
        if title.lower() in [word.lower() for word in meaningless]:
            return ""
        
        # 포함하는 경우도 제외 (더 엄격하게)
        for word in meaningless:
            if word.lower() in title.lower():
                return ""
        
        # 숫자만 있는 경우 제외
        if re.match(r'^[\d\s\-\.]+$', title):
            return ""
        
        # 특수문자만 있는 경우 제외
        if re.match(r'^[^\w가-힣]+$', title):
            return ""
        
        return title
    
    def is_movie_related(self, title):
        """영화 관련 이벤트인지 확인"""
        if not title:
            return False
        
        # 영화 관련 키워드
        movie_keywords = [
            '시사회', '프리미어', '개봉', '상영', '영화', '무비', 'movie',
            '감독', '배우', '주연', '조연', '출연', '연출', '제작',
            '스틸컷', '포스터', '예고편', '트레일러', '메이킹',
            '인터뷰', '토크', '팬미팅', '사인회', '오프라인',
            '굿즈', '기념품', '포토카드', '포토존', '체험',
            '이벤트', '행사', '프로모션', '캠페인', '콘서트',
            '페스티벌', '영화제', '어워드', '시상식', '수상',
            '특별', '한정', '단독', '독점', '최초', '최고',
            '블라인드', '미리보기', '시연', '체험관', '전시',
            '갤러리', '박물관', '아카이브', '컬렉션', '전시회'
        ]
        
        title_lower = title.lower()
        for keyword in movie_keywords:
            if keyword in title_lower:
                return True
        
        return False
    
    def extract_image_url(self, element, base_url):
        """이미지 URL 추출"""
        # img 태그에서 src 추출
        img = element.find('img')
        if img:
            src = img.get('src') or img.get('data-src')
            if src:
                if src.startswith('http'):
                    return src
                elif src.startswith('//'):
                    return 'https:' + src
                else:
                    return base_url + src
        
        # background-image 스타일에서 추출
        style = element.get('style', '')
        bg_match = re.search(r'background-image:\s*url\(["\']?([^"\']+)["\']?\)', style)
        if bg_match:
            src = bg_match.group(1)
            if src.startswith('http'):
                return src
            elif src.startswith('//'):
                return 'https:' + src
            else:
                return base_url + src
        
        return None
    
    def crawl_cgv_events(self):
        """CGV 이벤트 크롤링 - 개선된 버전"""
        try:
            print("CGV 이벤트 크롤링 시작...")
            
            # CGV 이벤트 페이지 URL들
            urls = [
                "http://www.cgv.co.kr/event/eventList.aspx",
                "http://www.cgv.co.kr/culture-event/event/"
            ]
            
            for url in urls:
                try:
                    response = requests.get(url, headers=self.headers, timeout=10)
                    response.raise_for_status()
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # CGV 이벤트 요소 찾기 - 더 구체적인 선택자
                    event_elements = (
                        soup.find_all('div', class_='event_card') or
                        soup.find_all('div', class_='event-item') or
                        soup.find_all('li', class_='event-list') or
                        soup.find_all('div', class_='event') or
                        soup.find_all('article') or
                        soup.find_all('a', href=lambda x: x and 'event' in x and 'detail' in x)
                    )
                    
                    print(f"CGV {url}에서 {len(event_elements)}개 이벤트 요소 발견")
                    
                    for element in event_elements[:8]:
                        try:
                            # 제목 추출 - 다양한 방법 시도
                            title = ""
                            title_selectors = [
                                'h3', 'h2', 'h1', 'strong', 'span.title', 
                                'div.title', 'p.title', 'a', '.event-title'
                            ]
                            
                            for selector in title_selectors:
                                title_elem = element.find(selector)
                                if title_elem:
                                    title = title_elem.get_text(strip=True)
                                    if self.clean_title(title) and self.is_movie_related(title):
                                        break
                            
                            # 제목이 없으면 전체 텍스트에서 추출
                            if not title:
                                title = element.get_text(strip=True)
                                # 첫 번째 의미있는 텍스트 추출
                                lines = [line.strip() for line in title.split('\n') if line.strip()]
                                for line in lines:
                                    if self.clean_title(line) and self.is_movie_related(line) and len(line) > 5:
                                        title = line
                                        break
                            
                            title = self.clean_title(title)
                            if not title or not self.is_movie_related(title):
                                continue
                            
                            # 이미지 URL 추출
                            image_url = self.extract_image_url(element, "https://www.cgv.co.kr")
                            if not image_url:
                                image_url = f"https://picsum.photos/300/200?random={len(self.events) + 1}"
                            
                            # 링크 추출
                            link_elem = element.find('a')
                            link = link_elem.get('href') if link_elem else "https://www.cgv.co.kr/event"
                            if link and not link.startswith('http'):
                                link = "https://www.cgv.co.kr" + link
                            
                            # 날짜 추출 시도
                            date_elem = element.find('span', class_='date') or element.find('div', class_='date')
                            if date_elem:
                                date_text = date_elem.get_text(strip=True)
                                # 날짜 파싱 로직 (실제로는 더 복잡)
                                date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                            else:
                                date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                            
                            location = random.choice(["CGV 강남", "CGV 잠실", "CGV 홍대", "CGV 신촌", "CGV 부산", "CGV 대구"])
                            
                            event = {
                                "id": f"cgv_{len(self.events) + 1}",
                                "title": title,
                                "description": f"{title} - CGV에서 진행되는 특별한 이벤트입니다.",
                                "date": date,
                                "location": location,
                                "type": random.choice(["시사회", "굿즈배포", "프로모션", "체험", "행사"]),
                                "genre": random.choice(["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]),
                                "image": image_url,
                                "source": "CGV",
                                "link": link,
                                "created_at": datetime.now().isoformat()
                            }
                            
                            self.events.append(event)
                            print(f"CGV 이벤트 추가: {title}")
                            
                        except Exception as e:
                            print(f"CGV 이벤트 요소 파싱 오류: {e}")
                            continue
                    
                    time.sleep(random.uniform(1, 2))
                    
                except Exception as e:
                    print(f"CGV URL {url} 크롤링 오류: {e}")
                    continue
            
            print(f"CGV에서 {len([e for e in self.events if e['source'] == 'CGV'])}개 이벤트 수집")
                
        except Exception as e:
            print(f"CGV 크롤링 전체 오류: {e}")
    
    def crawl_megabox_events(self):
        """메가박스 이벤트 크롤링 - 개선된 버전"""
        try:
            print("메가박스 이벤트 크롤링 시작...")
            
            # 메가박스 이벤트 페이지 URL
            url = "https://www.megabox.co.kr/event/curtaincall"
            
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # 메가박스 이벤트 요소 찾기
                event_elements = (
                    soup.find_all('div', class_='event-item') or
                    soup.find_all('li', class_='event-list') or
                    soup.find_all('div', class_='event') or
                    soup.find_all('article') or
                    soup.find_all('a', href=lambda x: x and 'event' in x) or
                    soup.find_all('div', class_='event-slider')
                )
                
                print(f"메가박스에서 {len(event_elements)}개 이벤트 요소 발견")
                
                for element in event_elements[:10]:
                    try:
                        # 제목 추출
                        title = ""
                        title_selectors = [
                            'h3', 'h2', 'h1', 'strong', 'span.title', 
                            'div.title', 'p.title', 'a', '.event-title', 'p.name'
                        ]
                        
                        for selector in title_selectors:
                            title_elem = element.find(selector)
                            if title_elem:
                                title = title_elem.get_text(strip=True)
                                if self.clean_title(title) and self.is_movie_related(title):
                                    break
                        
                        # 제목이 없으면 전체 텍스트에서 추출
                        if not title:
                            title = element.get_text(strip=True)
                            lines = [line.strip() for line in title.split('\n') if line.strip()]
                            for line in lines:
                                if self.clean_title(line) and self.is_movie_related(line) and len(line) > 5:
                                    title = line
                                    break
                        
                        title = self.clean_title(title)
                        if not title or not self.is_movie_related(title):
                            continue
                        
                        # 이미지 URL 추출
                        image_url = self.extract_image_url(element, "https://www.megabox.co.kr")
                        if not image_url:
                            image_url = f"https://picsum.photos/300/200?random={len(self.events) + 200}"
                        
                        # 링크 추출
                        link_elem = element.find('a')
                        link = link_elem.get('href') if link_elem else "https://www.megabox.co.kr"
                        if link and not link.startswith('http'):
                            link = "https://www.megabox.co.kr" + link
                        
                        date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                        location = random.choice(["메가박스 코엑스", "메가박스 강남", "메가박스 홍대", "메가박스 부산", "메가박스 대구"])
                        
                        event = {
                            "id": f"megabox_{len(self.events) + 1}",
                            "title": title,
                            "description": f"{title} - 메가박스에서 진행되는 특별한 이벤트입니다.",
                            "date": date,
                            "location": location,
                            "type": random.choice(["시사회", "굿즈배포", "프로모션", "체험", "행사"]),
                            "genre": random.choice(["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]),
                            "image": image_url,
                            "source": "메가박스",
                            "link": link,
                            "created_at": datetime.now().isoformat()
                        }
                        
                        self.events.append(event)
                        print(f"메가박스 이벤트 추가: {title}")
                        
                    except Exception as e:
                        print(f"메가박스 이벤트 요소 파싱 오류: {e}")
                        continue
                
                print(f"메가박스에서 {len([e for e in self.events if e['source'] == '메가박스'])}개 이벤트 수집")
                
            except Exception as e:
                print(f"메가박스 크롤링 오류: {e}")
                
        except Exception as e:
            print(f"메가박스 크롤링 전체 오류: {e}")
    
    def crawl_maxmovie_events(self):
        """MaxMovie 이벤트 크롤링 - 개선된 버전"""
        try:
            print("MaxMovie 이벤트 크롤링 시작...")
            
            # MaxMovie 이벤트 페이지 URL
            url = "https://www.maxmovie.com/event"
            
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # MaxMovie 이벤트 요소 찾기 - 실제 구조에 맞게 수정
                event_elements = (
                    soup.find_all('h3') or
                    soup.find_all('article', class_='eventWrap') or
                    soup.find_all('li', class_='EventData__EventDataBlock-sc-1jd0eu4-0') or
                    soup.find_all('div', class_='event-item') or
                    soup.find_all('a', href=lambda x: x and 'event' in x)
                )
                
                print(f"MaxMovie에서 {len(event_elements)}개 이벤트 요소 발견")
                
                for i, element in enumerate(event_elements[:15]):  # 최대 15개
                    try:
                        # 제목 추출 - h3 태그에서 직접 추출
                        title = ""
                        if element.name == 'h3':
                            title = element.get_text(strip=True)
                        else:
                            # 다른 요소에서 텍스트 추출
                            title_elem = element.find('h3') or element
                            title = title_elem.get_text(strip=True)
                        
                        title = self.clean_title(title)
                        if not title or not self.is_movie_related(title):
                            continue
                        
                        # 설명 추출
                        desc_elem = element.find('p') or element.find('div', class_='description')
                        description = desc_elem.get_text(strip=True) if desc_elem else f"{title} - MaxMovie에서 진행되는 특별한 이벤트입니다."
                        
                        # 이미지 추출 - 개선된 버전
                        image_url = self.extract_image_url(element, "https://www.maxmovie.com")
                        if not image_url:
                            image_url = f"https://picsum.photos/300/200?random={len(self.events) + 300}"
                        
                        # 링크 추출
                        link_elem = element.find('a')
                        link = link_elem.get('href') if link_elem else "https://www.maxmovie.com/event"
                        if link and not link.startswith('http'):
                            link = f"https://www.maxmovie.com{link}"
                        
                        # 날짜 (실제로는 페이지에서 추출해야 함)
                        date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                        
                        # 위치 (실제로는 페이지에서 추출해야 함)
                        location = random.choice(["MaxMovie 온라인", "MaxMovie 앱", "MaxMovie 웹사이트", "전국 영화관"])
                        
                        event = {
                            "id": f"maxmovie_{len(self.events) + 1}",
                            "title": title,
                            "description": description,
                            "date": date,
                            "location": location,
                            "type": random.choice(["시사회", "굿즈배포", "프로모션", "체험", "행사", "이벤트"]),
                            "genre": random.choice(["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러", "애니메이션"]),
                            "image": image_url,
                            "source": "MaxMovie",
                            "link": link,
                            "created_at": datetime.now().isoformat()
                        }
                        
                        self.events.append(event)
                        print(f"MaxMovie 이벤트 추가: {title}")
                        
                    except Exception as e:
                        print(f"MaxMovie 이벤트 요소 파싱 오류: {e}")
                        continue
                
                print(f"MaxMovie에서 {len([e for e in self.events if e['source'] == 'MaxMovie'])}개 이벤트 수집")
                
            except Exception as e:
                print(f"MaxMovie 크롤링 오류: {e}")
                
        except Exception as e:
            print(f"MaxMovie 크롤링 전체 오류: {e}")
    
    def save_events(self):
        """이벤트 데이터를 JSON 파일로 저장"""
        try:
            # public/data 디렉토리가 없으면 생성
            os.makedirs('public/data', exist_ok=True)
            
            with open('public/data/events.json', 'w', encoding='utf-8') as f:
                json.dump(self.events, f, ensure_ascii=False, indent=2)
            print(f"총 {len(self.events)}개 이벤트를 events.json에 저장했습니다.")
            
            # CSV 파일로도 저장 (분석용)
            df = pd.DataFrame(self.events)
            df.to_csv('public/data/events.csv', index=False, encoding='utf-8-sig')
            print("이벤트 데이터를 CSV 파일로도 저장했습니다.")
            
        except Exception as e:
            print(f"파일 저장 오류: {e}")
    
    def run(self):
        """크롤링 실행"""
        print("=" * 50)
        print("개선된 영화 이벤트 크롤링을 시작합니다...")
        print("의미없는 텍스트 필터링 강화!")
        print("=" * 50)
        
        start_time = time.time()
        
        # 모든 사이트 크롤링 실행
        self.crawl_cgv_events()
        self.crawl_megabox_events()
        self.crawl_maxmovie_events()
        
        # 데이터 저장
        self.save_events()
        
        end_time = time.time()
        print("=" * 50)
        print(f"크롤링이 완료되었습니다! (소요시간: {end_time - start_time:.2f}초)")
        print(f"총 {len(self.events)}개의 이벤트를 수집했습니다.")
        print("=" * 50)

if __name__ == "__main__":
    crawler = ImprovedMovieEventCrawler()
    crawler.run() 
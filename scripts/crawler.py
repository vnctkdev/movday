import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
from datetime import datetime, timedelta
import time
import random
import os

class MovieEventCrawler:
    def __init__(self):
        self.events = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def crawl_cgv_events(self):
        """CGV 이벤트 크롤링"""
        try:
            print("CGV 이벤트 크롤링 시작...")
            
            # CGV 이벤트 페이지 URL들
            urls = [
                "https://www.cgv.co.kr/event/eventList.aspx",
                "https://www.cgv.co.kr/event/eventList.aspx?page=2",
                "https://www.cgv.co.kr/event/eventList.aspx?page=3"
            ]
            
            for url in urls:
                try:
                    response = requests.get(url, headers=self.headers, timeout=10)
                    response.raise_for_status()
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # CGV 이벤트 카드 찾기
                    event_cards = soup.find_all('div', class_='event_card')
                    
                    for card in event_cards[:5]:  # 각 페이지당 최대 5개
                        try:
                            title_elem = card.find('h3', class_='event_title')
                            title = title_elem.get_text(strip=True) if title_elem else "CGV 이벤트"
                            
                            # 날짜 정보 추출 (실제로는 더 복잡한 파싱이 필요)
                            date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                            
                            # 위치 정보
                            location = random.choice(["CGV 강남", "CGV 잠실", "CGV 홍대", "CGV 신촌", "CGV 부산", "CGV 대구"])
                            
                            event = {
                                "id": f"cgv_{len(self.events) + 1}",
                                "title": title,
                                "description": f"{title} - CGV에서 진행되는 특별한 이벤트입니다.",
                                "date": date,
                                "location": location,
                                "type": random.choice(["시사회", "굿즈배포", "프로모션", "체험", "행사"]),
                                "genre": random.choice(["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]),
                                "image": f"https://picsum.photos/300/200?random={len(self.events) + 1}",
                                "source": "CGV",
                                "link": "https://www.cgv.co.kr/event",
                                "created_at": datetime.now().isoformat()
                            }
                            
                            self.events.append(event)
                            
                        except Exception as e:
                            print(f"CGV 이벤트 카드 파싱 오류: {e}")
                            continue
                    
                    time.sleep(random.uniform(1, 3))  # 요청 간격
                    
                except Exception as e:
                    print(f"CGV URL {url} 크롤링 오류: {e}")
                    continue
            
            print(f"CGV에서 {len([e for e in self.events if e['source'] == 'CGV'])}개 이벤트 수집")
            
        except Exception as e:
            print(f"CGV 크롤링 전체 오류: {e}")
    
    def crawl_lotte_events(self):
        """롯데시네마 이벤트 크롤링"""
        try:
            print("롯데시네마 이벤트 크롤링 시작...")
            
            # 롯데시네마 이벤트 페이지 URL
            url = "https://www.lottecinema.co.kr/NLCHS/Event"
            
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # 롯데시네마 이벤트 요소 찾기 (실제 구조에 맞게 수정 필요)
                event_elements = soup.find_all('div', class_='event_item') or soup.find_all('li', class_='event')
                
                for i, element in enumerate(event_elements[:8]):
                    try:
                        title_elem = element.find('h3') or element.find('strong') or element.find('a')
                        title = title_elem.get_text(strip=True) if title_elem else f"롯데시네마 이벤트 {i+1}"
                        
                        date = (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d")
                        location = random.choice(["롯데시네마 홍대", "롯데시네마 신촌", "롯데시네마 잠실", "롯데시네마 광주", "롯데시네마 부산"])
                        
                        event = {
                            "id": f"lotte_{len(self.events) + 1}",
                            "title": title,
                            "description": f"{title} - 롯데시네마에서 진행되는 특별한 이벤트입니다.",
                            "date": date,
                            "location": location,
                            "type": random.choice(["시사회", "굿즈배포", "프로모션", "체험", "행사"]),
                            "genre": random.choice(["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]),
                            "image": f"https://picsum.photos/300/200?random={len(self.events) + 100}",
                            "source": "롯데시네마",
                            "link": "https://www.lottecinema.co.kr",
                            "created_at": datetime.now().isoformat()
                        }
                        
                        self.events.append(event)
                        
                    except Exception as e:
                        print(f"롯데시네마 이벤트 요소 파싱 오류: {e}")
                        continue
                
                print(f"롯데시네마에서 {len([e for e in self.events if e['source'] == '롯데시네마'])}개 이벤트 수집")
                
            except Exception as e:
                print(f"롯데시네마 크롤링 오류: {e}")
                
        except Exception as e:
            print(f"롯데시네마 크롤링 전체 오류: {e}")
    
    def crawl_megabox_events(self):
        """메가박스 이벤트 크롤링"""
        try:
            print("메가박스 이벤트 크롤링 시작...")
            
            # 메가박스 이벤트 페이지 URL
            url = "https://www.megabox.co.kr/event"
            
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # 메가박스 이벤트 요소 찾기 (실제 구조에 맞게 수정 필요)
                event_elements = soup.find_all('div', class_='event-item') or soup.find_all('li', class_='event-list')
                
                for i, element in enumerate(event_elements[:6]):
                    try:
                        title_elem = element.find('h3') or element.find('strong') or element.find('a')
                        title = title_elem.get_text(strip=True) if title_elem else f"메가박스 이벤트 {i+1}"
                        
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
                            "image": f"https://picsum.photos/300/200?random={len(self.events) + 200}",
                            "source": "메가박스",
                            "link": "https://www.megabox.co.kr",
                            "created_at": datetime.now().isoformat()
                        }
                        
                        self.events.append(event)
                        
                    except Exception as e:
                        print(f"메가박스 이벤트 요소 파싱 오류: {e}")
                        continue
                
                print(f"메가박스에서 {len([e for e in self.events if e['source'] == '메가박스'])}개 이벤트 수집")
                
            except Exception as e:
                print(f"메가박스 크롤링 오류: {e}")
                
        except Exception as e:
            print(f"메가박스 크롤링 전체 오류: {e}")
    
    def crawl_maxmovie_events(self):
        """MaxMovie 이벤트 크롤링"""
        try:
            print("MaxMovie 이벤트 크롤링 시작...")
            
            # MaxMovie 이벤트 페이지 URL
            url = "https://www.maxmovie.com/event"
            
            try:
                response = requests.get(url, headers=self.headers, timeout=10)
                response.raise_for_status()
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # MaxMovie 이벤트 요소 찾기
                event_elements = soup.find_all('div', class_='event-item') or \
                                soup.find_all('li', class_='event-list') or \
                                soup.find_all('div', class_='event') or \
                                soup.find_all('article') or \
                                soup.find_all('div', class_='list-item')
                
                print(f"MaxMovie에서 {len(event_elements)}개 이벤트 요소 발견")
                
                for i, element in enumerate(event_elements[:10]):  # 최대 10개
                    try:
                        # 제목 추출
                        title_elem = (element.find('h3') or 
                                    element.find('h2') or 
                                    element.find('h1') or 
                                    element.find('strong') or 
                                    element.find('a') or
                                    element.find('div', class_='title'))
                        title = title_elem.get_text(strip=True) if title_elem else f"MaxMovie 이벤트 {i+1}"
                        
                        # 설명 추출
                        desc_elem = (element.find('p') or 
                                   element.find('div', class_='description') or
                                   element.find('div', class_='summary'))
                        description = desc_elem.get_text(strip=True) if desc_elem else f"{title} - MaxMovie에서 진행되는 특별한 이벤트입니다."
                        
                        # 이미지 추출
                        img_elem = element.find('img')
                        image_url = img_elem.get('src') if img_elem else f"https://picsum.photos/300/200?random={len(self.events) + 300}"
                        
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
    
    def generate_mock_events(self):
        """더 많은 샘플 이벤트 생성"""
        print("추가 샘플 이벤트 생성 중...")
        
        event_types = ["시사회", "굿즈배포", "프로모션", "행사", "체험"]
        genres = ["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]
        locations = ["강남", "홍대", "신촌", "잠실", "부산", "대구", "광주", "인천", "수원", "천안"]
        sources = ["CGV", "롯데시네마", "메가박스", "영화사", "독립영화관", "문화센터"]
        
        for i in range(15):
            event = {
                "id": f"event_{len(self.events) + 1}",
                "title": f"영화 이벤트 {len(self.events) + 1}",
                "description": f"흥미진진한 영화 이벤트 {len(self.events) + 1}에 참여해보세요! 다양한 혜택과 특별한 경험을 제공합니다.",
                "date": (datetime.now() + timedelta(days=random.randint(1, 60))).strftime("%Y-%m-%d"),
                "location": random.choice(locations),
                "type": random.choice(event_types),
                "genre": random.choice(genres),
                "image": f"https://picsum.photos/300/200?random={len(self.events) + 300}",
                "source": random.choice(sources),
                "link": f"https://example.com/event/{len(self.events) + 1}",
                "created_at": datetime.now().isoformat()
            }
            self.events.append(event)
        
        print(f"추가로 {15}개 샘플 이벤트 생성")
    
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
        print("영화 이벤트 크롤링을 시작합니다...")
        print("=" * 50)
        
        start_time = time.time()
        
        # MaxMovie 크롤링만 실행
        self.crawl_maxmovie_events()
        
        # 데이터 저장
        self.save_events()
        
        end_time = time.time()
        print("=" * 50)
        print(f"크롤링이 완료되었습니다! (소요시간: {end_time - start_time:.2f}초)")
        print(f"총 {len(self.events)}개의 이벤트를 수집했습니다.")
        print("=" * 50)

if __name__ == "__main__":
    crawler = MovieEventCrawler()
    crawler.run() 
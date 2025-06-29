import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
from datetime import datetime, timedelta
import time
import random

class MovieEventCrawler:
    def __init__(self):
        self.events = []
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
    
    def crawl_cgv_events(self):
        """CGV 이벤트 크롤링"""
        try:
            url = "https://www.cgv.co.kr/event/eventList.aspx"
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # CGV 이벤트 데이터 (실제로는 더 복잡한 파싱이 필요)
            sample_events = [
                {
                    "title": "영화 시사회 이벤트",
                    "description": "신작 영화 시사회 참여 이벤트",
                    "date": "2024-12-20",
                    "location": "CGV 강남",
                    "type": "시사회",
                    "genre": "액션",
                    "image": "https://via.placeholder.com/300x200",
                    "source": "CGV",
                    "link": "https://www.cgv.co.kr/event"
                }
            ]
            
            self.events.extend(sample_events)
            print(f"CGV에서 {len(sample_events)}개 이벤트 수집")
            
        except Exception as e:
            print(f"CGV 크롤링 오류: {e}")
    
    def crawl_lotte_events(self):
        """롯데시네마 이벤트 크롤링"""
        try:
            # 롯데시네마 샘플 데이터
            sample_events = [
                {
                    "title": "영화 굿즈 배포 이벤트",
                    "description": "영화 관련 굿즈 무료 배포",
                    "date": "2024-12-25",
                    "location": "롯데시네마 홍대",
                    "type": "굿즈배포",
                    "genre": "로맨스",
                    "image": "https://via.placeholder.com/300x200",
                    "source": "롯데시네마",
                    "link": "https://www.lottecinema.co.kr"
                }
            ]
            
            self.events.extend(sample_events)
            print(f"롯데시네마에서 {len(sample_events)}개 이벤트 수집")
            
        except Exception as e:
            print(f"롯데시네마 크롤링 오류: {e}")
    
    def crawl_megabox_events(self):
        """메가박스 이벤트 크롤링"""
        try:
            # 메가박스 샘플 데이터
            sample_events = [
                {
                    "title": "영화 프로모션 이벤트",
                    "description": "영화 관람 후 리뷰 작성 이벤트",
                    "date": "2024-12-30",
                    "location": "메가박스 코엑스",
                    "type": "프로모션",
                    "genre": "드라마",
                    "image": "https://via.placeholder.com/300x200",
                    "source": "메가박스",
                    "link": "https://www.megabox.co.kr"
                }
            ]
            
            self.events.extend(sample_events)
            print(f"메가박스에서 {len(sample_events)}개 이벤트 수집")
            
        except Exception as e:
            print(f"메가박스 크롤링 오류: {e}")
    
    def generate_mock_events(self):
        """더 많은 샘플 이벤트 생성"""
        event_types = ["시사회", "굿즈배포", "프로모션", "행사", "체험"]
        genres = ["액션", "로맨스", "드라마", "코미디", "스릴러", "SF", "호러"]
        locations = ["강남", "홍대", "신촌", "잠실", "부산", "대구", "광주"]
        sources = ["CGV", "롯데시네마", "메가박스", "영화사", "독립영화관"]
        
        for i in range(20):
            event = {
                "id": f"event_{i+1}",
                "title": f"영화 이벤트 {i+1}",
                "description": f"흥미진진한 영화 이벤트 {i+1}에 참여해보세요!",
                "date": (datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d"),
                "location": random.choice(locations),
                "type": random.choice(event_types),
                "genre": random.choice(genres),
                "image": f"https://picsum.photos/300/200?random={i}",
                "source": random.choice(sources),
                "link": f"https://example.com/event/{i+1}",
                "created_at": datetime.now().isoformat()
            }
            self.events.append(event)
    
    def save_events(self):
        """이벤트 데이터를 JSON 파일로 저장"""
        try:
            with open('public/data/events.json', 'w', encoding='utf-8') as f:
                json.dump(self.events, f, ensure_ascii=False, indent=2)
            print(f"총 {len(self.events)}개 이벤트를 events.json에 저장했습니다.")
        except Exception as e:
            print(f"파일 저장 오류: {e}")
    
    def run(self):
        """크롤링 실행"""
        print("영화 이벤트 크롤링을 시작합니다...")
        
        # 실제 크롤링 (현재는 샘플 데이터)
        self.crawl_cgv_events()
        self.crawl_lotte_events()
        self.crawl_megabox_events()
        
        # 추가 샘플 데이터 생성
        self.generate_mock_events()
        
        # 데이터 저장
        self.save_events()
        
        print("크롤링이 완료되었습니다!")

if __name__ == "__main__":
    crawler = MovieEventCrawler()
    crawler.run() 
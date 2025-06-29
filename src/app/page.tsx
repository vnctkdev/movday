import Link from 'next/link'
import { Calendar, MapPin, Film, Search, Star } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Film className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">MovDay</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">
                홈
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
                이벤트
              </Link>
              <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                관리자
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            영화 이벤트를 한곳에서
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            시사회, 굿즈 배포, 프로모션 등 모든 영화 이벤트를 쉽게 찾고 참여하세요.
            더 이상 흩어진 정보를 찾아다닐 필요가 없습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/events"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              이벤트 둘러보기
            </Link>
            <Link 
              href="/admin"
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              관리자 페이지
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            왜 MovDay인가요?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">통합 검색</h3>
              <p className="text-gray-600">
                CGV, 롯데시네마, 메가박스 등 모든 영화관의 이벤트를 한번에 검색
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">실시간 업데이트</h3>
              <p className="text-gray-600">
                새로운 이벤트가 등록되면 즉시 알림을 받아 놓치지 않아요
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">맞춤 추천</h3>
              <p className="text-gray-600">
                선호하는 장르와 지역에 맞는 이벤트를 추천해드려요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">1,000+</div>
              <div className="text-blue-100">등록된 이벤트</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">영화관 체인</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">30만+</div>
              <div className="text-blue-100">월간 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Film className="h-6 w-6 text-blue-400" />
                <span className="ml-2 text-lg font-semibold">MovDay</span>
              </div>
              <p className="text-gray-400">
                영화 이벤트 통합 플랫폼
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/events" className="hover:text-white transition-colors">이벤트 검색</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">관리자</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">지원</h3>
              <ul className="space-y-2 text-gray-400">
                <li>고객센터</li>
                <li>문의하기</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">연결</h3>
              <ul className="space-y-2 text-gray-400">
                <li>GitHub</li>
                <li>문의: contact@movday.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MovDay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import { Calendar, Search, TrendingUp, Users, Film, Star, ArrowRight, Play, Zap, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Film className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MovDay
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                홈
              </Link>
              <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                이벤트
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                소개
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/events"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Search className="h-4 w-4 mr-2" />
                이벤트 보기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              영화 이벤트 통합 플랫폼
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MovDay
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              CGV, 롯데시네마, 메가박스의 모든 영화 이벤트를 한 곳에서 만나보세요.
              <br />
              <span className="text-blue-400">시사회부터 굿즈 배포까지</span> 놓치지 마세요!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/events"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center"
              >
                <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                이벤트 둘러보기
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                안전한 서비스
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Film className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-gray-400">수집된 이벤트</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10K+</h3>
              <p className="text-gray-400">사용자</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-pink-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">99%</h3>
              <p className="text-gray-400">만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              왜 <span className="text-blue-400">MovDay</span>를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              여러 영화관을 돌아다닐 필요 없이 한 곳에서 모든 이벤트를 확인하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">통합 검색</h3>
              <p className="text-gray-400 leading-relaxed">
                CGV, 롯데시네마, 메가박스의 모든 이벤트를 한 번에 검색하고 필터링할 수 있습니다.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">실시간 업데이트</h3>
              <p className="text-gray-400 leading-relaxed">
                새로운 이벤트가 등록되면 즉시 알려드립니다. 놓치는 일은 없어요!
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-pink-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-pink-600 to-pink-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">위치 기반</h3>
              <p className="text-gray-400 leading-relaxed">
                내 주변 영화관의 이벤트를 쉽게 찾을 수 있습니다.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-green-600 to-green-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">추천 시스템</h3>
              <p className="text-gray-400 leading-relaxed">
                관심사에 맞는 이벤트를 AI가 추천해드립니다.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">안전한 서비스</h3>
              <p className="text-gray-400 leading-relaxed">
                공식 영화관 정보만을 제공하여 안전하고 신뢰할 수 있습니다.
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">빠른 속도</h3>
              <p className="text-gray-400 leading-relaxed">
                최적화된 성능으로 빠르고 부드러운 사용자 경험을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 시작해보세요!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            수많은 영화 이벤트가 여러분을 기다리고 있습니다.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <Play className="h-5 w-5 mr-2" />
            이벤트 둘러보기
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Film className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MovDay
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                영화 이벤트 통합 플랫폼으로, 여러분의 영화 관람 경험을 더욱 특별하게 만들어드립니다.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-gray-400">📱</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-gray-400">📧</span>
                </div>
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors">
                  <span className="text-gray-400">🐦</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">서비스</h3>
              <ul className="space-y-2">
                <li><Link href="/events" className="text-gray-400 hover:text-white transition-colors">이벤트</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">소개</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">도움말</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">지원</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">문의하기</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">이용약관</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 MovDay. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
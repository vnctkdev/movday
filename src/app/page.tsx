'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Search, Film, Shield, MapPin, Tag, ExternalLink } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  type: string
  genre: string
  image: string
  source: string
  link: string
  created_at: string
}

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedSource, setSelectedSource] = useState('')

  const eventTypes = ['시사회', '굿즈배포', '프로모션', '체험', '행사', '이벤트']
  const genres = ['액션', '로맨스', '드라마', '코미디', '스릴러', 'SF', '호러', '애니메이션']
  const sources = ['CGV', '롯데시네마', '메가박스', 'MaxMovie', '영화사', '독립영화관', '문화센터']

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/data/events.json')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('이벤트 데이터를 불러오는데 실패했습니다:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedGenre('')
    setSelectedSource('')
  }

  const getTypeColor = (type: string) => {
    const colors = {
      '시사회': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      '굿즈배포': 'bg-green-500/20 text-green-300 border-green-500/30',
      '프로모션': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      '체험': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      '행사': 'bg-red-500/20 text-red-300 border-red-500/30',
      '이벤트': 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const getGenreColor = (genre: string) => {
    const colors = {
      '액션': 'bg-red-500/20 text-red-300 border-red-500/30',
      '로맨스': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      '드라마': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      '코미디': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      '스릴러': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'SF': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      '호러': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
      '애니메이션': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    }
    return colors[genre as keyof typeof colors] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || event.type === selectedType
    const matchesGenre = !selectedGenre || event.genre === selectedGenre
    const matchesSource = !selectedSource || event.source === selectedSource
    
    return matchesSearch && matchesType && matchesGenre && matchesSource
  })

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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                MovDay
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              MaxMovie, CGV, 롯데시네마, 메가박스의 모든 영화 이벤트를 한 곳에서 만나보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="이벤트 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="">모든 유형</option>
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="">모든 장르</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>

                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="px-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="">모든 출처</option>
                  {sources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>

                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  초기화
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg text-gray-300">
              총 <span className="text-blue-400 font-semibold">{filteredEvents.length}</span>개의 이벤트를 찾았습니다.
            </div>
            <div className="text-sm text-gray-400">
              MaxMovie에서 실시간으로 수집된 데이터
            </div>
          </div>

          {/* Events Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-700"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">이벤트를 찾을 수 없습니다</h3>
              <p className="text-gray-500">검색 조건을 변경해보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getGenreColor(event.genre)}`}>
                        {event.genre}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="h-4 w-4 mr-2 text-green-400" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Tag className="h-4 w-4 mr-2 text-purple-400" />
                        {event.source}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(event.created_at).toLocaleDateString('ko-KR')}
                      </span>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

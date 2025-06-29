'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, Calendar, MapPin, Film, ArrowLeft } from 'lucide-react'

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
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API에서 데이터를 가져옴
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/events.json')
        const data = await response.json()
        setEvents(data)
        setFilteredEvents(data)
      } catch (error) {
        console.error('이벤트 데이터를 불러오는데 실패했습니다:', error)
        // 샘플 데이터 사용
        const sampleEvents: Event[] = [
          {
            id: '1',
            title: '영화 시사회 이벤트',
            description: '신작 영화 시사회 참여 이벤트',
            date: '2024-12-20',
            location: 'CGV 강남',
            type: '시사회',
            genre: '액션',
            image: 'https://picsum.photos/300/200?random=1',
            source: 'CGV',
            link: 'https://www.cgv.co.kr/event'
          },
          {
            id: '2',
            title: '영화 굿즈 배포 이벤트',
            description: '영화 관련 굿즈 무료 배포',
            date: '2024-12-25',
            location: '롯데시네마 홍대',
            type: '굿즈배포',
            genre: '로맨스',
            image: 'https://picsum.photos/300/200?random=2',
            source: '롯데시네마',
            link: 'https://www.lottecinema.co.kr'
          },
          {
            id: '3',
            title: '영화 프로모션 이벤트',
            description: '영화 관람 후 리뷰 작성 이벤트',
            date: '2024-12-30',
            location: '메가박스 코엑스',
            type: '프로모션',
            genre: '드라마',
            image: 'https://picsum.photos/300/200?random=3',
            source: '메가박스',
            link: 'https://www.megabox.co.kr'
          }
        ]
        setEvents(sampleEvents)
        setFilteredEvents(sampleEvents)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType) {
      filtered = filtered.filter(event => event.type === selectedType)
    }

    if (selectedGenre) {
      filtered = filtered.filter(event => event.genre === selectedGenre)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, selectedType, selectedGenre])

  const eventTypes = [...new Set(events.map(event => event.type))]
  const genres = [...new Set(events.map(event => event.genre))]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">이벤트를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                홈으로
              </Link>
            </div>
            <div className="flex items-center">
              <Film className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">MovDay</h1>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="이벤트 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">모든 유형</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Genre Filter */}
            <div>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">모든 장르</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredEvents.length}</span>개의 이벤트를 찾았습니다
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Film className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">이벤트가 없습니다</h3>
            <p className="text-gray-600">검색 조건을 변경해보세요</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {event.type}
                    </span>
                    <span className="text-sm text-gray-500">{event.source}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{event.genre}</span>
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      자세히 보기
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 
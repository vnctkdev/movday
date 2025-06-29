import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const genre = searchParams.get('genre')
    const source = searchParams.get('source')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    // JSON 파일에서 이벤트 데이터 읽기
    const dataPath = path.join(process.cwd(), 'public', 'data', 'events.json')
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ 
        events: [], 
        total: 0, 
        page: 1, 
        totalPages: 0,
        message: '이벤트 데이터가 없습니다.' 
      })
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8')
    let events: Event[] = JSON.parse(fileContent)
    
    // 검색 필터링
    if (search) {
      events = events.filter(event => 
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // 유형 필터링
    if (type) {
      events = events.filter(event => event.type === type)
    }
    
    // 장르 필터링
    if (genre) {
      events = events.filter(event => event.genre === genre)
    }
    
    // 출처 필터링
    if (source) {
      events = events.filter(event => event.source === source)
    }
    
    // 날짜순 정렬 (최신순)
    events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // 페이지네이션
    const total = events.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEvents = events.slice(startIndex, endIndex)
    
    return NextResponse.json({
      events: paginatedEvents,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    })
    
  } catch (error) {
    console.error('API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // 필수 필드 검증
    const requiredFields = ['title', 'date', 'location', 'type', 'genre', 'source']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} 필드는 필수입니다.` },
          { status: 400 }
        )
      }
    }
    
    // 새 이벤트 생성
    const newEvent: Event = {
      id: `event_${Date.now()}`,
      title: body.title,
      description: body.description || '',
      date: body.date,
      location: body.location,
      type: body.type,
      genre: body.genre,
      image: body.image || `https://picsum.photos/300/200?random=${Date.now()}`,
      source: body.source,
      link: body.link || '',
      created_at: new Date().toISOString()
    }
    
    // 기존 데이터 읽기
    const dataPath = path.join(process.cwd(), 'public', 'data', 'events.json')
    let events: Event[] = []
    
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8')
      events = JSON.parse(fileContent)
    }
    
    // 새 이벤트 추가
    events.push(newEvent)
    
    // 파일에 저장
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2), 'utf-8')
    
    return NextResponse.json({
      message: '이벤트가 성공적으로 추가되었습니다.',
      event: newEvent
    }, { status: 201 })
    
  } catch (error) {
    console.error('POST API 오류:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 
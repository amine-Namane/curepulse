// app/test/page.jsx
'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseclient'

export default function TestPage() {
  useEffect(() => {
    supabase
      .from('doctors')
      .select('*')
      .then(({ data, error }) => {
        console.log('Raw Supabase response:', { data, error })
        if (data) alert(`${data.length} doctors found!`)
      })
  }, [])

  return <div>Check browser console and alerts</div>
}

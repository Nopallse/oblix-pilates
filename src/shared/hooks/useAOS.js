import { useEffect } from 'react'
import AOS from 'aos'

const useAOS = () => {
  useEffect(() => {
    // Refresh AOS when component mounts
    AOS.refresh()
  }, [])

  const refreshAOS = () => {
    AOS.refresh()
  }

  const refreshAOSHard = () => {
    AOS.refreshHard()
  }

  return {
    refreshAOS,
    refreshAOSHard
  }
}

export default useAOS 
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Header from '../components/Header'
import LanguageModule from '../modules/LanguageModule';
import MathModule from '../modules/MathModule';
import EncyclopediaModule from '../modules/EncyclopediaModule';
import ConfettiToast from '../components/ConfettiToast'
import FullscreenButton from '../components/FullscreenButton'

const Session = () => {
  const navigate = useNavigate()
  const { progress, weekData, loading, error, completeSession } = useContent()
  const [step, setStep] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const containerRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!loading) window.scrollTo(0, 0);
  }, [step, loading]);

  useEffect(() => {
    const handleChange = () => {
      const el =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      setIsFullscreen(!!el)
    }

    document.addEventListener('fullscreenchange', handleChange)
    document.addEventListener('webkitfullscreenchange', handleChange)
    document.addEventListener('mozfullscreenchange', handleChange)
    document.addEventListener('MSFullscreenChange', handleChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleChange)
      document.removeEventListener('webkitfullscreenchange', handleChange)
      document.removeEventListener('mozfullscreenchange', handleChange)
      document.removeEventListener('MSFullscreenChange', handleChange)
    }
  }, [])

  const toggleFullscreen = () => {
    const el = containerRef.current || document.documentElement
    const isFs =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement

    if (!isFs) {
      const requestFn =
        el.requestFullscreen ||
        el.webkitRequestFullscreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullscreen
      if (requestFn) requestFn.call(el)
    } else {
      const exitFn =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozCancelFullScreen ||
        document.msExitFullscreen
      if (exitFn) exitFn.call(document)
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        Failed to load week data: {error.message}
      </div>
    )
  }

  if (!weekData) {
    return null
  }

  const titles = ['📝 Language', '🔢 Math', '🦁 Encyclopedia'];
  const isLast = step === titles.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setStep(step + 1);
    } else {
      completeSession();
      setShowToast(true);
    }
  };

  const handlePrev = () => step > 0 && setStep(step - 1);

  return (
    <div
      ref={containerRef}
      data-testid="session-container"
      className="bg-black min-h-screen flex flex-col"
    >
      <Header />

      <div
        ref={containerRef}
        data-testid="session-container"
        className="min-h-screen bg-black"
      >
      <div
        className="max-w-md mx-auto px-4 py-8 space-y-6 text-center pt-20"
      >
      <div className="hidden lg:flex justify-end">
        <FullscreenButton
          onClick={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

      </div>

      {step === 0 && <LanguageModule words={weekData.language} />}
      {step === titles.indexOf('🔢 Math') && (
        <MathModule
          start={weekData.mathWindowStart}
          length={weekData.mathWindowLength}
          shuffleFirstHalf={weekData.mathShuffleFirstHalf}
          numbers={weekData.counting?.[progress.day - 1]}
          sum={
            weekData.addition?.[progress.day - 1]?.[progress.session - 1]
          }
          difference={
            weekData.subtraction?.[progress.day - 1]?.[progress.session - 1]
          }
          product={
            weekData.multiplication?.[progress.day - 1]?.[progress.session - 1]
          }
          quotient={
            weekData.division?.[progress.day - 1]?.[progress.session - 1]
          }
        />
      )}
      {step === titles.indexOf('🦁 Encyclopedia') && (
        <EncyclopediaModule cards={weekData.encyclopedia} />
      )}

      <div className="flex justify-between pt-4">
        <button onClick={handlePrev} disabled={step === 0} className="btn">
          ← Back
        </button>
        <button onClick={handleNext} className="btn">
          {isLast ? 'Finish Session' : 'Next →'}
        </button>
      </div>
      {showToast && (
        <ConfettiToast
          onDone={() => {
            setShowToast(false)
            navigate('/')
            setStep(0)
          }}
        />
      )}
      </div>
      </div>
    </div>
  );
};

export default Session;

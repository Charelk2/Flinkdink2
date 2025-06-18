import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Header from '../components/Header'
import LanguageModule from '../modules/LanguageModule';
import MathModule from '../modules/MathModule';
import EncyclopediaModule from '../modules/EncyclopediaModule';
import ConfettiToast from '../components/ConfettiToast'

const Session = () => {
  const navigate = useNavigate()
  const { progress, weekData, loading, error, completeSession } = useContent()
  const [step, setStep] = useState(0)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!loading) window.scrollTo(0, 0);
  }, [step, loading]);

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

  const titles = ['📝 Language', '🔢 Math Dots', '🦁 Encyclopedia'];
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
    <>
      <Header />
      <div className="max-w-md mx-auto px-4 py-8 space-y-6 text-center pt-20">
        <h1 className="text-2xl font-bold">Week {progress.week} – Session</h1>
      <h2 className="text-lg text-gray-500">{titles[step]}</h2>

      {step === 0 && <LanguageModule words={weekData.language} />}
      {step === 1 && <MathModule start={weekData.mathWindowStart} />}
      {step === 2 && <EncyclopediaModule cards={weekData.encyclopedia} />}

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
    </>
  );
};

export default Session;

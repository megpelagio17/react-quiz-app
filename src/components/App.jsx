import { useState, useEffect } from 'react'
import axios from 'axios'
import ActivitySelector from './ActivitySelector'
import Question from './Question'
import Score from './Score'

function App() {
  const [activity, setActivity] = useState(null)
  const [quizData, setQuizData] = useState(null)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Activity Two state
  const [rounds, setRounds] = useState([])
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [currentRoundQuestionIndex, setCurrentRoundQuestionIndex] = useState(0)
  const [showRoundIntro, setShowRoundIntro] = useState(true)

  useEffect(() => {
    if (
      activity === 'two' &&
      showRoundIntro &&
      rounds.length > 0 &&
      rounds[currentRoundIndex]
    ) {
      const timer = setTimeout(() => {
        setShowRoundIntro(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [activity, showRoundIntro, rounds, currentRoundIndex])

  const startActivity = async (selectedActivity) => {
    setActivity(selectedActivity)
    setIsLoading(true)

    try {
      const basePath =
        import.meta.env.MODE === 'development'
          ? '/payload.json'
          : '/react-quiz-app/payload.json'

      const response = await axios.get(basePath)
      const activities = response.data.activities

      if (selectedActivity === 'one') {
        const activityOne = activities.find(
          (a) => a.activity_name === 'Activity One'
        )
        setQuestions(activityOne.questions)
      }

      if (selectedActivity === 'two') {
        const activityTwo = activities.find(
          (a) => a.activity_name === 'Activity Two'
        )
        setRounds(activityTwo.questions)
        setShowRoundIntro(true)
      }

      setQuizData(response.data)
    } catch (error) {
      console.error('Error fetching quiz data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = () => {
    if (activity === 'one') {
      const next = current + 1
      if (next < questions.length) {
        setCurrent(next)
      } else {
        setIsFinished(true)
      }
    }

    if (activity === 'two') {
      const currentRound = rounds[currentRoundIndex]
      const currentQuestions = currentRound.questions

      const nextQuestionIndex = currentRoundQuestionIndex + 1
      if (nextQuestionIndex < currentQuestions.length) {
        setCurrentRoundQuestionIndex(nextQuestionIndex)
      } else {
        const nextRoundIndex = currentRoundIndex + 1
        if (nextRoundIndex < rounds.length) {
          setCurrentRoundIndex(nextRoundIndex)
          setCurrentRoundQuestionIndex(0)
          setShowRoundIntro(true)
        } else {
          setIsFinished(true)
        }
      }
    }
  }

  const restartQuiz = () => {
    setActivity(null)
    setCurrent(0)
    setIsFinished(false)
    setQuestions([])
    setQuizData(null)
    setRounds([])
    setCurrentRoundIndex(0)
    setCurrentRoundQuestionIndex(0)
    setShowRoundIntro(true)
  }

  if (!activity) {
    return <ActivitySelector onSelect={startActivity} />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl font-semibold text-blue-500">
          Loading activity...
        </p>
      </div>
    )
  }

  if (activity === 'one') {
    return (
      <div className="bg-blue w-full">
        <div className="mx-auto max-w-3xl p-4">
          {isFinished ? (
            <div className="bg-blue w-full">
              <div className="flex h-screen items-center justify-center bg-blue-50">
                <Score
                  activityName="Activity One"
                  results={questions}
                  onHome={restartQuiz}
                  onRestart={restartQuiz}
                />
              </div>
            </div>
          ) : (
            <Question
              data={questions[current]}
              onAnswer={handleAnswer}
              index={current + 1}
            />
          )}
        </div>
      </div>
    )
  }

  if (activity === 'two') {
    if (isFinished) {
      const totalQuestions = rounds.reduce(
        (acc, round) => acc + round.questions.length,
        0
      )
      return (
        <div className="bg-blue w-full">
          <div className="flex h-screen items-center justify-center bg-blue-50">
            <Score
              activityName="Activity Two"
              results={rounds}
              onHome={restartQuiz}
              total={totalQuestions}
              onRestart={restartQuiz}
            />
          </div>
        </div>
      )
    }

    if (showRoundIntro && rounds.length > 0 && rounds[currentRoundIndex]) {
      return (
        <div className="bg-blue w-full">
          <div className="flex min-h-screen items-center justify-center">
            <div className="border-border flex h-[350px] w-full max-w-3xl flex-col border border-2 bg-white text-left shadow-md">
              <p className="text-md text-textColor ml-4 mt-2 p-8 font-bold uppercase">
                ACTIVITY TWO
              </p>
              <p className="text-textColor ml-4 p-8 text-3xl font-bold uppercase">
                {rounds[currentRoundIndex].round_title}
              </p>
            </div>
          </div>
        </div>
      )
    }

    const currentQuestion =
      rounds[currentRoundIndex].questions[currentRoundQuestionIndex]
    const questionIndex = currentRoundQuestionIndex + 1

    return (
      <div className="bg-blue w-full">
        <div className="mx-auto max-w-3xl p-4">
          <Question
            data={currentQuestion}
            onAnswer={handleAnswer}
            index={questionIndex}
            roundIndex={currentRoundIndex}
          />
        </div>
      </div>
    )
  }

  return null
}

export default App

/* eslint-disable tailwindcss/no-custom-classname */
import Card from './Card'

function Score({ onRestart, activityName, onHome, results }) {
  return (
    <Card>
      <div className="">
        <h2 className="text-textColor mb-6 p-6 text-sm font-bold uppercase">
          {activityName}
        </h2>
        <h1 className="text-textColor mt-6 text-4xl font-bold">Results</h1>

        {activityName === 'Activity One' ? (
          <div className="mt-12">
            {results.map((question, idx) => (
              <div
                key={idx}
                className={`border-border bg-buttonBg flex justify-between border-t px-6 py-4 ${
                  idx === results.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="text-textColor font-bolder">
                  Q{question.order}
                </span>
                <span className="text-textColor font-bold">
                  {question.is_correct ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 max-h-40 overflow-y-auto rounded-md bg-white text-blue-500">
            {results.map((round, roundIdx) => (
              <div key={roundIdx}>
                <div className="border-border bg-buttonBg text-textColor border-y px-6 py-4 font-bold uppercase">
                  {round.round_title}
                </div>
                {round.questions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className={`border-border bg-buttonBg text-textColor flex justify-between ${
                      qIdx === round.questions.length - 1
                        ? 'border-b'
                        : 'border-y'
                    } px-6 py-4`}
                  >
                    <span className="font-bolder">Q{q.order}</span>
                    <span className="font-bold">
                      {q.is_correct ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <button
            onClick={onHome || onRestart}
            className="text-textColor w-full py-12 font-bold"
          >
            HOME
          </button>
        </div>
      </div>
    </Card>
  )
}

export default Score

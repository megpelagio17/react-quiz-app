/* eslint-disable tailwindcss/no-custom-classname */

import React from 'react'

const formatStimulus = (text) => {
  const parts = text.split('*')
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-blue-700">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function Question({ data, onAnswer, index, roundIndex }) {
  if (!data) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className=" border-border  w-full max-w-3xl border-2  bg-white text-left shadow-md">
        <div className="border-b border-blue-100 p-4 text-left">
          <p className="text-textColor ml-4 p-2 text-sm font-bold uppercase">
            {roundIndex !== undefined
              ? `Activity Two / Round ${roundIndex + 1}`
              : 'Activity One'}
          </p>
          <p className="text-textColor p-8 text-3xl font-bold">Q{index}.</p>
        </div>

        <div className="bg-buttonBg border-border text-textColor border-b-2 border-t p-6 text-lg font-medium">
          <p className="ml-4">{formatStimulus(data.stimulus)}</p>
        </div>

        <div className="grid grid-cols-2">
          <button
            onClick={() => onAnswer(true)}
            className="text-textColor p-8 font-bold hover:bg-blue-100"
          >
            CORRECT
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="text-textColor p-8 font-bold hover:bg-blue-100"
          >
            INCORRECT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Question

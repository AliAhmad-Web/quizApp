import { useState } from "react";
import questions from "./quizdata";
import QuizResult from "./quizResult";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  function pickAnswer(isCorrect, i) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    if (isCorrect) {
      setScore(score + 5);
      setCorrect(correct + 1);
    }
  }

  function nextQuestion() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setLocked(false);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setIndex(0);
    setScore(0);
    setCorrect(0);
    setDone(false);
    setSelected(null);
    setLocked(false);
  }

  if (done) {
    return <QuizResult score={score} correct={correct} total={questions.length} onReset={reset} />;
  }

  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto p-3">
      <div className="bg-white rounded-2xl shadow-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Quiz</h1>
            <p className="text-xs text-gray-400">Q{index + 1}/{questions.length}</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-indigo-500">{score}</p>
            <p className="text-[10px] text-gray-400">pts</p>
          </div>
        </div>

        <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3">
          <div className="h-full bg-linear-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <p className="text-gray-700 text-sm font-medium mb-3">{q.questionText}</p>

        <div className="space-y-2">
          {q.answerOptions.map((ans, i) => {
            let btnClass = "w-full text-left p-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 ";

            if (!locked) {
              btnClass += "border-gray-200 text-gray-600 hover:border-indigo-300 hover:bg-indigo-50";
            } else if (i === selected && ans.isCorrect) {
              btnClass += "border-emerald-400 bg-emerald-50 text-emerald-700";
            } else if (i === selected && !ans.isCorrect) {
              btnClass += "border-red-400 bg-red-50 text-red-700";
            } else if (ans.isCorrect) {
              btnClass += "border-emerald-400 bg-emerald-50 text-emerald-700";
            } else {
              btnClass += "border-gray-200 text-gray-400";
            }

            return (
              <button key={i} className={btnClass} disabled={locked} onClick={() => pickAnswer(ans.isCorrect, i)}>
                <span className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    !locked ? "bg-gray-100 text-gray-500"
                    : i === selected && ans.isCorrect ? "bg-emerald-400 text-white"
                    : i === selected && !ans.isCorrect ? "bg-red-400 text-white"
                    : ans.isCorrect ? "bg-emerald-400 text-white"
                    : "bg-gray-100 text-gray-400"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {ans.answerText}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button onClick={reset} className="px-5 py-2 rounded-xl border-2 border-gray-200 text-gray-500 font-medium text-sm hover:border-gray-300 hover:text-gray-700 transition-all duration-200">
            Quit
          </button>
          <button onClick={nextQuestion} disabled={!locked} className="px-6 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none">
            {index + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
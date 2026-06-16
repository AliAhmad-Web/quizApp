export default function QuizResult({ score = 0, correct = 0, total = 0, onReset }) {
  const maxScore = total * 5;
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  let grade, icon, msg, ring;
  if (pct >= 80) {
    grade = "A";
    msg = "Brilliant! You crushed it!";
    ring = "ring-emerald-300";
    icon = (
      <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  } else if (pct >= 60) {
    grade = "B";
    msg = "Great job! Keep it up!";
    ring = "ring-blue-300";
    icon = (
      <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l7 3 7-3v11.17a4 4 0 01-2 3.45L12 21l-5-3.38a4 4 0 01-2-3.45V3z" />
      </svg>
    );
  } else if (pct >= 40) {
    grade = "C";
    msg = "Not bad! Room to improve.";
    ring = "ring-amber-300";
    icon = (
      <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  } else {
    grade = "D";
    msg = "Keep studying! You got this.";
    ring = "ring-rose-300";
    icon = (
      <svg className="w-10 h-10 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-3">
      <div className="bg-white rounded-3xl shadow-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-indigo-50 to-purple-50 flex items-center justify-center shadow-md">
            {icon}
          </div>
          <div className={`w-14 h-14 rounded-full ring-[5px] ${ring} flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50 shadow-md`}>
            <span className="text-2xl font-bold text-indigo-600">{grade}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-0.5">Quiz Complete!</h2>
        <p className="text-sm text-gray-400 mb-4">{msg}</p>

        <div className="bg-linear-to-br from-indigo-500 to-purple-500 rounded-2xl p-5 mb-3 text-white shadow-xl shadow-indigo-200">
          <p className="text-4xl font-bold">{score}/{maxScore}</p>
          <p className="text-white/70 text-xs mt-1">Total Score</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-4 border border-gray-100">
          <p className="text-2xl font-bold text-gray-800">
            {correct} / {total}
          </p>
          <p className="text-xs text-gray-400">Correct Answers</p>
        </div>

        <button onClick={onReset} className="w-full py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-bold text-base shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
          Play Again
        </button>
      </div>
    </div>
  );
}
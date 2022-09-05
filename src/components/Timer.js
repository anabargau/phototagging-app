import React, { useEffect, useState } from 'react';

function Timer() {
  const [timer, setTimer] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function increment() {
    setTimer((timer) => {
      timer += 10;
      return timer;
    });
  }

  function milisToSeconds() {
    setSeconds(((timer / 1000) % 60).toFixed(3));
  }

  useEffect(() => {
    const tick = setInterval(increment, 10);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    milisToSeconds();
  }, [timer]);

  return (
    <div className="level-timer">
      {seconds < 10 ? ' ' + seconds + ' s' : seconds + ' s'}
    </div>
  );
}

export default Timer;

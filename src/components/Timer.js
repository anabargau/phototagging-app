import React, { useEffect, useState } from 'react';

function Timer() {
  const [timer, setTimer] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function increment() {
    setTimer((timer) => {
      timer += 1;
      return timer;
    });
  }

  function secondsToMinutes() {
    setMinutes(Math.floor(timer / 60));
    setSeconds(timer - minutes * 60);
  }

  useEffect(() => {
    const tick = setInterval(increment, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    secondsToMinutes();
  }, [timer]);

  return (
    <div className="level-timer">
      {seconds === 60
        ? minutes + ' min 00 s'
        : minutes + ' min ' + (seconds < 10 ? '0' : '') + seconds + ' s'}
    </div>
  );
}

export default Timer;

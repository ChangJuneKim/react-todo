import { useState } from 'react';
import classes from './Time.module.css';
import useInterval from '../../hooks/useInterval';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const padZero = num => {
  if (num < 10) return String(num).padStart(2, '0');
  else return num;
};

const Time = () => {
  let now = new Date();

  const [hour, setHour] = useState(padZero(now.getHours()));
  const [min, setMin] = useState(padZero(now.getMinutes()));
  const [sec, setSec] = useState(padZero(now.getSeconds()));

  const { height, width } = useWindowDimensions();

  useInterval(() => {
    now = new Date();
    setHour(padZero(now.getHours()));
    setMin(padZero(now.getMinutes()));
    setSec(padZero(now.getSeconds()));
  }, 1000);

  let clock = <h1>{`${hour}:${min}:${sec}`}</h1>;
  if (width < 1100) {
    clock = <h1>{`${hour}:${min}`}</h1>;
  }
  return <section className={classes.timer}>{clock}</section>;
};
export default Time;
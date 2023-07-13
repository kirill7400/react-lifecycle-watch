import {useEffect, useState} from "react";

function Watch({ delWatch, tz, name }) {

  const timer = () => {
    return new Date(new Date().setHours(new Date().getHours() + Number(tz)))
  }

  const [date, setDate] = useState({
    date: timer()
  })

  const mount = () => {
    let id = setInterval(() => tick(), 1000);
    console.log(1 + Number(tz))

    return () => unmount(id)
  }

  const unmount = (id) => {
    clearInterval(id)
    console.log('unmount!')
  }

  const tick = () => {
    setDate({
      date: timer()
    });
  }

  useEffect(mount, [])

  return(
    <div className='timer'>
      <div className='timerMain'>
        <div className='timerMain-name'>{ name }</div>
        <h2 className='timerMain-timer'>{ date.date.toLocaleTimeString() }</h2>
      </div>

      <div className='delBtn' onClick={ delWatch }>❌</div>
    </div>
  )
}

export default Watch
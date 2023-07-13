import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRef, useState} from "react";
import Watch from "./Watch";
import uuid from 'react-uuid';

function WorldWatch() {
  const name = useRef()
  const tz = useRef()
  const [list, setList] = useState([])

  const timeZones = [
    { label: 'Лондон', value: '-3' },
    { label: 'Токио', value: '+6' },
    { label: 'Киев', value: '-1' },
    { label: 'Нью-Йорк', value: '+0' },
    { label: 'Москва', value: '+0' },
    { label: 'Амстердам', value: '-2' },
  ]

  const options = timeZones.map((zone, i) => {
    return (
      <option key={ i } value={ zone.value }>{ zone.label }</option>
    )
  })

  const add = () => {
    const key = uuid()

    const delWatch = (key) => {
      setList(prevState => {
        let index
        prevState.forEach((item, i) => { if (item.key === key) index = i })
        prevState.splice(index, 1)

        return [...prevState]
      })
    }

    setList(prevState => {
      let data = { key: key, component: <Watch key={ key } delWatch={ delWatch } name={ name.current.value } tz={ tz.current.value }/> }
      return [...prevState, data]
    })
  }

  return(
    <div className='watch'>
      <div className='controls'>
        <Form.Control ref={ name } className="inputControl" type="text" placeholder="Введите название..." />
        <Form.Select ref={ tz } className="selectControl">
          { options }
        </Form.Select>
        <Button className="btnControl" variant="success" onClick={ add }>Добавить</Button>
      </div>
      <div className='watches'>
        { list.map(item => item.component) }
      </div>
    </div>
  )
}

export default WorldWatch
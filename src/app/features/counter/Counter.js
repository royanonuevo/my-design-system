import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount, updateName } from './counterSlice'
import { Button } from 'components/form'

export default function Counter() {
  const { count, name } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Button
          onClick={() => dispatch(increment())}
          label='Increment'
        />
        <br />
        <div>{ count }</div>
        <div>{ name }</div>
        <br />
        <Button
          onClick={() => dispatch(decrement())}
          label='Decrement'
        />
        <br />
        <Button
          onClick={() => dispatch(incrementByAmount({ a: 10, b:5 }))}
          label='Increment by specific amount'
        />
        <br />
        <input type="text" value={name} onChange={(e) => dispatch(updateName(e.target.value))} />
      </div>
    </div>
  )
}
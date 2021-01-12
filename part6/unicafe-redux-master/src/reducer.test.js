import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is inremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  
  test('everything is zeroed after some increment', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const okAction = {
      type: 'OK'
    }
    const badAction = {
      type: 'BAD'
    }
    const zeroAction = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)

    const firstState = counterReducer(state, goodAction)
    const secondState = counterReducer(firstState, okAction)
    const thirdState = counterReducer(secondState, badAction)
    const finalState = counterReducer(thirdState, zeroAction)
    
    expect(finalState).toEqual(initialState)
  })
})
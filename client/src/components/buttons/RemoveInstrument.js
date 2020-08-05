import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import filter from 'lodash/filter'
import { GET_INSTRUMENTS, REMOVE_INSTRUMENT } from '../../queries/index'
import { DeleteOutlined } from '@ant-design/icons' 

const RemoveInstrument =  ({ id, year, brand, type, price, artistId }) => {
  const [removeInstrument] = useMutation(
    REMOVE_INSTRUMENT,
    {
      update(cache, { data: { removeInstrument } }) {
        const { instruments } = cache.readQuery({
          query: GET_INSTRUMENTS
        })
        cache.writeQuery({
          query: GET_INSTRUMENTS,
          data: { instruments: filter(instruments, c => { return c.id !== removeInstrument.id })}
        })
      }
    }
  )
  const handleButtonClick = (e) => {
    let result = window.confirm('Are you sure you want to delete this instrument?')
    if (result) {
      e.preventDefault()
      removeInstrument({  
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeInstrument: {
            __typename: 'Instrument',
            id, 
            year, 
            brand, 
            type, 
            price, 
            artistId
          }
        }
      })
    }
  }


  return (

      <DeleteOutlined
      key='delete'
      onClick={handleButtonClick}
      style={{ color: 'red' }}
      />
    
  )
}

export default RemoveInstrument
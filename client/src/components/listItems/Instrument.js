import React, { useState } from 'react'
import Currency from 'react-currency-formatter'
import { Card, List } from 'antd'

import { EditOutlined } from '@ant-design/icons'
import UpdateInstrument from '../forms/UpdateInstrument'
import RemoveInstrument from '../buttons/RemoveInstrument'

const Instrument = props => {

  const [ id ] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [brand, setBrand] = useState(props.brand)
  const [type, setType] = useState(props.type)
  const [price, setPrice] = useState(props.price)
  const [artistId, setArtistId] = useState(props.artistId)

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  const fullInfo = () => {
    return `${brand} ${type} `
  }

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case 'year':
        setYear(value)
        break
        case 'brand':
            setBrand(value)
            break
         case 'type':
         setType(value)
        break
        case 'price':
            setPrice(value)
         break
         case 'artistId':
            setArtistId(value)
         break
      default:
        break
    }
  } 

  return (
    <List.Item key={props.id} >
      {editMode ? (
      <UpdateInstrument
      id={props.id}
      year={props.year}
      brand={props.brand}
      type={props.type}
      price={props.price}
      artistId={props.artistId}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card 
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} style={{ marginRight: '18px'}} />,
            <RemoveInstrument id={id} year={year} brand={brand} type={type} price={price}  artistId={artistId} /> 
          ]}
        >       
          <p> {fullInfo()}</p>
          <p>{<Currency quantity={price} currency='CAD' />}</p> 
        </Card>
  
      )}
      </List.Item>
        
  )
} 
export default Instrument
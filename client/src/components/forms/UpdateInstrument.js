import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import {  Button } from 'antd'
import {  GET_ARTISTS, UPDATE_INSTRUMENT } from '../../queries/index'

const UpdateInstrument = props => {
   const [ id ] = useState(props.id)
   const [year, setYear] = useState(props.year)
   const [brand, setBrand] = useState(props.brand)
   const [type, setType] = useState(props.type)
   const [price, setPrice] = useState(props.price)
   const [artistId, setArtistId] = useState(props.artistId)
   const [updateInstrument] = useMutation(UPDATE_INSTRUMENT)

const updateStateVariable = (variable, value) => {
   props.updateStateVariable(variable, value)
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



 const { loading, error, data } = useQuery(GET_ARTISTS)
if (loading) return 'Loading...'
if (error) return `Error! ${error.message}`



 return (
   <form
     onSubmit={e => {
       e.preventDefault()
       updateInstrument({
         variables: {
           id, year, brand, type, price, artistId
         },
         optimisticResponse: {
           __typename: 'Mutation',
           updateInstrument: {
             __typename: 'Instrument',
             id, year, brand, type, price, artistId
           }
         }
       })
       props.onButtonClick()
     }}
   >

     <TextField label='Year' defaultValue={year}  placeholder='i.e. 2020' onChange={e => updateStateVariable('year', e.target.value)} type='number'  variant='outlined' style={{ display: 'flex', margin: '12px' }}  />
     <TextField label='brand' defaultValue={brand}  placeholder='Yamaha'  onChange={e => updateStateVariable('brand', e.target.value)}  variant='outlined' style={{ display: 'flex', margin: '12px' }}  />
     <TextField label='Type' defaultValue={type} placeholder='Acoustic Guitar' onChange={e => updateStateVariable('type', e.target.value)}  variant='outlined'  style={{ display: 'flex', margin: '12px' }} />
     <TextField label='Price' defaultValue={price} placeholder='i.e. 5000' onChange={e => updateStateVariable('price', e.target.value)} type='number' variant='outlined' style={{ display: 'flex', margin: '12px' }}  />
     <Select native  defaultValue='1' value={artistId} onChange={e => updateStateVariable('artistId', e.target.value)} input={ <OutlinedInput name='artist'  /> } style={{ display: 'flex', margin: '12px' }}  >
       {data.artists.map(({ id, firstName, lastName }) => (
         <option value={id}>{firstName} {lastName}</option>
       ))}
     </Select>

     <Button  htmlType='submit'  type='primary' style={{ margin: '12px' }} > Update Instrument </Button>
     <Button  onClick={props.onButtonClick}  style={{ margin: '12px' }} > Cancel </Button>
   </form> 

 )
}

export default UpdateInstrument
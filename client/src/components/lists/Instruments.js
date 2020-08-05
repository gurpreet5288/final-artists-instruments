
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_INSTRUMENTS } from '../../queries/index'; 
import Instrument from '../listItems/Instrument';

import { List } from 'antd'


const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center' 
  }
})



const Instruments = props => { 
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_INSTRUMENTS)
    if (loading) return 'Loading...'
    if (error) return `Errror! ${error.message}`
    return ( 
         

    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
    {data.instruments.map(({ id, year, brand, type, price, artistId })=> (
       (props.artistId === artistId) ?
      <List.Item key={id}>
         <Instrument
                  key={id}
                  id={id}
                  year={year}
                  brand={brand}
                  type={type}
                  price={price}
                  artistId={artistId}
                />
      </List.Item>
      :
      <span></span>
    ))}
    </List>
    )
  }
  
  export default Instruments
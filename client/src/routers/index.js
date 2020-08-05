import React from 'react'
import App from '../App'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-boost'
import { Route,  BrowserRouter as Router } from 'react-router-dom'
import Title from '../components/layout/Title' 
import { ApolloProvider } from '@apollo/react-hooks'


const Routers = () => {

    const client = new ApolloClient({
        link: createHttpLink({uri:'http://localhost:4000/graphql'}),
        cache: new InMemoryCache()
      })
      return(
        <ApolloProvider client={client}>
          <Router>
              <div>
                  <Route exact path='/'>
                    <App />
                  </Route>
                  <Route exact path='/title'>
                    <Title />
                  </Route> 
              </div>  
          </Router>
</ApolloProvider>
)}

export default Routers

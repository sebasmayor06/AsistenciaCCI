
import { AppRouter } from "./router/AppRouter"
import { useState } from "react"
import { Provider } from 'react-redux';
import { store } from '../src/app/store'; 

import "./App.css"


function App() {

  return (
    <div style={{backgroundColor: '#f1f1f1'}}>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </div>

  )
}

export default App

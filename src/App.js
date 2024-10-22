import React,{userState} from 'react';
import './App.css';

function App() {
  return (
    <div className="App-container">
      <div className="left-container">
        <p>Mortgage Calculator <a href=''>Clear All</a></p>

        <form className='mortgage-inputs'>
          <label for='amount'>Mortgage Amount</label>
          <input type='text' id='amount' name='amount' className='input-field'/>
  
          <div className='inline-input-container'>
            <div className='inline-input'>
              <label for='term'>Mortgage Term</label>            
              <input type='text' id='term' name='term' className='input-field'/>
            </div>
            <div className='inline-input'>  
              <label for='rate'>Interest Rate</label>
              <input type='text' id='rate' name='rate' className='input-field'/>
            </div>
          </div>
          
        </form>
        
        
      </div>
      <div className="right-container">

      </div>
    </div>
  );
}

export default App;

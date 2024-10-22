import React,{ useState} from 'react';
import './App.css';
import Inputmask from 'inputmask';


function App() {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="App-container">
      <div className="left-container">
        <div className='heading'>
          <p>Mortgage Calculator <a href=''>Clear All</a></p>
        </div>

        <form className='mortgage-inputs'>
          <div className='amount-container'>
            <label for='amount'>Mortgage Amount</label>
            <span className='pound'>£</span>          
            <input type='text' id='amount' name='amount' className='input-field'/>
          </div>
  
          <div className='inline-input-container'>
            <div className='inline-input'>
              <label for='term'>Mortgage Term</label>
              <span className='years'>years</span>            
              <input type='text' id='term' name='term' className='input-field'/>
            </div>
            <div className='inline-input'>  
              <label for='rate'>Interest Rate</label>
              <span className='porcentage'>%</span>
              <input type='text' id='rate' name='rate' className='input-field'/>
            </div>
          </div>

          <div className='radio-container'>
            <label for='type'>Mortgage Type</label>
              <label 
                className={`radio-name ${selectedOption === 'repayment' ? 'active':''}`}
                onClick={() => handleRadioChange('repayment')}>
                
                <input type='radio' id='repayment' name='repayment' value='1' checked={selectedOption === 'repayment'} className='radio-input'/> 
                <span>Repayment</span>
              </label>
              <label 
              className={`radio-name ${selectedOption === 'interest' ? 'active':''}`}
              onClick={() => handleRadioChange('interest')}>
              
                <input type='radio' id='interest' name='interest' value='2' checked={selectedOption === 'interest'} className='radio-input'/>
                <span>Interest Rate</span>
              </label>
          </div>

          <button type='submit'>
            <img className="calculator-img" src={`${process.env.PUBLIC_URL}/images/icon-calculator.svg`} alt='Icon calculator'/>
            Calculate Repayments
          </button>
          
        </form>       
        
      </div>
      <div className="right-container">
        <img src={`${process.env.PUBLIC_URL}/images/illustration-empty.svg`} alt='background icon'/>
        <span className='top-text'>Results shown here</span>
        <span className='bottom-text'>Complete the form and click “calculate repayments” 
          to see what your monthly repayments would be.</span>
      </div>
    </div>
  );
}

export default App;
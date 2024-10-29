import React,{ useState} from 'react';
import './App.css';

function App() {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
  };

  const [formState, setFormState] = useState({
    amount: '',
    term: '',
    rate: '',
    repayment: '',
    interest: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    Object.keys(formState).forEach((fieldKey) => {
    if(!formState[fieldKey]) {
        validationErrors[fieldKey] = 'This field is required';
      }
    });
      
    setErrors(validationErrors);
  };

  return (
    <div className="App-container">
      <div className="left-container">
        <div className='heading'>
          <p>Mortgage Calculator <a href=''>Clear All</a></p>
        </div>

        <form className='mortgage-inputs' onSubmit={handleSubmit}>
          <div className='amount-container'>
            <label for='amount'>Mortgage Amount</label>
            <span className='pound'>£</span>          
            <input type='text' id='amount' 
            name='amount' className={`input-field ${errors.amount ? 'error' : ''}`}
            value={formState.amount}
            onChange={handleChange}
            />
            {errors.amount && <span className='error-validation'>{errors.amount}</span> }
          </div>
  
          <div className='inline-input-container'>
            <div className='inline-input'>
              <label for='term'>Mortgage Term</label>
              <span className='years'>years</span>            
              <input type='text' id='term' name='term' 
              className={`input-field inline ${errors.term ? 'error' : ''}`}
              value={formState.term}
              onChange={handleChange}
              />
              {errors.amount && <span className='error-validation'>{errors.amount}</span> }
            </div>
            <div className='inline-input'>  
              <label for='rate'>Interest Rate</label>
              <span className='porcentage'>%</span>
              <input type='text' id='rate' name='rate' 
              className={`input-field inline ${errors.term ? 'error' : ''}`}
              value={formState.rate}
              onChange={handleChange}
              />
            </div>
          </div>

          <div className='radio-container'>
            <label for='type'>Mortgage Type</label>
              <label 
                className={`radio-name ${selectedOption === 'repayment' ? 'active':''}
                            ${errors.interest && errors.repayment ? 'error' : ''}`}
                onClick={() => handleRadioChange('repayment')}                
                onSubmit={handleSubmit}
                >                
                <input type='radio' id='repayment' name='repayment' value='1' 
                checked={selectedOption === 'repayment'} 
                className='radio-input'/> 
                <span>Repayment</span>
              </label>

              <label 
              className={`radio-name interest ${selectedOption === 'interest' ? 'active':''}
                          ${errors.interest && errors.repayment ? 'error' : ''}`}
              onClick={() => handleRadioChange('interest')}
              onSubmit={handleSubmit}
              >
                <input type='radio' id='interest' name='interest' value='2' checked={selectedOption === 'interest'} className='radio-input'/>
                <span>Interest Rate</span>
              </label>
              {errors.interest && errors.repayment && <span className='error-validation'>{errors.amount}</span> }
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
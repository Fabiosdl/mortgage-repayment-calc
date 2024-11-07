import React,{ useState} from 'react';
import './App.css';

function App() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepayment, setTotalRepayment] = useState(0);

  const handleRadioChange = (option) => {
    
    setSelectedOption(option);
    setFormState((prevFormState) => ({ ...prevFormState, radio: option}));

    if (isSubmitted) {
      setErrors((prevErrors) => ({ ...prevErrors, radio: null })); // Clear radio error when selected after submit
    }
  };

  const [formState, setFormState] = useState({
    amount: '',
    term: '',
    rate: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    Object.keys(formState).forEach((fieldKey) => {
    if(!formState[fieldKey]) {
        validationErrors[fieldKey] = 'This field is required';
      }
    });

    // Validate radio field separately
    if (!selectedOption) {
      validationErrors.radio = 'This field is required';
    }

    setErrors(validationErrors);
    setIsSubmitted(true);

    // logic to calculate the mortgage repayment

    const amount = parseFloat(formState.amount);
    const years = parseInt(formState.term);
    const interestRate = parseFloat(formState.rate);

    const monthlyRate = interestRate / 100 / 12; 
    const numberOfPayments = years * 12;

    let monthlyPayment;
    let totalPayment;

    if(Object.keys(validationErrors).length === 0){
      if(selectedOption === 'repayment'){
        monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalPayment = monthlyPayment * years * 12;
          
      } else if (selectedOption === 'interest'){
        monthlyPayment = amount * monthlyRate;
        totalPayment = monthlyPayment * years * 12 + amount;
      }
      
      monthlyPayment = monthlyPayment.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      totalPayment = totalPayment.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      
      setMonthlyRepayment(monthlyPayment);// keep the result within 2 digits
      setTotalRepayment(totalPayment);
    }
  };

  return (
    <div className="App-container">
      <div className='background-container'>
        <div className="left-container">
          <div className='heading'>
            <p>Mortgage Calculator</p> <a href='#' 
              onClick={(e) => {
                e.preventDefault();
                setIsSubmitted(false);
                setSelectedOption(null);
                setFormState(
                  {amount: '',
                  term: '',
                  rate: '',
                  radio:''});                              
                setErrors({}); 
                }}>Clear All</a>
          </div>

          <form className='mortgage-inputs' onSubmit={handleSubmit}>
            <div className='amount-container'>
              <label for='amount' >Mortgage Amount</label>
                        
              <input type='text' id='amount' 
              name='amount' className={`input-field amount ${errors.amount ? 'error' : ''}`}
              value={formState.amount}
              onChange={handleChange}
              />
              <span className={`pound ${errors.amount ? 'error' : ''}`}>€</span>
              {errors.amount && <span className='error-validation'>{errors.amount}</span> }
            </div>
    
            <div className='inline-input-container'>
              <div className='inline-input'>
                <label for='term'>Mortgage Term</label>         
                <div className='inline-wrapper'>
                  <input type='text' id={`term`}  name='term' 
                  className={`input-field inline term ${errors.term ? 'error' : ''}`}
                  value={formState.term}
                  onChange={handleChange}
                  />              
                  <span className={`years ${errors.term ? 'error' : ''}`}>years</span>
                  {errors.term && <span className='error-validation-term'>{errors.term}</span> }
                </div>
              </div>
              <div className='inline-input'>  
                <label for='rate'>Interest Rate</label>
                <div className='inline-wrapper'>
                  <input type='text' id='rate' name='rate' 
                  className={`input-field inline rate ${errors.rate ? 'error' : ''}`}
                  value={formState.rate}
                  onChange={handleChange}
                  />
                  <span className={`porcentage ${errors.rate ? 'error' : ''}`}>%</span>
                  {errors.rate && <span className='error-validation'>{errors.rate}</span> }
                </div>
              </div>
            </div>

            <div className='radio-container'>
              <label for='type'>Mortgage Type</label>
                <label 
                  className={`radio-name ${selectedOption === 'repayment' ? 'active':''}
                              ${errors.interest && errors.repayment ? 'error' : ''}`}
                  onClick={() => handleRadioChange('repayment')}    
                  >                
                  <input type='radio' id='repayment' name='repayment' value='1' 
                  checked={selectedOption === 'repayment'} 
                  className='radio-input'/> 
                  <span>Repayment</span>
                </label>

                <label 
                className={`radio-name interest ${selectedOption === 'interest' ? 'active':''}
                            ${errors.radio ? 'error' : ''}`}
                onClick={() => handleRadioChange('interest')}
                >
                  <input type='radio' id='interest' name='interest' value='2' 
                  checked={selectedOption === 'interest'} 
                  className='radio-input'/>
                  <span>Interest Rate</span>
                </label>
                {isSubmitted && errors.radio && <span className='error-validation'>{errors.radio}</span>}
            </div>

            <button type='submit'>
              <img className="calculator-img" src={`${process.env.PUBLIC_URL}/images/icon-calculator.svg`} alt='Icon calculator'/>
              Calculate Repayments
            </button>                    
          </form>       
          
        </div>

        <div className="right-container">

          {isSubmitted && Object.keys(errors).length === 0 ? (
            <div className='result-container'>  
              <h2>Your results</h2>
              <p>Your results are shown below based on the information you provided. 
                To adjust the results, edit the form and click “calculate repayments” again.</p>
              
              <div className='payment-container'>
                <span className='your-repayment'>Your monthly repayments</span>
                <span className='monthly-value'><b>€{monthlyRepayment}</b></span>
                <hr/>
                <span className='your-repayment'>Total you'll repay over the term</span>
                <span className='total-value'><b>€{totalRepayment}</b></span>

              </div>
              
            </div> ) : (
            <div className='initial-container'>  
              <img src={`${process.env.PUBLIC_URL}/images/illustration-empty.svg`} alt='background icon'/>
              <span className='top-text'>Results shown here</span>
              <span className='bottom-text'>Complete the form and click “calculate repayments” 
                to see what your monthly repayments would be.</span>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

//conditional rendering
/*
 * send the code after conditional rendering and resume
 */

export default App;
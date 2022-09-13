import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cvcCode, setCvcCode] = useState("");

  const [wrongName, setWrongName] = useState(false);
  const [wrongCardNum, setWrongCardNum] = useState(false);
  const [wrongCardMonth, setWrongCardMonth] = useState(false);
  const [wrongCardYear, setWrongCardYear] = useState(false);
  const [wrongCvcCode, setWrongCvcCode] = useState(false);
  const [empty, setEmpty] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const submit = e => {
    e.preventDefault();


    if (name && cardNumber && cardMonth && cardYear && cvcCode != "") {
      let arr = [];

      for (let i = 0; i < cardNumber.length; i++) {
        arr.push(cardNumber[i])
      }

      arr.splice(4, 0, " ");
      arr.splice(9, 0, " ");
      arr.splice(14, 0, " ");

      const newString = arr.toString();

      const cardString = newString.replace(/,/g, "");

      if (name.match("[0-9]+") === null) {
        if (cardNumber.length === 16 && Number(cardNumber)) {
          if (cardMonth.length === 2 && Number(cardMonth) && cardMonth >= 1 && cardMonth <= 12) {
            if (cardYear.length === 2 && Number(cardYear) && cardYear >= 22 && cardYear <= 30) {
              if (cvcCode.length === 3 && Number(cvcCode)) {
                setIsFilled(true);
                setName(name.toUpperCase());
                setCardNumber(cardString);
                setCardMonth(cardMonth);
                setCardYear(cardYear);
                setCvcCode(cvcCode);
              } else {
                setWrongCvcCode(true);

                setTimeout(() => setWrongCvcCode(false), 3000);
              }
            } else {
              setWrongCardYear(true);

              setTimeout(() => setWrongCardYear(false), 3000);
            }
          } else {
            setWrongCardMonth(true);

            setTimeout(() => setWrongCardMonth(false), 3000);
          }
        } else {
          setWrongCardNum(true);

          setTimeout(() => setWrongCardMonth(false), 3000);
        }
      } else {
        setWrongName(true);

        setTimeout(() => setWrongName(false), 3000);
      }
    } else {
      setEmpty(true);

      setTimeout(() => setEmpty(false), 3000);

    }
  }

  const next = () => {
    setIsFilled(false);
    setName("");
    setCardNumber("");
    setCardMonth("");
    setCardYear("");
    setCvcCode("");
    setWrongName(false);
    setWrongCardNum(false);
    setWrongCardMonth(false);
    setWrongCardYear(false);
    setWrongCvcCode(false);
    setEmpty(false);
  }

  return (
    <section className='main'>
      <div className='top-area'>
        <div className='cards-area'>
          <div className='back-card'>
            <p className='code-p'>{isFilled ? cvcCode : "000"}</p>
          </div>
          <div className='front-card'>
            <div className='circle-one'></div>
            <div className='circle-two'></div>
            <p className='card-number'>{isFilled ? cardNumber : "0000 0000 0000 0000"}</p>
            <p className='card-name'>{isFilled ? name : "JANE APPLESEED"}</p>
            <p className='card-date'>{isFilled ? cardMonth + "/" + cardYear : "00/00"}</p>
          </div>
        </div>
      </div>
      <div className='bottom-area'>
        {isFilled ? (<div className='confirmed-add'>
          <div className='circle-area'>
            <div className='circle'></div>
          </div>
          <div className='confirmed-text'>
            <h2>THANK YOU!</h2>
            <p>We've added your card details</p>
          </div>
          <button onClick={next}>Continue</button>
        </div>) : (
          <div className='form-container'>
            <form onSubmit={submit}>
              <div className='input-form-area'>
                <label htmlFor="name">CARDHOLDER NAME</label>
                <input type="text" id='name' placeholder='e.g. Jane Appleseed' value={name} onChange={e => setName(e.target.value)} style={{border: `1px solid ${wrongName? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)"}`}}/>
                {wrongName && <p className='error-message'>- Card name field are wrong !</p>}
              </div>
              <div className='input-form-area'>
                <label htmlFor="card-number">CARD NUMBER</label>
                <input type="text" id='card-number' placeholder='e.g. 1234 5678 9123 0000' maxLength="16" value={cardNumber} onChange={e => setCardNumber(e.target.value)} style={{border: `1px solid ${wrongCardNum? "hsl(0, 100%, 66%)": "hsl(270, 3%, 87%)"}`}}/>
                {wrongCardNum && <p className='error-message'>- Card number field are wrong !</p>}
              </div>
              <div>
                <div className='input-date-area'>
                  <div className='label-m-y'>
                    <p>EXP. DATE</p>
                    <label htmlFor="month">(MM</label>
                    <p>/</p>
                    <label htmlFor="year">YY)</label>
                  </div>
                  <label htmlFor="code">CVC</label>
                </div>
                <div className='inputs-format'>
                  <input type="text" id='month' placeholder='MM' className='m-y' maxLength={"2"} value={cardMonth} onChange={e => setCardMonth(e.target.value)} style={{border: `1px solid ${wrongCardMonth? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)"}`}}/>
                  <div className='month-error'>
                    {wrongCardMonth && <p className='error-message'>- Wrong Field !</p>}
                  </div>
                  <input type="text" id='year' placeholder='YY' className='m-y' maxLength={"2"} value={cardYear} onChange={e => setCardYear(e.target.value)} style={{border: `1px solid ${wrongCardYear? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)"}`}}/>
                  <div className='year-error'>
                    {wrongCardYear && <p className='error-message'>- Wrong Field !</p>}
                  </div>
                  <input type="text" id='code' placeholder='e.g 123' className='cvc' maxLength={"3"} value={cvcCode} onChange={e => setCvcCode(e.target.value)} style={{border: `1px solid ${wrongCvcCode? "hsl(0, 100%, 66%)" : "hsl(270, 3%, 87%)"}`}}/>
                  <div className='cvc-error'>
                    {wrongCvcCode && <p className='error-message'>- Wrong Field !</p>}
                  </div>
                </div>
              </div>
              <button>Confirm</button>
              {empty &&
                <div className='empty-fields'>
                  <p className='error-message'>- Some field are empty !</p>
                </div>}
            </form>
          </div>)}
      </div>
    </section>
  )
}

export default App

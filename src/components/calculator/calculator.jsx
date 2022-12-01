import React, { useState, useRef, useEffect } from 'react'
import './calculator.css'
import History from '../history/history'


const Calculator = () => {
  
    const [result, setResult] = useState(0)
    const showResult = useRef(null)

    const [history, setHistory] = useState([])
    const [overlay, setOverlay] = useState(false)

    const numbers_operators=[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '(', ')', '+', '-', 'x', '%','/'];
    const actions=['=', 'Delete','Clear', 'History']
    
   
    useEffect(() => {

        if(result==="0") {
            setResult(0)
        }
        if(overlay)
        {
            document.getElementById("calculator-history").style.display = 'block'
          
        }
        else{
            document.getElementById("calculator-history").style.display = 'none'
        }
        window.addEventListener("resize",changeButtonView);
    
       
    }, [result, overlay])

    const changeButtonView = () => {
        if(window.innerWidth<340)
        {
            document.getElementById("blue").innerText = 'H'
            document.getElementById("blue").style.padding = '10px 15px';
            document.getElementById("yellow").innerHTML = 'C '
            document.getElementById("yellow").style.padding = '10px 15px';
            document.getElementById("red").innerHTML = 'D'
            document.getElementById("red").style.padding = '10px 15px';
        }
        else{
            document.getElementById("blue").innerText = 'History'
            document.getElementById("blue").style.padding = '10px';
            document.getElementById("yellow").innerHTML = 'Clear '
            document.getElementById("yellow").style.padding = '10px';
            document.getElementById("red").innerHTML = 'Delete'
            document.getElementById("red").style.padding = '10px';
        }
    }

    const calculate = (value) => {

        setResult((result+value).toString()) 

    }

    const getResult = () => {
        
        showResult.current=result

        try { 
            let calc = "";
            calc+=showResult.current

            if(result.includes("x")) {
                showResult.current=(showResult.current).replace(/x/g, "*");
            }

            showResult.current=eval(showResult.current);
                
            setResult((showResult.current).toString())
            calc+=" = "+ showResult.current
            setHistory([calc, ...history])
          }
          catch {
            alert("Unexpected Input")
          }
        
    }

    const deleteResult = () => {
        setResult(result.slice(0, result.length-1))
    
        if(result.length===1) {
            setResult(0)
        }
    }

    const clearResult = () => {
        setResult(0)
        setHistory([])
        showResult.current=null
    }
  return (
    <>
    <div className='calculator-app'>
        <div className='calculator-screen'>
            <span>{result}</span>
        </div>
        <div className='calculator-buttons'>
            <div className='numbers-operators'> 
            {numbers_operators.map((value, key) => {
              return <button key={key} onClick= {() => calculate(value)}>{value}</button>
            })}
           </div>
        
           <div className='actions'>   
           {actions.map((value, key) => {
              return <button key={key} 
              id={`${value === 'History' ? "blue"
              : value === "Delete" ? "red"
              : value === "Clear"? "yellow" : "green"
              }`} 
              onClick= {()=>`${value === 'History' ? setOverlay(true)
              : value === "Delete" ? deleteResult()
              : value === "Clear"? clearResult() 
              : getResult()}`}>{value}</button>
            })}    
           </div>
        </div>
        <div id='calculator-history'>
            <span title='Close' id="close-history" onClick={()=>setOverlay(false)}>X</span>
            <History history={history}/>
        </div>
    </div>       
    </>
  )
}

export default Calculator
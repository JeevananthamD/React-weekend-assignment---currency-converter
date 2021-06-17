import React, { useEffect, useRef, useState } from 'react'
import Option from "./Option";

function CurrencyConverter() {

    const [rates, setRates] = useState(() => null);
    const first = useRef(null);
    const second = useRef(null);
    const [fc, setFC] = useState("USD");
    const [sc, setSC] = useState("INR");
    

    useEffect(() => {
        (async function(){
        let response = await fetch("http://api.exchangeratesapi.io/v1/latest?access_key=0460356ea64f6a252fa77bc1caa8f8b6");
        let json = await response.json();
        first.current.value = (1).toFixed(2);
        second.current.value = ((json.rates.INR * first.current.value)/ json.rates.USD).toFixed(2);
        setRates(json.rates);
        })();
    }, [])

    function firstCurrency(value) {
        let firstValue = first.current.value;
        second.current.value =  ((firstValue * rates[sc]) / rates[value]).toFixed(2);
        setFC(value);
    }

    function secondCurrency(value) {
        let secondValue = second.current.value;
        first.current.value = ((secondValue * rates[fc]) / rates[value]).toFixed(2);
        setSC(value);
    }

    function firstInput(value) {
        let firstValue = value;
        second.current.value =  ((firstValue * rates[sc]) / rates[fc]).toFixed(2);
    }

    function secondInput(value) {
        let secondValue = value;
        first.current.value = ((secondValue * rates[fc]) / rates[sc]).toFixed(2);
    }

    return (
        <div>
            <h2>Currency Converter</h2>
            <div>
                <select className="mt-5 me-1" value={fc} onChange={(e) => firstCurrency(e.target.value)}>
                    {(rates)? Object.entries(rates).map((i,j) => <Option key={j} country={i}/> ): ""}
                </select> 
                <input ref={first} onChange={(e) => firstInput(e.target.value)}/>
            </div>
            <div>
                <select className="mt-5 me-1" value={sc} onChange={(e) => secondCurrency(e.target.value)}>
                    {(rates)? Object.entries(rates).map((i,j) => <Option key={j} country={i}/> ): ""}
                </select> 
                <input ref={second} onChange={(e) => secondInput(e.target.value)}/>
            </div>
        </div>
    )
}

export default CurrencyConverter;

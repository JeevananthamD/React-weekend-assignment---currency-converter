import React from 'react'

function Option({country}) {
    return (
        <>
            <option value={country[0]}>{country[0]}</option> 
        </>
    )
}

export default Option

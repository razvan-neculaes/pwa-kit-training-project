import React, {useState} from 'react'

const SomeTests = () => {
    const [count, setCount] = useState(0)
    const [randomArray, setRandomArray] = useState([])
    const [randomObject, setRandomObject] = useState({})

    const generateRandomObject = (input) => {
        const obj = JSON.parse(input)
        const id = (Math.random() + 1).toString(36).substring(7)
        const val = (Math.random() + 1).toString(36).substring(7)
        obj[id] = val

        setRandomObject(obj)
        console.log(randomObject)
    }

    const generateRandomIds = (input) => {
        const id = (Math.random() + 1).toString(36).substring(7)

        setRandomArray([...input, id])
        console.log(randomArray)
    }

    const showRandomArrayItems = (input) => input.join(` `)

    const showRandomObject = (object) => JSON.stringify(object)

    return (
        <div className="t-product-simple" itemScope itemType="http://schema.org/">
            <div>
                <p>Generate random objects...</p>
                <p>{showRandomObject(randomObject)}</p>
                <button onClick={() => generateRandomObject(JSON.stringify(randomObject))}>
                    Add Random Key
                </button>
            </div>

            <br />

            <div>
                <p>Generate random ids...</p>
                <p>[{showRandomArrayItems(randomArray)}]</p>
                <button onClick={() => generateRandomIds(randomArray)}>Add Random ID</button>
            </div>

            <br />

            <div>
                <p>You clicked {count} times</p>
                <button onClick={() => setCount((prevCount) => prevCount + 1)}>Click me</button>
            </div>
        </div>
    )
}

SomeTests.getTemplateName = () => 'some-tests'

export default SomeTests

import React, { useContext, useEffect } from 'react'
import './Usersearchresult.css'
import { inputTextContext } from '../../store/inputTextContext'
import { API_KEY, CX } from '../../Apietc';
import { useNavigate } from 'react-router-dom';
// import Context from '../../store/inputTextContext'

function Usersearchresult() {
    const navigate = useNavigate()
    useEffect(() => {


    }, []);


    const { inputText, SetInputText } = useContext(inputTextContext)

    const data2 = localStorage.getItem('data')
    const data = JSON.parse(data2)

    // console.log(inputText);
    const searchTerm = data?.queries?.request[0]?.searchTerms

    window.addEventListener('load', function () {
        SetInputText(searchTerm)


    })

    // console.log(data);



    const Fetchdata = (item) => {


        return (<div className='item'>


            <div>
                <a className='link ' href={item.item.formattedUrl}>
                    {/* <h1>{n}</h1> */}
                    <img className='iconimg' src={item.item?.pagemap?.cse_thumbnail ? item.item.pagemap?.cse_thumbnail[0].src : ''} alt="" />
                    <p className='displaylink'>{item.item.displayLink}</p>
                    <p className='formattedUrl'>{item.item.formattedUrl}</p>
                </a>

            </div>
            <div className='imgdiv'>
                <a className='link ' href={item.item.formattedUrl}>

                    <img className='img' src={item.item?.pagemap?.cse_image ? item.item.pagemap?.cse_image[0].src : ''} alt="" />
                </a>
            </div>
            <a className='link1 titlediv' href={item.item.formattedUrl}>

                <div className=''>
                    <h2 className='title' >{item.item.title}</h2>
                </div>
            </a>
            <div className='snippet'>
                <p >{item.item.snippet}</p>
            </div>

        </div>)
    }
    const searchhistory = JSON.parse(localStorage.getItem('searchHistory')) || []

    const pushsearchhistory = () => {
        searchhistory.push(inputText)
        localStorage.setItem('searchHistory', JSON.stringify(searchhistory))
    }

    const searchsubmit = (e) => {
        pushsearchhistory()





        // alert(123)

        e.preventDefault()



        const resultURL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}=${inputText}`


        fetch(resultURL)
            .then(response => response.json())
            .then(data => {



                // console.log(resultURL)
                const resultdata = JSON.stringify(data)
                localStorage.setItem('data', resultdata)
                window.location.reload()

            })


            .catch(error => {
                console.error("fetching search results failed due to :", error)
            })




    }

    return (

        <div className='container' id='container' >
            <div className="header">
                <form action="" onSubmit={searchsubmit}>

                    <input type="text" name="" value={inputText} onChange={(e) => {
                        SetInputText(e.target.value)
                    }} className='searchinput2' />
                </form>
            </div>
            {/* <Fetchdata /> */}
            {
                data.items?.map((value, index) => (<Fetchdata item={value} />))}

            <div className="footer">

            </div>

        </div>
    )
}

export default Usersearchresult

import { useState, useEffect, useContext } from 'react';
import './App.css';
import bg1 from './bg/bg1.mp4'
import bg2 from './bg/bg2.mp4'
import bg3 from './bg/bg3.mp4'
import { useNavigate, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Usersearchresult from './pages/usersearchresult/Usersearchresult';
import { API_KEY, CX } from './Apietc';
import { inputTextContext } from './store/inputTextContext';
import * as firebase from 'firebase/app'
import { firebaseConfig } from './conrfig';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'









// function getFile() {
//   document.getElementById("upfile").click();
// }

// function sub(obj , e) {
//   var file = obj.value;
//   var fileName = file.split("\\");
//   document.getElementById("yourBtn").innerHTML = fileName[fileName.length - 1];
//   document.myForm.submit();
//   e.preventDefault();
// }

// const InputFile =()=>{
//   <form action="" method="POST" enctype="multipart/form-data" name="myForm">
//   <div id="yourBtn" onClick={getFile()}>click to upload a file</div>
//   {/* <!-- this is your file input tag, so i hide it!--> */}
//   {/* <!-- i used the onchange event to fire the form submission--> */}
//   <div style={{height: '0px',width: '0px', overflow:'hidden'}}><input id="upfile" type="file" value="upload" onChange={sub(this)} /></div>
//   {/* <!-- here you can have file submit button or you can write a simple script to upload the file automatically--> */}
//   {/* <!-- <input type="submit" value='submit' > --> */}
//   </form>
// }







function Buttons() {
  const [color, SetColor] = useState('')
  const cb = () => {
    // const dropdown = document.getElementById('dropdown')
    const s2d = document.getElementById('s2d')

    const dbtn = document.getElementsByClassName('dbtn')
    for (var i = 0; i < dbtn.length; i++) {

      dbtn[i].style.display = 'none'

    }
    // dropdown.style.top = '-83px'
    s2d.style.display = 'block'

  }

  const history = () => {
    const dbtn = document.getElementsByClassName('dbtn')
    for (var i = 0; i < dbtn.length; i++) {

      dbtn[i].style.display = 'none'

    }
    const history = document.getElementById('hstry')
    history.style.display = 'block'

  }








  const style1 = {
    width: '80px',
    margin: '5px'
  }
  const style10 = {
    // value:'default',
    width: '78px',
    margin: '5px',
    border: ' 1px solid rgb(0, 149, 255)'
  }
  const style2 = {
    fontWeight: '600',
    fontSize: '13px',

  }
  const style3 = {
    fontWeight: '600',
    fontSize: '13px',
    marginTop: '50px',
    marginLeft: '10px',


  }

  const livebg = (e) => {
    var vidbg = document.getElementById('vidbg')
    vidbg.style.display = 'block'
    uploadToLocalStorage('temsrcnum', e)

    if (e === 0) {
      vidbg.src = e

    } else if (e === 1) {
      vidbg.src = bg1

    } else if (e === 2) {
      vidbg.src = bg2


    } else if (e === 3) {
      vidbg.src = bg3

    } else {
      vidbg.src = null

    }
  }
  const dropup = () => {
    var dropdown = document.getElementById('dropdown')
    dropdown.style.height = '0%'
    // var dropdownchildren = document.getElementById('s2d')
    // dropdownchildren.style.display = 'none'

  }
  const uploadToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const nothinghere = () => {
    alert('Nothing Here')
  }
  const setfunction = () => {

    const bg = document.getElementById('bg')
    if (image) {
      upload()

      var url = URL.createObjectURL(image)
      bg.style.background = `url(${url})`


    }





    dropup()
    var vidbg = document.getElementById('vidbg')
    var n = JSON.parse(localStorage.getItem('temsrcnum'))
    var bgcolor = JSON.parse(localStorage.getItem('bg'))
    if (color === bgcolor) { } else {
      localStorage.removeItem('src')
      localStorage.removeItem('temsrcnum')
    }
    if (color) {
      var background = color
      uploadToLocalStorage('bg', background)





    }
    if (n === 0) {
      localStorage.removeItem('src')

    }
    if (n) {

      if (n === 1) {
        var src = bg1
        uploadToLocalStorage('src', src)

      }
      if (n === 2) {
        var src = bg2
        uploadToLocalStorage('src', src)

      }
      if (n === 3) {
        var src = bg3
        uploadToLocalStorage('src', src)

      }




    }

  }





  const Firebase = firebase.initializeApp(firebaseConfig);

  const [image, setImage] = useState(null)
  const storage = getStorage()

  const [percent, setPercent] = useState(0);
  const upload = () => {
    if (!image) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/image/${image.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          imgurl.push(url)
          console.log(imgurl);


        })
          .then(() => {

            alert("! successfully completed !")
            window.location.reload()

            setImage(null)
            const bg = document.getElementById('bg')

            localStorage.setItem('urlarray', JSON.stringify(imgurl));
            var url4bg = imgurl[imgurl.length - 1]
            bg.style.background = `url(${url4bg})`

            localStorage.setItem('url4bg', JSON.stringify(url4bg))

          })
      }
    );
  };

  const imgurl = JSON.parse(localStorage.getItem('urlarray')) || [];





  const imgclicked = (bgurl) => {
    const bg = document.getElementById('bg')

    bg.style.background = `url(${bgurl})`

    localStorage.setItem('url4bg', bgurl)




  }
  const backtothelobby = () => {

    const s2d = document.getElementById('s2d')
    const history = document.getElementById('hstry')
    const dbtn = document.getElementsByClassName('dbtn')
    for (var i = 0; i < dbtn.length; i++) {

      dbtn[i].style.display = 'block'

    }
    s2d.style.display = 'none'
    history.style.display = 'none'

  }
  const searchhistory = JSON.parse(localStorage.getItem('searchHistory'))

  // const historychecked = ()=> {
  //   const list = document.getElementsByClassName('hislist')
  //   const checkbox = document.getElementsByClassName('historycheckbox')
  //   for(var i =0 ;i<checkbox.length; i++){

    
  //   if (checkbox[i].checked) {
  //     list[i].style.background = 'rgb(0, 149, 255)'
  //   } else {
  //     list[i].style.background = ''

  //   }}

  // }



  const removethis=(index)=>{
    console.log(index);
    searchhistory.splice(index, 1)
    console.log(searchhistory);

    localStorage.setItem('searchHistory', JSON.stringify(searchhistory))

    window.location.reload()
    

  }

 

  return (

    <div id='buttons' > 
      <div>

        <button onClick={cb} className='dbtn' >custom background</button>
        <button onClick={history} className='dbtn' >History</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
        <button onClick={nothinghere} className='dbtn' >nothinghere</button>
      </div>










      <div id='s2d' style={{ display: 'none' }}>
        <div  style={{
          color: 'rgb(9 9 26)',
          width: '180px',
          position: 'relative',
          top: '17px',
          left: '8px',
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',



        }}>

          <i class="fa-solid fa-angle-left" onClick={backtothelobby} style={{
            fontSize: ' 19px',
            marginRight: '10px',
            cursor:'pointer'

          }} ></i>
          <h2 style={{
            fontSize: '16px',


          }}>custom background</h2>
        </div>
        <div className='cback' style={{
          position: 'relative',
          width: '93%',
          margin: '5%',
          // background:'green',
          top: '40px',
          borderRadius: '10px'

        }}>
          <p style={style2}>live bg</p>
          <video style={style10} src='' onClick={() => {
            livebg(0)
          }}
          ></video>
          <video style={style1} src={bg1} onClick={() => {
            livebg(1)
          }}></video>
          <video style={style1} src={bg2} onClick={() => {
            livebg(2)
          }}></video>
          <video style={style1} src={bg3} onClick={() => {
            livebg(3)
          }}
          ></video>
        </div>
        <div>
          <p style={style3}>solid color</p>
          <input type="color" name="" id="" style={{
            border: 'none',
            position: 'relative',
            left: '15px',
            width: '40%',
            height: '58px',
          }}
            value={color}
            onChange={(e) => {
              SetColor(e.target.value)
              document.getElementById('bg').style.background = color



            }}
          />
          <input type="text" placeholder='rgba, hex ... not text' name="" id="" value={color} onChange={(e) => {
            SetColor(e.target.value)
          }}
            style={{
              position: 'relative',
              left: '10px',
              top: '10px',
              width: '80%',
            }} />
          <p style={style3}>Yours</p>
          <label style={{ background: `url(${image ? URL.createObjectURL(image) : ''})`, backgroundSize: `${image ? '100%' : ''}` }} className='forfile' htmlFor={image ? '' : "file"}>{image ? '' : 'Click Here To '}<br />{image ? '' : 'Upload Yours'}</label>
          <input type="file" name="file" id="file"
            onChange={(e) => setImage(e.target.files[0])}

          />
          <div style={{
            // background:'green',
            width: '100%',
            position: 'relative',
            margin: '20px 0',
            height: 'auto',
          }}>
            {imgurl?.map((value, index) => (<img className='userusedimg' onClick={(e) => imgclicked(e.target.src)} src={imgurl[index]} alt="" />))}



          </div>
          <button className='defaultbtn' onClick={() => {
            document.getElementById('bg').style.background = '#202124'
            SetColor('#202124')
            document.getElementById('vidbg').src = null
            localStorage.removeItem('src')
            localStorage.removeItem('temsrcnum')
            localStorage.removeItem('url4bg')

          }
          }>default</button>
          <button className='defaultbtn' onClick={setfunction}>set</button>

        </div>
      </div>
      <div id='hstry'>
        <div style={{
          color: 'rgb(9 9 26)',
          width: '180px',
          position: 'relative',
          top: '17px',
          left: '8px',
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',



        }}>

          <i class="fa-solid fa-angle-left" onClick={backtothelobby} style={{
            fontSize: ' 19px',
            marginRight: '10px',
            cursor:'pointer'

          }} ></i>
          <h2 style={{
            fontSize: '16px',

          }}>History</h2>
        </div>
        <div className='hisbdy needscroll'>
          {searchhistory?.map((value, index) => (<div className='hoverbgchange hislist' id='hislist'>


            <h4 style={{ width: '170px' }} >{value}</h4>


            {/* <input type="checkbox" onChange={historychecked } name="" className='historycheckbox' id="historycheckbox" style={{
              position: 'relative',
              marginLeft: '-4px'
            }} /> */}
            <i class="fa-solid fa-xmark" onClick={()=>{removethis(value)}} style={{
              position: 'relative',
              marginLeft: '-4px',
              cursor:'pointer'
            }} ></i>
          </div>))}

        </div>



      </div>



    </div>
  )
}
function App() {


  const dropup = (e) => {
  if(document.getElementById('container')){
    document.getElementById('container').style.top = '-11vh'
    
  }

    var bg = document.getElementById('bg')

    const target = e.target
    var dropdown = document.getElementById('dropdown')
    const div1 = dropdown
    // bg.removeEventListener('click', dropup)


    if (!div1.contains(target)) {



      dropdown.style.height = '0%'
      var dropdownchildren = document.getElementById('s2d')
      // dropdownchildren.style.display = 'none'
      const dbtn = document.getElementsByClassName('dbtn')
      for (var i = 0; i < dbtn.length; i++) {

        // dbtn[i].style.display = 'none'

      }
    }

  }
  const menuopen = () => {
    if(document.getElementById('container')){
      document.getElementById('container').style.top = 'calc(-11vh - 99%)'
      
    }

    var bg = document.getElementById('bg')
    const dropdown = document.getElementById('dropdown')
    bg.addEventListener('click', dropup)
    const dbtn = document.getElementsByClassName('dbtn')
    dropdown.style.height = '99%'
    dropdown.style.top = '-70px'

    for (var i = 0; i < dbtn.length; i++) {

      // dbtn[i].style.display = 'block'
      dbtn[i].style.animation = 'ftopf 2s ease '
    }
  }
  const bggcolor = JSON.parse(localStorage.getItem('bg'))

  const style4 = {
    background: bggcolor
  }




  return (




    <div className='bg' id='bg' style={style4} >


      <button onClick={menuopen} className='menubtn' style={{ zIndex: '1' }}>&#8942; </button>



      <div className='dropdown' id='dropdown' style={{ zIndex: '1' }}>

        <Buttons />


      </div>


      <Router>
        <Routes>
          <Route exact path='/newtab' element={<Form />} />

          <Route path='/usersearchresult' element={<Usersearchresult />} />

        </Routes>
      </Router>


    </div>




  );
}

export default App;
// AIzaSyCd-bks9bbLWMxZjaEUyGgZpYKnu-gzwxw

//{/* <script async src="https://cse.google.com/cse.js?cx=e60776bb2d2634c6d">
//</script>
//<div class="gcse-search"></div> */}

function Form() {
  // const baseurl = 'https://www.google.com/search?q= '

  // const endurl = '&oq=&gs_lcrp=EgZjaHJvbWUqCQgAECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQ4xOTM0MjQ0NTlqMGoxNagCCLACAQ&sourceid=chrome&ie=UTF-8'
  const navigate = useNavigate()

  const { inputText, SetInputText } = useContext(inputTextContext)
  const searchhistory = JSON.parse(localStorage.getItem('searchHistory')) || []

  const pushsearchhistory = () => {
    searchhistory.push(inputText)
    // console.log(searchhistory);
    localStorage.setItem('searchHistory', JSON.stringify(searchhistory))
  }

  const searchsubmited = (e) => {

    pushsearchhistory()


    e.preventDefault()
    {
      // if(inputText === 'v3_beaast'){
      //   window.location.href = 'https://www.instagram.com/v3_beaast/'
      // }else  if(inputText === 'v3_beaast'){
      //   window.location.href = 'https://www.instagram.com/v3_beaast/'
      // }else if (inputText === 'youtube' || inputText === 'you tube' || inputText === 'you Tube' || inputText === 'youTube' || inputText === 'YouTube' || inputText === 'You Tube') {
      //   window.location.href = 'https://www.youtube.com'
      // } else if (inputText === 'instagram' || inputText === 'Instagram') {
      //   window.location.href = 'https://www.instagram.com'
      // } else if (inputText === 'facebook' || inputText === 'face book' || inputText === 'Facebook' || inputText === 'Face book' || inputText === 'Face Book' || inputText === 'face Book') {
      //   window.location.href = 'https://www.facebook.com'
      // } else if (inputText === 'tiktok' || inputText === 'tik tok' || inputText === 'TikTok' || inputText === 'Tik Tok' || inputText === 'tikTok' || inputText === 'Tiktok' || inputText === 'Tik tok' || inputText === 'tik Tok') {
      //   window.location.href = 'https://www.tiktok.com'
      // } else  {

      //   var url = baseurl + encodeURIComponent(inputText)
      //   if (inputText.length < 1) { } else {

      //     navigate('/usersearchresult')
      //     window.open(url, '_blank');

      //   }
      // }
    } //DINO

    const resultURL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}=${inputText}`


    fetch(resultURL)
      .then(response => response.json())
      .then(data => {



        console.log(data)
        const resultdata = JSON.stringify(data)
        localStorage.setItem('data', resultdata)
        navigate('/usersearchresult')

      })
      .catch(error => {
        console.error("fetching search results failed due to :", error)
      })



  }
  const src = JSON.parse(localStorage.getItem('src'))

  const check = () => {

    const url4bg = localStorage.getItem('url4bg')
    if (url4bg) {
      document.getElementById('bg').style.background = `url(${url4bg})`
    }

    if (src) {
      document.getElementById('vidbg').style.display = 'block'
      // }
    }
  }
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      check();
    }
  }, [location]);
  document.addEventListener('DOMContentLoaded', check)


  window.addEventListener('load', check)
  return (
    <div>
      <video src={src ? src : 0} muted autoPlay loop className="vidbg pointereventnone" id='vidbg' />


      <form action="" className='form' onSubmit={searchsubmited}>
        <input type="text" className='searchinput' value={inputText} onChange={(e) => {
          SetInputText(e.target.value)
        }} />

        <input type="submit" value="search" className='submit' />
      </form>
    </div>
  )
}
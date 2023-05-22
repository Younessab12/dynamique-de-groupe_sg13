import './App.css';
import { Slides } from './components/Slides';
import Select from 'react-select';
import img from "./assets/img/img.jpeg";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from './components/NavBar';
import Loader from './components/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';
import Ucap from "./assets/img/Ucap.jpg";
import none from "./assets/img/none.png";
import conf_orien from "./assets/img/conf_orien.jpg";
import baconnect from "./assets/img/baconnect.jpg";
import daydream_orphan from "./assets/img/Daydream_orphan.jpg";
import enq from "./assets/img/enq.jpg";
import podcast from "./assets/img/podcast.jpg";
import chill from './assets/img/chill.jpg';
import gdzgreen from "./assets/img/gadzgreen.jpg";
import podcast2 from "./assets/img/podcast2.jpg";
import ensamh from "./assets/img/ensamh.jpg";
import groupe from "./assets/img/Groupe.jpg";
import lec from "./assets/img/leq.png";
import mag from "./assets/img/mag.jpg";

function App() {
  const options = [
    [
      { value: 'none', label: 'none',color :'black' },
      { value: 'Enquête sur la formation arts et métiers, SG21', label: 'Enquête sur la formation arts et métiers, SG21',color :'black' },
      { value: 'Conférence d\'orientation de filière, SG71', label: 'Conférence d\'orientation de filière, SG71', color :'black'}, 
      { value: 'Gadz Green, SG61 ', label: 'Gadz Green, SG61 ' ,color :'black'}, 
      { value: 'Échange intergenerationnel, SG13', label: 'Échange intergenerationnel, SG13',color :'black' },
      { value: 'Daydream orphan, SG11', label: 'Daydream orphan, SG11', color :'black'}, 
      { value: 'Ucap, SG53', label: 'Ucap, SG53' ,color :'black'},
      { value: 'Baconnect, SG72', label: 'Baconnect, SG72' ,color :'black'},
      { value: "podcast ensamien, SG43", label: 'podcast ensamien, SG43' ,color :'black'},
      { value: "Chill spot, SG43", label: 'Chill spot, SG43' ,color :'black'},
      { value: "L'histoire de l'ENSAM, SG13", label: "L'histoire de l'ENSAM, SG13" ,color :'black'},
      { value: "Podcast L'intelligence artificielle, SG23", label: "Podcast L'intelligence artificielle, SG23" ,color :'black'},
      { value: "Journée de lecture, SG51", label: "Journée de lecture, SG51" ,color :'black'},
      { value: "Magazine universitaire, SG33", label: "Magazine universitaire, SG33" ,color :'black'}
    ]
  ];

  const [error, setError] = useState(false);

  const [code ,setCode ]= useState("");

  const [value ,setValue ]= useState("none");

  const [show , setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(0);

  

  // const handelChange=(selectedOption)=>{
  //   setValue(selectedOption.value);
  //   console.log(selectedOption.value);
  // }

  const colorStyles ={
    controle : (styles)=>({...styles}),
    option : (styles, {data, isDisabled, isFocused, isSelected})=>{
    return{...styles,color :data.color,width:'auto'}
    }
  }


  const handelSubmit= async(e)=>{
    e.preventDefault();
    setShow(false);
    if(code === ""){
      setError(true);
    }
    else{
      const vote = {code, value};
      setLoading(true)
      const res = await fetch('https://jdg23-vote.onrender.com/users/api/post',{
        method:'post',
        body:JSON.stringify(vote),
        headers:{
          'Content-Type':'application/json'
        }
      })
      setLoading(false);
      if(!res.ok){
        let msg = "";
        if(res.status === 404)
          msg = "not a valid code";
        else 
          msg = "this code has alredy been used"
        toast.error(msg,{
          position:"bottom-right",
          autoClose:5000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          pauseOnFocusLoss:false,
          draggable:true,
          progress:undefined,
          theme:'dark',
        });
      }
      else{
        console.log(res)
        toast.success("your vote has been submited",{
          position:"bottom-right",
          autoClose:5000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          pauseOnFocusLoss:false,
          draggable:true,
          progress:undefined,
          theme:'dark',
        });
      }
    }
  }
  const props = [
    {title : "PROJECTS",
    des : "vote for the best project",
    data:[
      {
        img : none,
        title : "none"
      }
      ,{
        img : enq,
        title : "Enquête sur la formation arts et métiers, SG21",
      },
      {
        img : conf_orien,
        title : "Conférence d'orientation de filière, SG71 ",
      },
      {
        img : gdzgreen,
        title : "Gadz Green, SG61 ",
      },
      
      {
        img : groupe,
        title : "Échange intergenerationnal, SG13",
      },
      {
        img : daydream_orphan,
        title : "Daydream orphan, SG11",
      },
      {
        img : Ucap,
        title : "Ucap, SG53",
      },
      {
        img : baconnect,
        title : "Baconnect, SG72",
      },
      {
        img : podcast,
        title : "podcast ensamien, SG43",
      },
      {
        img : chill,
        title : "Chill spot, SG23",
      },
      {
        img : ensamh,
        title : "L'histoire de l'ENSAM, SG13",
      },
      {
        img : podcast2,
        title : "Podcast L'intelligence artificielle, SG23",
      },
      {
        img : lec,
        title : "Journée de lecture, SG51",
      },
      {
        img : mag,
        title : "Magazine universitaire, SG33",
      }
    ]}
  ]

  const action = (selectedOption)=>{
    setSelectedOption(selectedOption);
    setValue(options[0][selectedOption].value);
  }

  const submition=(e)=>{
    e.preventDefault();
    if(code === ''){
      setError(true);
    }
    else{
      setShow(true);
    }

  }


  return (
    <div className="app">
      <NavBar/>
      <Slides {...props[0]} action={action}/>
      <div className='select-options'>
      <Select options={options[0]} styles = {colorStyles}  inputValue={options[0][selectedOption%options[0].length].value}/>
      </div>
      <div className='form'>
      <form className= {error && code.length<=0?"input-error":"input-code"} onSubmit={submition}>
        <input type="text" placeholder='enter the code here'  value={code} onChange={(e)=>setCode(e.target.value)}/>
        {error && code.length<=0?<label>you must enter the code</label>:""}
        <button type="submit" className='input-btn'><h5>submit</h5> </button>
        
      </form>
      </div>
      <ToastContainer />
      {loading &&<Loader/>}
      {<Modal setShow={setShow} value = {value} handelSubmit={handelSubmit} show = {show} />}
      {/* <Footer/> */}
      
    </div>
  );
}

export default App;

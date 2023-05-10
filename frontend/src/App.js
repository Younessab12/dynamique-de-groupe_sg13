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

function App() {
  const options = [
    [
      { value: 'none', label: 'none',color :'black' },
      { value: 'Enquête sur la formation arts et métiers, SG21', label: 'Enquête sur la formation arts et métiers, SG21',color :'black' },
      { value: 'Conférence d\'orientation de filière, SG71', label: 'Conférence d\'orientation de filière, SG71', color :'black'}, 
      { value: 'smart lamp, SG41', label: 'smart lamp, SG41' ,color :'black'},
      { value: 'Prototype de barrage, SG71', label: 'Prototype de barrage, SG71' ,color :'black'}, 
      { value: 'Sur l\'environnement, SG61 ', label: 'Sur l\'environnement, SG61 ' ,color :'black'}, 
      { value: 'Magazine universitaire, SG33 ', label: 'Magazine universitaire, SG33 ' ,color :'black'},
      { value: 'Échange intergenerationnelle, SG13', label: 'Échange intergenerationnelle, SG13',color :'black' },
      { value: 'Elaboration d un bouquin(visite d orphelins), SG11', label: 'Elaboration d un bouquin(visite d orphelins), SG11', color :'black'}, 
      { value: 'Ucap, SG53', label: 'Ucap, SG53' ,color :'black'}
    ]
  ];

  const [error, setError] = useState(false);

  const [code ,setCode ]= useState("");

  const [value ,setValue ]= useState("none");

  const [value2 ,setValue2 ]= useState("none");

  const [loading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(0);

  const [selectedOption2, setSelectedOption2] = useState(0);

  const handelChange=(selectedOption)=>{
    setValue(selectedOption.value);
    console.log(selectedOption.value);
  }

  const colorStyles ={
    controle : (styles)=>({...styles}),
    option : (styles, {data, isDisabled, isFocused, isSelected})=>{
      return{...styles,color :data.color}
    }
  }


  const handelSubmit= async(e)=>{
    e.preventDefault();
    if(code === ""){
      setError(true);
    }
    else{
      const vote = {code, value,value2};
      setLoading(true)
      const res = await fetch('/users/api/post',{
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
          msg = "this code has alredy voted"
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
    {title : "category 1",
    des : "description of category 1",
    data:[
      {
        img : img,
        title : "none"
      }
      ,{
        img : img,
        title : "Enquête sur la formation arts et métiers, SG21",
      },
      {
        img : img,
        title : "Conférence d'orientation de filière, SG71 ",
      },
      {
        img : img,
        title : "smart lamp, SG41 ",
      },
      {
        img : img,
        title : "Prototype de barrage, SG71   ",
      },
      {
        img : img,
        title : "Sur l'environnement, SG61 ",
      },
      {
        img : img,
        title : "Magazine universitaire, SG33 ",
      },
      {
        img : img,
        title : "Échange intergenerationnelle, SG13",
      },
      {
        img : img,
        title : "Elaboration d un bouquin(visite d orphelins), SG11",
      },
      {
        img : img,
        title : "Ucap, SG53",
      }

    ]},
    {title : "category 2",
    des : "description of category 2,",
    data:[
      {
        img : img,
        title : "none"
      },
      {
        img : img,
        title : "Échange intergenerationnelle, SG13",
      },
      {
        img : img,
        title : "Elaboration d un bouquin(visite d orphelins), SG11",
      },
      {
        img : img,
        title : "Ucap, SG53",
      }
    ]}
  ]

  const action = (selectedOption)=>{
    setSelectedOption(selectedOption);
    setValue(options[0][selectedOption].value);
  }

  // const action2 = (selectedOption2)=>{
  //   setSelectedOption2(selectedOption2);
  //   setValue2(options[1][selectedOption2].value);
  // }

  return (
    <div className="App">
      <NavBar/>
      <Slides {...props[0]} action={action}/>
      <div className='select-options'>
      <Select options={options[0]} styles = {colorStyles}  inputValue={options[0][selectedOption%options[0].length].value}/>
      </div>
      {/* <Slides {...props[1]}  action={action2}/>
      <div className='select-options'>
      <Select options={options[1]} on onChange={(selectedOption)=>setValue2(selectedOption.value)} styles = {colorStyles}  
          inputValue={options[1][selectedOption2%options[1].length].value}
      />
      </div> */}


      <form className= {error && code.length<=0?"input-error":"input-code"} onSubmit={handelSubmit}>
        <input type="text" placeholder='enter the code here'  value={code} onChange={(e)=>setCode(e.target.value)}/>
        {error && code.length<=0?<label>you must enter the code</label>:""}
        <button type="submit"><h5>submit</h5> </button>
        
      </form>
      
      <ToastContainer />
      {loading &&<Loader/>}
    </div>
  );
}

export default App;

import { useState } from "react";



function Home(){

    let[data,setData] =  useState({});

    let getValue = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setData({...data,[name]:value});
    }
    let submitData =(e)=>{
        e.preventDefault()
        fetch("http://localhost:3000/data",{
            method:"POST",
            body : JSON.stringify(data)
        }).then(()=>{
            alert("data added") 
            setData({})
        })
        .catch(()=>{
            alert("something wrong")
        })
    }

    return(
        <>
            <form method="post" onSubmit={(e)=>submitData(e)}>

                <label>User name :- </label>
                <input type="text" name="userName" value={data.userName?data.userName :""} placeholder="Enter Your User Name" onChange={(e)=>getValue(e)} /><br/><br/>
                <label>User email :- </label>
                <input type="text" name="mail" value={data.mail?data.mail :""} placeholder="Enter Your User Email" onChange={(e)=>getValue(e)} /><br/><br/>
                <label>Password :- </label>
                <input type="text" name="pass" value={data.pass?data.pass:""} placeholder="Enter Your Password" onChange={(e)=>getValue(e)} /><br/><br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Home;
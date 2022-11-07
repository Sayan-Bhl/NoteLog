import React from 'react'

const Alert = (props) => {
  const {alert}=props;
  const capitalize=(word)=>{
    if(word==="denger"){
      word="Error"
    }
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (
    <div style={{height:'50px',position:"absolute"}}>
    {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role='alert'>
    <strong>{capitalize(alert.type)}</strong>:{alert.msg}
    </div>}
    </div>
  )
}

export default Alert

import React from "react";
import "./Login.css";
import Loading from "./Views/Loading";

class Home extends React.Component{
    constructor(props){
        super(props);
        var deviceName = localStorage.getItem("deviceName");
        this.state = {
            name: deviceName ? deviceName : "",
            errorMessage: "",
            message: "",
            connecting: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.getDevice = this.getDevice.bind(this);

    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    getDevice(){
        const that = this;

        if(this.state.name == null || this.state.name === ""){
            this.setState({ errorMessage: "A device ID is required" });
            return;
        }
        var data ={
            name: this.state.name,
        };

        const formBody = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&');
        fetch("/device/get",{
            headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': localStorage.getItem("token")
            },
            method: "POST",
            body: formBody
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(function(res){ 
            if(res.status === 200){
                if (res.body.ip === '' || res.body.ip == null || res.body.ip === false) {
                    this.setState({ errorMessage: "Your device appears to be offline" });
                    return;
                }
                localStorage.setItem("deviceName", that.state.name);
                that.setState({ 
                    message:  "Device found! Connecting..",
                    errorMessage: "",
                    connecting: true
                });
                window.location.replace(`http://${res.body.ip}:5000`)
            }
            else if(res.status === 401 || res.status === 403){
                localStorage.removeItem("token");
            }
            else{
                var errmsg = res.body.error;
                that.setState({ errorMessage:  errmsg});
            }
        })
        .catch(function(res){ console.log(res) })
    }
    
    render(){
        const view = this.state.connecting ? <Loading loadingText={"Connecting to your device..."}></Loading> : 
        <>
            <div className="container" id="form-ouer">
              <div className="container">
                <form id="form" className="form" onSubmit={this.getDevice}>
                    <h2 className="formHeader">Enter your Device ID</h2>
                    <input className="formInput" placeholder="DeviceID" type="text" name="name" id='name' defaultValue={this.state.name} onChange={this.handleChange}/>
  
                    <button type="button" value="Submit" className="formButton" id="button" onClick={this.getDevice}>CONNECT</button>
                    
                    <div className="formError" id="error">{this.state.errorMessage}</div>
                    <div className="formMessage" id="error">{this.state.message}</div>
                     
                    
                </form>
              </div>
              </div>

              
              
              </>;
        return (
            view
          );
    }
}

  
export default Home;
  
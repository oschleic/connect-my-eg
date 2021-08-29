import React from "react";
import "./Login.css";
import { Link } from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: ""
        }
        this.logUserIn = this.logUserIn.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    logUserIn(){
        const that = this;
        var user ={
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        };
        if(user.email === "" || user.email == null){
            this.setState({ errorMessage:  "An email is required!"});
            return;
        }
        else if(user.password === "" || user.password == null){
            this.setState({ errorMessage:  "A password is required!"});
            return;
        }

        const formBody = Object.keys(user).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])).join('&');
        fetch("/login",{
            headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: formBody
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(function(res){ 
            if(res.status === 200){
                that.setState({ 
                    message:  "Logging you in!",
                    errorMessage: "",
                });
                localStorage.setItem("token", res.body.token)
                
                window.location.href = "/"; 
                
            }
            else{
                var errmsg = res.body.error;
                that.setState({ errorMessage:  errmsg});
            }
        })
        .catch(function(res){ console.log(res) });     
    }
    
    render(){
        return (
            <>
                <div className="container" id="form-ouer">
              <div className="container">
                <form id="form" className="form" onSubmit={this.logUserIn}>
                    <h2 className="formHeader">Log in</h2>
                    <input className="formInput" placeholder="Email" type="text" name="email" id='name' defaultValue={this.state.email} onChange={this.handleChange}/>
                    <input className="formInput" placeholder="Password" type="password" name="password" id='password' defaultValue={this.state.password} onChange={this.handleChange}/>
  
                    <button type="button" value="Submit" className="formButton" id="button" onClick={this.logUserIn}>LOGIN</button>
                    
                    <label className="outerLabel" for="button">Don't have an account? <Link to="/signup" >Sign up!</Link> </label>
                    <div className="formError" id="error">{this.state.errorMessage}</div>
                    <div className="formMessage" id="error">{this.state.message}</div>
                     
                    
                </form>
              </div>
              </div>

              
              </>
          );
    }
}

  
export default Login;
  
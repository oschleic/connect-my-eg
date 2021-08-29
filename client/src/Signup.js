import React from "react";
import "./Login.css";
import { Link } from 'react-router-dom';


class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            message: ""
        }

        this.signUserUp = this.signUserUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password){
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        return re.test(password);
    }

    signUserUp(){
        const that = this;
        var user ={
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        };

        if(!this.validateEmail(user.email)){
            this.setState({ errorMessage:  "A valid email is required!"});
            return;
        }
        else if(!this.validatePassword(user.password)){
            this.setState({ errorMessage:  "Your password must contain a at least eight characters, including one letter, one number, and one special character"});
            return;
        }

        const formBody = Object.keys(user).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(user[key])).join('&');
        fetch("/signup",{
            headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: formBody
        })
        .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(function(res){ 
            if(res.status === 201){
                that.setState({ 
                    message:  "New account successfully registered!",
                    errorMessage: "",
                });
                
                setTimeout(function () {
                    window.location.href = "/login"; 
                 }, 2000);
            }
            else{
                var errmsg = res.body.error;
                that.setState({ errorMessage:  errmsg});
            }
        })
        .catch(function(res){ console.log(res) })

        
        
    }
    
    render(){
        return (
            <>
                <div className="container" id="form-ouer">
              <div className="container">
                <form id="form" className="form" onSubmit={this.signUserUp}>
                    <h2 className="formHeader">Register</h2>
                    <input className="formInput" placeholder="Email" type="text" name="email" id='name' defaultValue={this.state.email} onChange={this.handleChange}/>
                    <input className="formInput" placeholder="Password" type="password" name="password" id='password' defaultValue={this.state.password} onChange={this.handleChange}/>
  
                    <button type="button" value="Submit" className="formButton" id="button" onClick={this.signUserUp}>SIGN UP</button>
                    
                    <label className="outerLabel" for="button">Already have an account? <Link to="/login" >Log in!</Link> </label>
                    <div className="formError" id="error">{this.state.errorMessage}</div>
                    <div className="formMessage" id="error">{this.state.message}</div>
                     
                    
                </form>
              </div>
              </div>

              
              </>
          );
    }
}

  
export default Signup;
  
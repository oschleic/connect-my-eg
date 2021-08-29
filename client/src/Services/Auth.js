/* TODO implement
function checkIsAuthenticated(){
    const that = this;

    if(localStorage.getItem("token") === null){
        return false;
    }
    var data ={
        name: this.state.name,
    };

    fetch("/auth",{
        headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'authorization': localStorage.getItem("token")
        },
        method: "GET",
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(function(res){ 
        if(res.status === 200){
            if (res.body.ip === '' || res.body.ip == undefined || res.body.ip == false) {
                this.setState({ errorMessage: "Your device appears to be offline" });
                return;
            }
            that.setState({ 
                message:  "Device found! Connecting..",
                errorMessage: "",
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

function authSignUp(){

}

function authLogin(){

}

function authLogout(){
    localStorage.removeItem("token");
}

*/
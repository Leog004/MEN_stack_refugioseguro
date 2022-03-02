
function check(){
    
    var a = document.getElementById("firstName").value;
    var b = document.getElementById("comments").value;
    var bool = false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email").value;
    
    if(!a){
     document.getElementById("firstName").style.border = "2px solid red"; 
     document.getElementById("firstName").placeholder = "must fill information";
     
            if(!re.test(email)){
        
               document.getElementById("email").style.border = "2px solid red";
               document.getElementById("email").placeholder = "Cannot leave this blank or must be a valid email";
         }
    }else if(!b){
        
        document.getElementById("comments").style.border = "2px solid red"; 
        document.getElementById("comments").placeholder = "must fill information";
        
    }
    else{ bool = true; }

    if(bool){
            if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(b)) {
        alert("You cannot submit this message since it contains a URL, YOUR IP ADDRESS ADDED INTO DATABASE");
             }else{
            document.formsubmit.submit();
        }
    }

}

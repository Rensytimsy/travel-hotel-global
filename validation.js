const userPassword = document.getElementById("userPasswordOne");
const userPasswordTwo = document.getElementById("userpassword");

function validateFields(){
    if (userPassword === "" && userPasswordTwo === ""){
        alert("Please fill in email fields");
        console.log("fields empty")
    }
}

alert("Running")
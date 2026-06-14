const officials = [

{
    email: "garbage@admin.com",
    password: "garbage123",
    department: "Sanitation Department"
},

{
    email: "electricity@admin.com",
    password: "electric123",
    department: "Electricity Department"
},

{
    email: "water@admin.com",
    password: "water123",
    department: "Water Supply Department"
},

{
    email: "road@admin.com",
    password: "road123",
    department: "Road Maintenance Department"
},
{
    email: "streetlight@admin.com",
    password: "streetlight123",
    department: "Street Light Department"   
},
{
    email: "encroachment@admin.com",
    password: "encroachment123",
    department: "Encroachment Control Department"
}

];

function loginOfficial(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const official =
    officials.find(o =>
        o.email === email &&
        o.password === password
    );

    if(official){

        localStorage.setItem(
            "department",
            official.department
        );

        window.location.href =
        "admin.html";

    }
    else{

        alert("Invalid Credentials");

    }

}

window.loginOfficial =
loginOfficial;
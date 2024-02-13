
function DashNav(authority,navigate){


  
    switch(authority){
        case "ROLE_ADMIN":
          navigate("/admins/dashboard");
          break;
        case "ROLE_MANAGER":
          navigate("/managers/dashboard");
          break;
        case "ROLE_EMPLOYEE":
          navigate("/employees/dashboard");
          break;
      }

}

export default DashNav;
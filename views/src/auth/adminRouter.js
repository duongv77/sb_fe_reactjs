import { Redirect, Route } from "react-router";

const AdminRoute = ({children}) => {
    const checkAdmin = () => {
        let check = false;
        const Account = JSON.parse(localStorage.getItem("AccountToken"))
        if(Account===null || Account.roleAccount===null ) return false
        const {roleAccount} = Account
        roleAccount.map((value) => {
            if(value.role.name === "ADMIN" ) check = true
        })
        return check
    }

    return(
        <Route 
            render = {() => {
                return checkAdmin() ? 
                    (children)
                 : (
                    <Redirect to={{ pathname: "/"}}/>
                );
            }}
        />
    )
}
export default AdminRoute;
import AdminNav from "../components/admin/adminNav";
import AdminMainNav from "../components/admin/adminMainNav";
const AdminLayout  = (props) => {
    return(
        <>
            <div id="container" className="effect mainnav-lg">
                <AdminNav />
                <div className="boxed " style={{minHeight:"1000px"}}>
                    <div id="content-container" className="bg-light">
                        <main >
                            {props.children}
                        </main>
                    </div>
                </div>
                <AdminMainNav />
                
            </div>
        </>
    )
}

export default AdminLayout;
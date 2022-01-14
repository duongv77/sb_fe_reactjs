import Nav from '../components/website/nav'
import Footer from '../components/website/footer';
const WebsiteLayout = (props) => {
    return (
        <>
            <div>
                <Nav />
                <main>
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default WebsiteLayout;
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import WebsiteLayout from "./layout/websiteLayout";
import AdminLayout from "./layout/adminLayout";
import LoginLayOut from "./layout/loginLayout";
import AdminRoute from "./auth/adminRouter";
import AdminHome from "./page/admin/logic/adminHomeLogic";
import AdminOrder from "./page/admin/logic/order/adminOrderNewLogic";
import AdminOrderAll from "./page/admin/logic/order/adminOrderAllLogic";
import AdminOrderConfirm from "./page/admin/logic/order/adminOrderComfirmLogic";
import AdminOrderTransfer from "./page/admin/logic/order/adminOrderTransferLogic";
import AdminOrderInProgressTransfer from "./page/admin/logic/order/adminOrderInProgressTransferLogic";
import AdminOrderCancel from "./page/admin/logic/order/adminOrderCancelLogic";
import AdminAuthor from "./page/admin/logic/product/adminAuthorLogic";
import AdminPromotion from "./page/admin/logic/promotion/adminPromotionLogic";
import AdminPromotionEdit from "./page/admin/logic/promotion/adminPromotionEditLogic";
import AdminProduct from "./page/admin/logic/product/adminProductLogic";
import AdminCategory from "./page/admin/logic/product/adminCategoryLogic";
import AdminCategoryEdit from "./page/admin/logic/product/adminCategoryEditLogic";
import AdminProductCreate from "./page/admin/logic/product/adminProductCreateLogic";
import AdminCategoryDetailEdit from "./page/admin/logic/product/adminCategoryDetailEditLogic";
import AdminLogin from "./auth/login/logic/adminLoginLogic";
import AdminAccount from "./page/admin/logic/account/adminAccountLogic";
import RateProduct from "./page/admin/logic/statistic/rateProductLogic";
import FavoriteProduct from "./page/admin/logic/statistic/favoriteProductLogic";
import AdminLoginChangePw from "./auth/login/logic/adminLoginChangePwLogic";
import AdminLoginCreateAccount from "./auth/login/logic/adminLoginCreateAccountLogic";
import RestartPassword from "./auth/login/logic/restartPasswordLogic";
import Home from "./page/website/logic/homeLogic";
import Product from "./page/website/logic/productLogic"
import ProductDetail from "./page/website/logic/productDetailLogic";
import Cart from "./page/website/logic/cartLogic";
import AdminCreateOrder from "./page/admin/logic/order/adminCreateOrderLogic";
import ProductReportLogic from "./page/admin/logic/report/productReportLogic";
import SalesProductLogic from "./page/admin/logic/sales/salesProductLogic";
import AdminVoucher from "./page/admin/logic/promotion/voucher/adminVoucherLogic";
import InformationAdmin from "./page/admin/logic/informationAdminLogic";
import LoginLogic from "./page/website/logic/loginLogic";
import ProfileLayout from "./layout/profileLayout";

function Routers({ setLoading }) {
    return (
        <Router>
            <Switch>
                <AdminRoute exact path="/admin/:path?/:path?/:path?/:path?/:path?">
                    <AdminLayout>
                        <Switch>
                            <Route exact path="/admin/">
                                <AdminHome setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order">
                                <AdminOrderAll setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/new">
                                <AdminOrder setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/confirm">
                                <AdminOrderConfirm setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/transfer">
                                <AdminOrderTransfer setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/transfer/inprogress">
                                <AdminOrderInProgressTransfer setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/cancel">
                                <AdminOrderCancel setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product">
                                <AdminProduct setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product/category">
                                <AdminCategory setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product/category/:id">
                                <AdminCategoryEdit setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product/category_detail/:id">
                                <AdminCategoryDetailEdit setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product/author">
                                <AdminAuthor setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/product/create">
                                <AdminProductCreate setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/promotion">
                                <AdminPromotion setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/promotion/:id">
                                <AdminPromotionEdit setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/account">
                                <AdminAccount setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/statistic/product_rate">
                                <RateProduct setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/statistic/favorite_product">
                                <FavoriteProduct setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/order/create">
                                <AdminCreateOrder setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/report/product">
                                <ProductReportLogic setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/sales/product">
                                <SalesProductLogic setLoading={setLoading} />
                            </Route>
                            <Route exact path="/admin/voucher">
                                <AdminVoucher setLoading={setLoading} />
                            </Route>

                            <Route exact path="/admin/information">
                                <InformationAdmin setLoading={setLoading} />
                            </Route>

                        </Switch>
                    </AdminLayout>
                </AdminRoute>
                <Route exact path="/login/:path?/:path?/:path?/:path?/:path?/:path?">
                    <LoginLayOut >
                        <Switch>
                            <Route exact path="/login/admin">
                                <AdminLogin setLoading={setLoading} />
                            </Route>
                            <Route exact path="/login/admin/forgot_password">
                                <AdminLoginChangePw setLoading={setLoading} />
                            </Route>
                            <Route exact path="/login/admin/create_account">
                                <AdminLoginCreateAccount setLoading={setLoading} />
                            </Route>
                            <Route exact path="/login/restart/password/:id/:key">
                                <RestartPassword setLoading={setLoading} />
                            </Route>
                            <Route exact path="/login">
                                <LoginLogic setLoading={setLoading} />
                            </Route>
                        </Switch>
                    </LoginLayOut>
                </Route>
                <Route>
                    <WebsiteLayout>
                        <Switch>
                            <Route exact path="/profile">
                                <ProfileLayout setLoading={setLoading} />
                            </Route>
                            <Route exact path="/">
                                <Home setLoading={setLoading} />
                            </Route>
                            <Route exact path="/product">
                                <Product setLoading={setLoading} />
                            </Route>
                            <Route exact path="/product/:id">
                                <ProductDetail setLoading={setLoading} />
                            </Route>
                            <Route exact path="/cart">
                                <Cart setLoading={setLoading} />
                            </Route>
                        </Switch>
                    </WebsiteLayout>
                </Route>
            </Switch>``
        </Router>
    )
}

export default Routers;
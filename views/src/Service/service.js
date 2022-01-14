import API from "../api/api";

export let quantityCart = 0
export let promotionValue = [];
export let productValue = [];
export let authorValue = []
export let orderComFirmValue = [];
export let orderInProgressTransferValue = []
export let orderNewValue = [];
export let orderCancelValue = [];
export let orderFinalValue = [];
export let accountValue = []
export let categoryValue = [];

export const setQuantityCart = () => {

}
export const setAccountValue=(value)=>{
    accountValue = value
}
export const setOrderFinalValue=(value)=>{
    orderFinalValue = value
}
export const setOrderNewValue=(value)=>{
    orderNewValue = value
}
export const setOrderCancelValue=(value)=>{
    orderCancelValue = value
}
export const setPromotionValue=(value)=>{
    promotionValue =value
}
export const setOrderConfirmValue = (value) => {
    orderComFirmValue = value
}
export const setProductValue = (value) =>{
    productValue = value
}   
export const setAuthorValue = (value) => {
    authorValue = value
}
export const setOrderInProgressTransferValue = (value) => {
    orderInProgressTransferValue = value
}

export const setCategoryValue = (value) =>{
    categoryValue = value
}
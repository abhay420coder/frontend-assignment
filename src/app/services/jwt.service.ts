// import { Injectable } from '@angular/core';


// @Injectable({
//   providedIn: 'root'
// })
// export class JwtService {
//   resetTokenUserDetails: any;
//   getToken(): String {
//     return window.localStorage['jwtToken'];
//   }

//   saveToken(token: String) {
//     window.localStorage['jwtToken'] = token;
//   }

//   destroyToken() {
//     window.localStorage.removeItem('jwtToken');
//   }

//   saveUccId(uccId: string) {
//     window.localStorage['uccId'] = uccId;
//   }

//   getUccId() {
//     return window.localStorage['uccId'];
//   }

//   saveCcId(ccId: string) {
//     window.localStorage['ccId'] = ccId;
//   }

//   getCcId() {
//     return window.localStorage['ccId'];
//   }

//   destroyCcId() {
//     window.localStorage.removeItem('ccId');
//   }

//   saveTcId(tcId: string) {
//     window.localStorage['tcId'] = tcId;
//   }

//   getTcId() {
//     return window.localStorage['tcId'];
//   }

//   destroyTcId() {
//     window.localStorage.removeItem('tcId');
//   }

//   saveTransactionStyleId(id: string) {
//     window.localStorage['transactionStyleId'] = id;
//   }

//   getTransactionStyleId() {
//     return window.localStorage['transactionStyleId'];
//   }

//   destroyTransactionStyleId() {
//     window.localStorage.removeItem('transactionStyleId');
//   }

//   saveFrontEntityId(id: string) {
//     window.localStorage["frontEntityId"] = id;
//   }

//   getFrontEntityId() {
//     return window.localStorage["frontEntityId"];
//   }

//   destroyFrontEntityId() {
//     window.localStorage.removeItem('frontEntityId');
//   }

//   saveCreatedByBusinessId(id: string) {
//     window.localStorage["createdByBusinessId"] = id;
//   }

//   getCreatedByBusinessId() {
//     return window.localStorage["createdByBusinessId"];
//   }

//   destroyCreatedByBusinessId() {
//     window.localStorage.removeItem('createdByBusinessId');
//   }
  
//   saveStartTcPayload(value: {}) {
//     let encoded = btoa(encodeURIComponent(JSON.stringify(value)))
//     window.localStorage.setItem('placeOrderPayload', encoded);
//   }

//   getStartTcPayload() {
//     let payload = window.localStorage.getItem('placeOrderPayload')
//     if (!payload) {
//       return undefined;
//     }
//     try{
//       let decoded = decodeURIComponent(atob(payload))
//       return JSON.parse(decoded);
//     } catch(e){
//       console.log(e);
//     }
//   }

//   destroyStartTcPayload() {
//     window.localStorage.removeItem('placeOrderPayload');
//   }

//   saveSelectedAddress(address: any) {
//     let encoded = btoa(encodeURIComponent(JSON.stringify(address)))
//     window.localStorage.setItem('selectedAddress', encoded);
//   }

//   getSelectedAddress() {
//     let address = window.localStorage.getItem('selectedAddress')
//     if (!address) {
//       return undefined;
//     }
//     let decoded = decodeURIComponent(atob(address))
//     return JSON.parse(decoded);
//   }

//   destroySelectedAddress() {
//     window.localStorage.removeItem('selectedAddress');
//   }

//   saveCartData(data: any){
//     window.localStorage.setItem("cartData", JSON.stringify(data));
//   }

//   getCartData(){
//     return JSON.parse(window.localStorage.getItem("cartData")!);
//   }

//   destroyCartData(){
//     window.localStorage.removeItem("cartData");
//   }

//   saveSelectedLanguage(lang: any){
//     let encoded = btoa(encodeURIComponent(JSON.stringify(lang)))
//     window.localStorage.setItem("selectedLangI18n", encoded);
//   }

//   getSelectedLanguage(){
//     const lang = window.localStorage.getItem("selectedLangI18n");
//     if(!lang){
//       return undefined;
//     }
//     try{
//       let decoded = decodeURIComponent(atob(lang));
//       return JSON.parse(decoded);
//     } catch {
//       return undefined;
//     }
//   }

//   saveUserSelectedAddressId(addressId: number){
//     window.localStorage.setItem("userSelectedAddressId", addressId.toString());
//   }

//   getUserSelectedAddressId(){
//     return parseInt(window.localStorage.getItem("userSelectedAddressId")||"");
//   }

//   removeUserSelectedAddressId(){
//     window.localStorage.removeItem("userSelectedAddressId");
//   }
// }

import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { globalUrls, userUrls } from '../urls';
import { ApiService } from './api.service';
import { addOnDisplayConfig, clProductDisplay } from "../product-display-config";
import { JwtService } from './jwt.service';
import { DateTimeService } from './date-time.service';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VCAGoogleAddress } from '../utils/interface-and-classes/vca-google-address-class';
import { TranslationService } from './translation.service';
import { MAX_BILL_FOR_SHIPPING_COST, PRICE_MAX_DECIMAL_PLACES, SHIPPING_COST, TAX_PERCENT } from 'web-constants';
import { environment } from 'src/environments/environment';
import { CustomLine } from '../models/customLine.model';


/**
 * TODO: 
 * Unsubscribe all after ngOnDestroy()  */

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit {
  cartObs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartProductDataObs: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  clDisplayConfig = clProductDisplay;
  addonDisplayConfig = addOnDisplayConfig;
  vatPercent = TAX_PERCENT;
  billingAddress: {
    address: VCAGoogleAddress,
    phone: any,
    email: any
  };
  shippingAddress: {
    address: VCAGoogleAddress,
    phone: any,
    email: any
  };
  sub?: Subscription;
  translationVar: any;
  isArabic: any;

  constructor(
    private api: ApiService,
    private jwtService: JwtService,
    private dateTime: DateTimeService,
    private user: CurrentUserService,
    private toastr: ToastrService,
    private router: Router,
    private cus: CurrentUserService,
    private translation: TranslationService
  ) {
    let addressInitializer: any = {};
    addressInitializer["address"] = new VCAGoogleAddress();
    addressInitializer["phone"] = {};
    addressInitializer["email"] = {};
    this.billingAddress = addressInitializer;
    //  TO avoid shipping and billing have same pointer
    this.shippingAddress = JSON.parse(JSON.stringify(addressInitializer));
    this.translation.selectedLanguage.subscribe(data => {
      this.isArabic = this.translation.isRtl;
      this.translationVar = this.translation.translationVar.cartService;
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /*  this.translation.selectedLanguage.subscribe(data => {
       this.translationVar = this.translation.translationVar.cartService;
     }) */
  }

  addToCart(newData: { productData: CustomLine, count: number, specList?: any[] }[]) {
    console.log(newData);
    
    let dataToUpload: any[] = [];
    newData?.map((newProduct: any) => {
      let specs = "";
      newProduct?.specList?.map((d: any, i: number) => {
        specs += d["spec.customLineVariable"];
        specs += newProduct?.specList.length - 1 !== i ? "," : "";
      });
      let cartItemObj: any = {
        productId: newProduct?.productData.id,
        count: newProduct?.count,
        lastModified: this.dateTime.getCurrentTimestamp(true),
        specVariables: specs
      };
      cartItemObj[this.clDisplayConfig.savedPrice] = newProduct?.productData.price.new;
      cartItemObj[this.addonDisplayConfig.isAddon] = newProduct?.productData[this.addonDisplayConfig.isAddon] ? newProduct?.productData[this.addonDisplayConfig.isAddon] : undefined;
      cartItemObj[this.addonDisplayConfig.parent] = newProduct?.productData[this.addonDisplayConfig.parent] ? newProduct?.productData[this.addonDisplayConfig.parent] : undefined;
      cartItemObj[this.addonDisplayConfig.isMandatory] = newProduct?.productData[this.addonDisplayConfig.isMandatory] ? newProduct?.productData[this.addonDisplayConfig.isMandatory] : undefined;
      //get current cart items
      var cartVal = this.cartObs.value;
      // check if item is already in cart
      const existingCartItem: any = cartVal.filter(d =>
        d.productId === newProduct?.productData.id &&
        (d[addOnDisplayConfig.isAddon] ?
          d[addOnDisplayConfig.parent] === newProduct?.productData[addOnDisplayConfig.parent] : true)
      );
      if (existingCartItem.length > 0) {
        // item already exists update the count
        if (newProduct?.count > 0) {
          const updatedCartVal = cartVal.map(d => {
            if (d.productId === newProduct?.productData.id &&
              (d[addOnDisplayConfig.isAddon] ?
                d[addOnDisplayConfig.parent] === newProduct?.productData[addOnDisplayConfig.parent] : true)) {
              d.count += newProduct?.count;
              // this.uploadCartData({ ...d, "active": true, "specVariables": specs });
              dataToUpload.push({ ...d, "active": true, "specVariables": specs })
            }
            return d;
          })
          this.cartObs.next(updatedCartVal);
        } else {
          // this.deleteCartItem(productData[this.clDisplayConfig.productId]);
          // item is getting deleted
          // send active false to api
          dataToUpload.push({ ...cartItemObj, "active": false, "specVariables": specs });
          // remove item from cart data
          const updatedCartVal = cartVal.filter(d => {
            if (d.productId !== newProduct?.productData?.id &&
              (newProduct?.productData[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] !== newProduct?.productData[this.addonDisplayConfig.parent] : true)) {
              return d;
            }
          });
          this.cartObs.next(updatedCartVal);
        }
      } else {
        if (newProduct?.count <= 0) return;
        cartVal.push(cartItemObj);
        // this.uploadCartData({ ...cartItemObj, "active": true });
        dataToUpload.push({ ...cartItemObj, "active": true });
        this.cartObs.next(cartVal);
      }
    })


    // sending changes to batch upload api
    this.uploadCartDataBatch(dataToUpload);


    this.saveCartData();
    this.populateCartProducts();
  }

  updateCartData(product: any, count: number) {
    if (count <= 0) {
      this.deleteCartItem(product);
      return;
    }
    const cartVal = this.cartObs.value;
    
    // items to be sent to server
    let updatedCartItems: any[] = [];
    
    let updatedCartVal = cartVal.map(d => {
      if (d.productId === product[this.clDisplayConfig.productId] &&
        (product[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === product[this.addonDisplayConfig.parent] : true)
      ) {
        d.count = count;
        updatedCartItems.push({ ...d, "active": true });
        d.lastModified = this.dateTime.getCurrentTimestamp(true)
      }
      return d;
    });

    // update mandatory addon count
    updatedCartVal = updatedCartVal.map(d=>{
      if(
        d[this.addonDisplayConfig.isAddon] && 
        d[this.addonDisplayConfig.isMandatory] && 
        d[this.addonDisplayConfig.parent] === product[this.clDisplayConfig.productId]){
          // mandatory addon, its count should be updated too
          d.count = count;
          updatedCartItems.push({...d, "count": count, "active": true})
      }
      return d;
    })
    
    this.cartObs.next(updatedCartVal);
    this.uploadCartDataBatch(updatedCartItems);

    let updatedCartProductVal = this.cartProductDataObs.value.map(d => {
      if (d[this.clDisplayConfig.productId] === product[this.clDisplayConfig.productId] &&
        (product[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === product[this.addonDisplayConfig.parent] : true)
      ) {
        d.count = count;
      }
      return d;
    })

    updatedCartProductVal = updatedCartProductVal.map(d=>{
      if(
        d[this.addonDisplayConfig.isAddon] && 
        d[this.addonDisplayConfig.isMandatory] && 
        d[this.addonDisplayConfig.parent] === product[this.clDisplayConfig.productId]
      ) {
        d.count = count;
      }
      return d;
    })
    
    this.cartProductDataObs.next(updatedCartProductVal);
    this.saveCartData();
  }

  deleteCartItem(product: any) {
    var cartVal = this.cartObs.value;
    var updatedCartVal = cartVal.filter(d => {
      if (d.productId === product[this.clDisplayConfig.productId] &&
        (product[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === product[this.addonDisplayConfig.parent] : true)
      ) {
        //delete product
        d["active"] = false;
        this.uploadCartData(d);
      } else {
        return d;
      }
    });
    this.cartObs.next(updatedCartVal);
    const updatedCartProductVal = this.cartProductDataObs.value.filter(d => {
      if (d[this.clDisplayConfig.productId] === product[this.clDisplayConfig.productId] &&
        (product[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === product[this.addonDisplayConfig.parent] : true)) {
        // this item has to be deleted 
        // nothing to do
      } else {
        return d
      }
    })
    this.cartProductDataObs.next(updatedCartProductVal);
    this.saveCartData();
  }

  deleteCartItemBatch(items: any[]) {
    if (items.length === 0) return;
    var cartVal = this.cartObs.value;
    var cartProductVal = this.cartProductDataObs.value;
    let productsToDelete: any[] = []
    items.map((item: any) => {
      cartVal = cartVal.filter(d => {
        if (d.productId === item[this.clDisplayConfig.productId] &&
          (item[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === item[this.addonDisplayConfig.parent] : true)
        ) {
          //delete product
          d["active"] = false;
          // this.uploadCartData(d);
          productsToDelete.push(d);
        } else {
          return d;
        }
      });


      cartProductVal = cartProductVal.filter(d => {
        if (d[this.clDisplayConfig.productId] === item[this.clDisplayConfig.productId] &&
          (item[this.addonDisplayConfig.isAddon] ? d[this.addonDisplayConfig.parent] === item[this.addonDisplayConfig.parent] : true)) {
          // this item has to be deleted 
          // nothing to do
        } else {
          return d
        }
      })
    })
    this.cartObs.next(cartVal);
    this.cartProductDataObs.next(cartProductVal);
    this.saveCartData();
    this.uploadCartDataBatch(productsToDelete);
  }

  getCartData() {
    return this.cartObs.value;
  }

  getProductCount(productId: string) {
    const cartVal = this.cartObs.value;
    const targetProduct = cartVal.filter(d => d.productId === productId);
    if (targetProduct && targetProduct.length) {
      return targetProduct[0].count;
    }
    return 0;
  }

  saveCartData() {
    this.jwtService.saveCartData(this.cartObs.value);
  }

  // fetchCartData(){
  //   const cartData = window.localStorage.getItem("cartData");
  //   if(cartData){
  //     this.cartObs.next(JSON.parse(cartData));
  //     this.populateCartProducts();
  //   }
  // }

  populateCartProducts() {
    if (!this.sub?.closed) {
      this.sub?.unsubscribe();
    }
    if (this.cartObs.value.length === 0) {
      this.cartLoading.next(false);
      return;
    }
    const clIds = this.cartObs.value.map(d => d.productId);
    this.sub = this.api.postData(globalUrls.customLineList, {
      "pageNumber": 1,
      "pageSize": 20,
      "searchKey": "",
      "baseTableIds": [...clIds]
    }).subscribe({
      next: (data: any) => {
        if (data && data.payload && data.payload.list) {
          const productsData = data.payload.list.map((d: any) => {
            let webDescObj: any = {};
            d[this.clDisplayConfig.webDescription].map((d: any) => {
              webDescObj[d.variableName] = {
                displayName: d.displayName,
                dataType: d.dataType,
                value: d.value
              }
            });
            d[this.clDisplayConfig.webDescriptionObj] = webDescObj;
            return d;
          })
          let cartProducts: any[] = [];

          this.cartObs.value.map((d: any, i: number) => {
            const cartItem: any = productsData.filter((dt: any) =>
              dt[this.clDisplayConfig.productId] === d.productId)[0];
            if (cartItem) {
              // inject item count from cart
              cartItem[this.clDisplayConfig.quantity] = d[this.clDisplayConfig.quantity];
              // inject addon data
              cartItem[addOnDisplayConfig.isAddon] = d[addOnDisplayConfig.isAddon];
              cartItem[addOnDisplayConfig.parent] = d[addOnDisplayConfig.parent];
              cartItem[addOnDisplayConfig.isMandatory] = d[addOnDisplayConfig.isMandatory];
              // inject saved price and check for change in price
              cartItem[this.clDisplayConfig.priceChanged] = d[this.clDisplayConfig.savedPrice] &&
                cartItem[this.clDisplayConfig.webDescriptionObj]?.[this.clDisplayConfig.price.new]?.value[0] &&
                (parseInt(d[this.clDisplayConfig.savedPrice]) !== parseInt(cartItem[this.clDisplayConfig.webDescriptionObj]?.[this.clDisplayConfig.price.new]?.value[0]));
              cartItem[this.clDisplayConfig.savedPrice] = d[this.clDisplayConfig.savedPrice];
              cartItem[this.clDisplayConfig.specVariables] = d[this.clDisplayConfig.specVariables] ?
                d[this.clDisplayConfig.specVariables].split(",") : [];
              cartProducts.push({ ...cartItem });
            }
          })
          this.cartProductDataObs.next([...cartProducts]);
        }
        this.cartLoading.next(false);
      },
      error: err => {
        this.cartLoading.next(false);
        this.toastr.error(this.translationVar.cartSyncErrMsg, this.translationVar.error);
      }
    })
  }

  setBillingAddress(addressObj: any) {
    let address = new VCAGoogleAddress();
    address.id = addressObj.address.frontAddressEntityId;
    address.addressLine1 = addressObj.address.addressLine1;
    address.addressLine2 = addressObj.address.addressLine2;
    address.addressLine3 = addressObj.address.addressLine3;
    address.city = addressObj.address.city;
    address.state = addressObj.address.state;
    address.country = addressObj.address.country;
    address.zip = addressObj.address.zip;
    address.latitude = addressObj.address.latitude;
    address.longitude = addressObj.address.longitude;
    this.billingAddress.address = address;
    this.billingAddress.phone = addressObj.phone;
    this.billingAddress.email = addressObj.email
  }

  setShippingAddress(addressObj: any) {
    let address = new VCAGoogleAddress();
    address.id = addressObj.address.frontAddressEntityId;
    address.addressLine1 = addressObj.address.addressLine1;
    address.addressLine2 = addressObj.address.addressLine2;
    address.addressLine3 = addressObj.address.addressLine3;
    address.city = addressObj.address.city;
    address.state = addressObj.address.state;
    address.country = addressObj.address.country;
    address.zip = addressObj.address.zip;
    address.latitude = addressObj.address.latitude;
    address.longitude = addressObj.address.longitude;
    this.shippingAddress.address = address;
    this.shippingAddress.phone = addressObj.phone;
    this.shippingAddress.email = addressObj.email;
  }

  async syncCartData() {
    let currentCartData: any[] = [];
    let cartDataFromApi: any[] = [];
    let cartDataToUpload: any[] = [];
    this.cartLoading.next(true);

    const cartData = this.jwtService.getCartData();
    if (cartData) {
      currentCartData = cartData;
    }

    if (!this.jwtService.getCcId()) {
      // ccId not present so user is not logged in
      this.cartObs.next(currentCartData);
      this.populateCartProducts();
      this.cartLoading.next(false);
      this.cus.userDetailLoading.next(false);
      return;
    }
    // this.toastr.info("We are syncing your cart data", "Attention");

    const cartCount = await this.fetchCartCount();

    // previous tcId present in local but it is coming null from api, hence user has already placed order
    // on other device
    if (cartCount && cartCount.payload && cartCount.payload.tcId === null && this.jwtService.getTcId()) {
      this.jwtService.destroyTcId();
      this.jwtService.destroyCartData();
      this.cartObs.next([]);
      this.cartLoading.next(false);
      return;
    }

    // if ccId is present try getting tcId
    if (!this.jwtService.getTcId()) {
      // no tcId present, this might be first login ever or after pacing an order
      // upload all the present local cart data
      cartDataToUpload = currentCartData.map((d: any) => {
        d["active"] = true;
        return d;
      });
      if (cartDataToUpload.length) {
        //map it and call add-cart api
        this.uploadCartDataBatch(cartDataToUpload);
      }
      this.cartLoading.next(false);
    } else {
      // tcId is present, push and pull cart data
      this.api.postData(userUrls.fetchCartData, {
        // "ccId": parseInt(this.jwtService.getCcId()),
        "tcId": parseInt(this.jwtService.getTcId())
      }).subscribe({
        next: (data: any) => {
          if (data && data.payload && data.payload.modelData) {
            this.jwtService.saveTransactionStyleId(data.payload.modelData["self.transactionalStyleId"]);
            cartDataFromApi = data.payload.modelData["aiActionForm.itemList"]
            let additionalCartDataFromApi: any[] = []
            cartDataFromApi.map((d: any) => {
              //item from api is not present in local then add it to local
              let dataIndex = -1;
              if (currentCartData.filter((cd, i) => {
                if (cd.productId === d["aiActionForm.itemList.customLineId"]) {
                  dataIndex = i;
                  return cd;
                }
              }).length === 0) {
                additionalCartDataFromApi.push({
                  "productId": d["aiActionForm.itemList.customLineId"],
                  "count": d["aiActionForm.itemList.quantity"],
                  "savedPrice": d["aiActionForm.itemList.savedPrice"],
                  "lastModified": d["aiActionForm.itemList.lastModified"],
                  "specVariables": d["aiActionForm.itemList.specVariable"],
                  "isRelated": d["aiActionForm.itemList.isRelated"],
                  "parentCustomLineId": d["aiActionForm.itemList.parentCustomLineId"],
                  "baseSupporting": d["aiActionForm.itemList.baseSupporting"]
                })
              } else {
                // item from api is present in local then check timestamp
                if (this.dateTime.isBefore(currentCartData[dataIndex].lastModified, d["aiActionForm.itemList.lastModified"])) {
                  // local cart data is old remove it and copy new data from api   
                  currentCartData = currentCartData.filter((d, i) => i !== dataIndex);
                  additionalCartDataFromApi.push({
                    "productId": d["aiActionForm.itemList.customLineId"],
                    "count": d["aiActionForm.itemList.quantity"],
                    "savedPrice": d["aiActionForm.itemList.savedPrice"],
                    "lastModified": d["aiActionForm.itemList.lastModified"],
                    "specVariables": d["aiActionForm.itemList.specVariable"],
                    "isRelated": d["aiActionForm.itemList.isRelated"],
                    "parentCustomLineId": d["aiActionForm.itemList.parentCustomLineId"],
                    "baseSupporting": d["aiActionForm.itemList.baseSupporting"]
                  })
                }
              }
            })
            // calculate cart data to upload
            currentCartData.map(d => {
              if (cartDataFromApi.filter(dx => parseInt(dx["aiActionForm.itemList.customLineId"]) === parseInt(d.productId)).length === 0) {
                cartDataToUpload.push({ ...d, active: true });
              }
            })

            // call batch upload api
            if (cartDataToUpload.length) {
              this.uploadCartDataBatch(cartDataToUpload);
            }

            // update localstorage populate observables and return 
            this.cartObs.next([...currentCartData, ...additionalCartDataFromApi]);
            this.saveCartData();
            this.populateCartProducts();
          } else {
            this.toastr.error(this.translationVar.cartSyncErrMsg, this.translationVar.error);
          }
        },
        error: err => {
          this.toastr.error(this.translationVar.cartSyncErrMsg, this.translationVar.error);
          this.cartLoading.next(false);
        }
      })
    }
  }

  fetchCartCount() {
    if (!this.jwtService.getCcId()) {
      this.cus.userDetailLoading.next(false);
      return;
    }
    return this.api.postData(userUrls.fetchCartCount, {
      // "ccId": parseInt(this.jwtService.getCcId())
    }).pipe(
      tap((data: any) => {
        if (data && data.payload && data.payload.tcId) {
          this.jwtService.saveTcId(data.payload.tcId);
        }
        if (data && data.payload && data.payload.frontEntityId) {
          this.jwtService.saveFrontEntityId(data.payload.frontEntityId);
        }
        this.cus.fetchUserData();
      })
    ).toPromise();
  }

  uploadCartData(product: any) {
    if (!this.jwtService.getCcId()) return;
    let payload: any = {
      // "ccId": parseInt(this.jwtService.getCcId()),
      "tcId": this.jwtService.getTcId() ? parseInt(this.jwtService.getTcId()) : null,
      "customLineId": product.productId,
      "quantity": product.count,
      "savedPrice": product.savedPrice,
      "active": product.active,
      "specVariable": product.specVariables,
    }
    payload[this.addonDisplayConfig.isAddon] = product[this.addonDisplayConfig.isAddon];
    payload[this.addonDisplayConfig.parent] = product[this.addonDisplayConfig.parent];
    this.api.postData(userUrls.addToCart, payload).pipe(
      tap((data: any) => {
        if (data && data.payload && data.payload.tcId) {
          this.jwtService.saveTcId(data.payload.tcId);
        }
        if (data?.payload?.transactionalStyleId) {
          this.jwtService.saveTransactionStyleId(data.payload.transactionalStyleId);
        }
      })
    ).toPromise();
  }

  uploadCartDataBatch(cartData: any[]) {
    if (!this.jwtService.getCcId()) return;
    console.log(cartData);
    
    let payload = cartData.map(d => {
      let item: any = {
        "customLineId": d.productId,
        "quantity": d.count,
        "savedPrice": d.savedPrice,
        "active": d.active
      }
      item[this.addonDisplayConfig.isAddon] = d[this.addonDisplayConfig.isAddon];
      item[this.addonDisplayConfig.parent] = d[this.addonDisplayConfig.parent];
      item[this.addonDisplayConfig.isMandatory] = d[this.addonDisplayConfig.isMandatory];
      return item
    })
    this.api.postData(userUrls.addToCartBatch, {
      // "ccId": parseInt(this.jwtService.getCcId()),
      "tcId": this.jwtService.getTcId() ? parseInt(this.jwtService.getTcId()) : null,
      "itemList": payload
    }).pipe(
      tap((data: any) => {
        if (data && data.payload) {
          if (data.payload.tcId) {
            this.jwtService.saveTcId(data.payload.tcId);
          }
          if (data.payload.transactionalStyleId) {
            this.jwtService.saveTransactionStyleId(data.payload.transactionalStyleId);
          }
        }
      })
    ).toPromise();
  }

  checkoutCart(data?: any) {
    let payload: any;
    if (data) {
      payload = data;
    } else {
      payload = this.generateCheckoutCartPayload();
    }

    if (payload) {
      return this.api.postData(userUrls.checkout, payload).pipe(
        tap((data: any) => {
          if (data.status === "success") {
            this.toastr.success(this.translationVar.orderPlacedMsg, this.translationVar.success);
            this.jwtService.destroyTcId();
            this.jwtService.destroyCartData();
            this.cartObs.next([]);
            this.cartProductDataObs.next([]);
            this.jwtService.destroySelectedAddress();
            this.jwtService.destroyStartTcPayload();
          }
        })
      );
    }
    else {
      return;
    }

  }

  generateCheckoutCartPayload() {
    let grandTotal = 0;
    let totalAmountSaved = 0;
    const cartData = this.cartProductDataObs.value;
    let userData = this.user.getUserDetails()

    if (!cartData.length) {
      return;
    }

    if (!this.user.isLoggedIn()) {
      this.router.navigate(["/main/login"], { queryParams: { referrer: this.router.url } });
      return;
    }
    const itemList = cartData.map(item => {
      const currency = item[this.clDisplayConfig.webDescriptionObj][this.clDisplayConfig.price.currency].value
      const newPrice = parseFloat(item[this.clDisplayConfig.webDescriptionObj][this.clDisplayConfig.price.new].value[0]);
      let oldPrice = parseFloat(item[this.clDisplayConfig.webDescriptionObj][this.clDisplayConfig.price.old]?.value[0]) || newPrice;
      if (oldPrice < newPrice) {
        /* if old price is less than new price -discount will be negative. Keeping old and new price same to rsolve this. */
        oldPrice = newPrice;
      }
      const discount = ((oldPrice - newPrice) / oldPrice) * 100
      grandTotal += newPrice * item[this.clDisplayConfig.quantity];
      const amounSaved = item[this.clDisplayConfig.quantity] * (oldPrice - newPrice)
      totalAmountSaved += amounSaved;
      let listItem: any = {
        "aiActionForm.itemList.customLineIconId": item[this.clDisplayConfig.webDescriptionObj][this.clDisplayConfig.productImage]?.['value'][0] || null,
        "aiActionForm.itemList.customLineName": item[this.clDisplayConfig.productName],
        "aiActionForm.itemList.customLineId": item[this.clDisplayConfig.productId],
        "aiActionForm.itemList.quantity": item[this.clDisplayConfig.quantity],
        "aiActionForm.itemList.skuCode": item[this.clDisplayConfig.webDescriptionObj][this.clDisplayConfig.sku]?.value || "NA",
        "aiActionForm.itemList.oldPrice": oldPrice,
        "aiActionForm.itemList.newPrice": newPrice,
        "aiActionForm.itemList.discountPercentage": discount || 0,
        "aiActionForm.itemList.amountSaved": amounSaved,
        "aiActionForm.itemList.totalAmount": newPrice * item[this.clDisplayConfig.quantity],
        "aiActionForm.itemList.currency": currency,
        "aiActionForm.itemList.rowId": 0,
        "aiActionForm.itemList.isRelated": item[addOnDisplayConfig.isAddon] ? item[addOnDisplayConfig.isAddon] : undefined,
        "aiActionForm.itemList.parentCustomLineId": item[addOnDisplayConfig.parent] ? item[addOnDisplayConfig.parent] : undefined,
      }
      if (item[addOnDisplayConfig.isAddon]) {
        const parentCl: any = cartData.filter((d: any) => d[this.clDisplayConfig.productId] === item[addOnDisplayConfig.parent])[0];
        if (parentCl) {
          listItem["aiActionForm.itemList.parentCustomLineName"] = parentCl[this.clDisplayConfig.productName]
        }
      }
      return listItem;
    })

    let shippingAmount = 0;
    if (grandTotal < MAX_BILL_FOR_SHIPPING_COST) {
      /* Fixed Shipping amount. */
      shippingAmount = SHIPPING_COST;
    }

    const vatAmount = ((grandTotal + shippingAmount) * this.vatPercent / 100).toFixed(PRICE_MAX_DECIMAL_PLACES);
    const netAmount = (grandTotal + shippingAmount + parseFloat(vatAmount)).toFixed(PRICE_MAX_DECIMAL_PLACES);

    const payload = {
      "cordType": "CC",
      "cordId": parseInt(this.jwtService.getCcId()),
      "transactionCordId": parseInt(this.jwtService.getTcId()),
      "transactionalStyleId": parseInt(this.jwtService.getTransactionStyleId()),
      "modelData": {
        "aiActionForm.currency": this.isArabic ? "BHD" : "BHD",
        "aiActionForm.logoImage": environment.logoImageDocId,
        "aiActionForm.itemList": itemList,
        "aiActionForm.grandTotalAmount": grandTotal,
        "aiActionForm.grandTotalAmountSaved": totalAmountSaved,
        "aiActionForm.shippingAmount": shippingAmount,
        "aiActionForm.vatPercentage": this.vatPercent,
        "aiActionForm.vatAmount": parseFloat(vatAmount),
        "aiActionForm.netAmount": parseFloat(netAmount),
        "self.tcId": parseInt(this.jwtService.getTcId()),
        // "self.ccId": parseInt(this.jwtService.getCcId()),
        "self.transactionalStyleId": parseInt(this.jwtService.getTransactionStyleId()),
        "aiActionForm.orderId": parseInt(this.jwtService.getTcId()),
        "aiActionForm.orderDateTime": new Date().getTime(),
        "aiActionForm.customerName": userData.customerName,
        "aiActionForm.noOfItems": this.cartProductDataObs.value.length,
        "aiActionForm.billingGoogleAddressId": this.billingAddress.address.id || undefined,
        "aiActionForm.billingAddress": this.billingAddress.address.toString(),
        "aiActionForm.billingAddressLatitude": this.billingAddress.address.latitude || undefined,
        "aiActionForm.billingAddressLongitude": this.billingAddress.address.longitude || undefined,
        "aiActionForm.billingPrimaryContactNumber": this.billingAddress.phone.countryCode + this.billingAddress.phone.contactNumber,
        "aiActionForm.billingCountryCode": this.billingAddress.phone.countryCode,
        "aiActionForm.billingContactNumber": this.billingAddress.phone.contactNumber,
        "aiActionForm.billingPrimaryContactEmail": this.billingAddress.email.contactEmail,
        "aiActionForm.shippingGoogleAddressId": this.shippingAddress.address.id || undefined,
        "aiActionForm.shippingAddress": this.shippingAddress.address.toString(),
        "aiActionForm.shippingAddressLatitude": this.shippingAddress.address.latitude || undefined,
        "aiActionForm.shippingAddressLongitude": this.shippingAddress.address.longitude || undefined,
        "aiActionForm.shippingPrimaryContactNumber": this.shippingAddress.phone.countryCode + this.shippingAddress.phone.contactNumber,
        "aiActionForm.shippingCountryCode": this.shippingAddress.phone.countryCode,    
        "aiActionForm.shippingContactNumber": this.shippingAddress.phone.contactNumber,
        "aiActionForm.shippingPrimaryContactEmail": this.shippingAddress.email.contactEmail,
      }
    }

    return payload;
  }

  clearCart() {
    this.cartLoading.next(true);
    this.cartObs.next([]);
    this.cartProductDataObs.next([]);
    this.jwtService.destroyCartData();
    this.cartLoading.next(false);
  }
}

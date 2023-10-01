import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-assignment';


  // updateAvailable: boolean = false;
  // timerSubscription: any;
  // updateSubscription: any;
  // selectedLangSub: any;
  // // selectedLang: any;
  // translationVar: any;
  // routeTitles: any;

  constructor(
    // private cartService: CartServiceService,
    // private translation: TranslationService,
    // private update: SwUpdate,
    // private cus: CurrentUserService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title){}


    ngOnInit() {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => {
            // let route: ActivatedRoute = this.router.routerState.root;
            let routeTitle = '';
            while (this.route!.firstChild) {
              this.route = this.route.firstChild;
            }
            if (this.route.snapshot.data['title']) {
              routeTitle = this.route!.snapshot.data['title'];
            }
            return routeTitle;
          })
        )
        .subscribe((title: string) => {
          if (title) {
            this.titleService.setTitle(`My App - ${title}`);
          }
        });
    }



    // by taha sir

    // async ngOnInit(): Promise<void> {
    //   // this.translationVar = this.translation.translationVar.app;
      
    //   this.router.events.pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(()=>this.getAdditionalRouteData())
    //   ).subscribe((data: any)=>{
    //     this.routeTitles = this.translation.translationVar.routeTitles;
    //     if(data){
    //       this.titleService.setTitle(this.routeTitles[data.titleVar])
    //     } else {
    //       this.titleService.setTitle(this.title)
    //     }
    //   })
  
    //   this.translation.fetchLangList();
    //   this.translation.fetchLangFromLocalStorage();
    //   await this.cus.populate();
    //   this.updateClient();
    //   if(window.location.hash.includes('payment-redirect-handle')){
    //     this.cartService.fetchCartCount();
    //   } else {
    //     this.cartService.syncCartData();
    //   }
    //   this.cartService.syncCartData();
    // }
  
    // ngOnDestroy(): void {
    //   clearInterval(this.timerSubscription);
    //   this.updateSubscription.unsubscribe();
    //   this.selectedLangSub.unsubscribe();
    // }
  
    // getAdditionalRouteData(){
    //   let child = this.route.firstChild;
    //   while (child?.firstChild) {
    //     child = child.firstChild;
    //   }
    //   return child?.snapshot?.data;
    // }
  
    // updateClient(){
    //   if(this.update.isEnabled){
    //     this.update.checkForUpdate();
    //     this.timerSubscription = setInterval(()=>{
    //       this.update.checkForUpdate();
    //     }, 300000);
    //   } else {
    //     console.log("Service worker is not enabled!");  
    //   }
  
    //   this.updateSubscription = this.update.available.subscribe(event=>{
    //     console.log("App update available. [", event.current.hash, "] -> [", event.available.hash, "]")
    //     this.updateAvailable = true;
    //   })
    // }
  
    // updateApp(){
    //   window.location.reload();
    // }

}

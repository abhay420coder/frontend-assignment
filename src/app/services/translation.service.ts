import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { translationVarAr } from '../translationConfigAr';
import { translationVarEn } from '../translationConfigEn';
import { langUrls } from '../urls';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  defaultLang = {
    "langName": "EN_VCA/English",
    "isDefault": false,
    "langCode": "EN_VCA",
    "langSupportId": environment.defaultLangId
  }
  languageList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  selectedLanguage: BehaviorSubject<any> = new BehaviorSubject<any>(this.defaultLang);
  isRtl: boolean = false; 
  translationVar: any;

  private subscription;
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private api: ApiService,
    private jwtService: JwtService
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.subscription = this.selectedLanguage.subscribe(lang=>{
      if(lang.langCode.includes("ar")){
        this.isRtl = true;
        this.translationVar = translationVarAr;
      } else {
        this.isRtl = false;
        this.translationVar = translationVarEn;
      }
      this.renderer.setAttribute(document.body, 'dir', this.isRtl?'rtl':'ltr');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchLangList(){
    this.api.postData(langUrls.langList, {}).subscribe({
      next: (data: any)=>{
        if(data && data.payload && data.payload.supportVoList){
          this.languageList.next(data.payload.supportVoList);
        }
      }
    })
  }

  fetchLangFromLocalStorage(){
    const lang = this.jwtService.getSelectedLanguage();
    if(lang && lang.langName && lang.langCode && lang.langSupportId){
      this.selectedLanguage.next(lang);
    } else {
      this.setLang(this.defaultLang);
    }
  }

  setLang(lang: any){
    this.selectedLanguage.next(lang);
    this.jwtService.saveSelectedLanguage(lang);
  }

  getCurrentlang(){
    return this.selectedLanguage.value;
  }
}

import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-miniappcard',
  templateUrl: './miniappcard.component.html',
  styleUrls: ['./miniappcard.component.scss']
})
export class MiniappcardComponent implements OnInit {
  @Input() appDetail: any = {};

  @Output() onMiniAppSelect: EventEmitter<any> = new EventEmitter<any>();

  constructor(

  ) { }

  ngOnInit(): void {

  }

  onPlay(miniAppUrlName:string){
    this.onMiniAppSelect.emit({url:miniAppUrlName})
  }
}

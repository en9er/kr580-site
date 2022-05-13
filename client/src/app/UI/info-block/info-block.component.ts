import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.css']
})
export class InfoBlockComponent implements OnInit {
  @Input() alignLeft: boolean | undefined;
  @Input() imageSrc: string | undefined;
  @Input() header: string | undefined;
  @Input() desc: string | undefined;
  @Input() animationClass: string | undefined;
  constructor() {
  }

  ngOnInit(): void {
  }

}

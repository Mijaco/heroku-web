import { Component, OnInit, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Answer } from 'app/models/model';

@Component({
  selector: 'bq-resultdetail',
  templateUrl: './resultdetail.component.html',
  styleUrls: ['./resultdetail.component.scss']
})
export class ResultdetailComponent implements OnInit {
  @Input() answer: Answer;
  
  constructor(public activeModal: NgbActiveModal) { }
  

  ngOnInit() {
  }

}

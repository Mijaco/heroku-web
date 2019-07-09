import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  state,
  transition,
  trigger,
  style,
  animate
} from '@angular/core';
import { ResultService } from 'app/services/result.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Answer } from 'app/models/model';
import { ResultdetailComponent } from 'app/components/resultdetail/resultdetail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faSearch, faCar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'bq-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [
    trigger('flyInDown', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-200%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(200%)' }))
      ])
    ])
  ]
})
export class SummaryComponent implements OnInit {
  @Input() summary: string;
  @Output() resetQuiz = new EventEmitter();
  resultado:  string ;
  @Input() score ;
  answers: Answer[];
  @Input() faCar = faCar;
  constructor(private modalService: NgbModal,private ds:ResultService) {
    this.answers =  Array.from(ds.getResults().values());
    
    if(ds.getResults().size > 0){
      this.score = (ds.getScore()/ds.getResults().size)*100 + " % ";
    }else{
      this.score = "0%";
    }
  }

  ngOnInit() {
  }

  reset() {
    this.resetQuiz.emit(true);
  }

  open(answer:Answer) {
    console.log("open:" + answer.number);
    const modalRef = this.modalService.open(ResultdetailComponent);
    modalRef.componentInstance.answer = answer;
    
  }

}

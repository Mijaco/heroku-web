import {
  Component
} from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { HeroService } from 'app/services/hero.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Question } from 'app/models/model';
import { ResultService } from 'app/services/result.service';
@Component({
  selector: 'bq-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('pageState', [
      state('inactive', style({
        boxShadow: '0 1px 3px #aaa',
        border: '1px solid grey',
        transform: 'scale(1)'
      })),
      state('active',   style({
        boxShadow: '0 2px 5px #aaa',
        border: '1px solid #386166',
        transform: 'scale(1.4)',
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ])
  ]
})
export class QuizComponent {
  //questions: Question[]  = [];
  questions: Array<Question> = new Array<Question>();
  summary = {};
  selections = {};
  showSummary = false;
  option = false;
  activeSlideIndex = 0;
  questionsUrl = 'http://localhost:3000/questions';
 

  myHeroName: any;


  ngOnInit () {
    this.myHeroName = this.ds.getHero();

    this.http.get(this.questionsUrl).subscribe(
      (exam: Question []) => {
        this.questions = exam as Question [];	 // FILL THE ARRAY WITH DATA.
        this.shuffleItems();

        console.log(">>title 5:" + this.questions[0].title[5]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }

     
    ); 
    
    
  }

  shuffleItems (){
    let counter = this.questions.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      [this.questions[counter], this.questions[index]] = [this.questions[index], this.questions[counter]];
    }  
  }





  constructor(private hero: HeroService, private http: HttpClient,private ds: ResultService) {
    // this.questions = hero.getQuestions();    
  }

  setHero(x) {
    this.ds.setHero(x);
  }
    
  

  onSelected(questionIdx, choiceIdx) {
    console.log("selected:" + questionIdx )
    this.summary[questionIdx] =
      this.questions[questionIdx].choices[choiceIdx].summary;

    this.selections[questionIdx] = choiceIdx;

    if (Object.keys(this.selections).length === this.questions.length) {
      //this.activeSlideIndex = 0;
      //this.showSummary = true;
    } else {
      // FOR AUTO change question
      if (this.activeSlideIndex === this.questions.length - 1 && this.option) {
        this.activeSlideIndex = 0;
      } else if (this.option) {
        this.activeSlideIndex += 1;
      }
    }
  }

  changeActiveSlide(index) {
    console.log("active:" +index)
    this.activeSlideIndex = index;
  }
  
  goToSummary(){
    this.showSummary = true;
  }

  resetQuiz() {
    this.showSummary = false;
    this.selections = {};
    this.summary = {};
  }

  getSummary() {
    const limit = Object.keys(this.summary).length;
    let summary = '';

    for (let index = 0; index < limit; index++) {
      summary += `${this.summary[index]}`;
    }

    return summary;
  }
}

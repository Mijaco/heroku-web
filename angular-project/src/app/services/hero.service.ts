import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Question } from 'app/models/model';

@Injectable()
export class HeroService {
  questions: Question[]  = [];
  questionsUrl = 'https://quiz-app.free.beeceptor.com/questions';
  
  constructor(private http: HttpClient) {
  }

  ngOnInit () {
    this.http.get(this.questionsUrl).subscribe(
      (exam: Question[]) => {
        this.questions = exam as Question [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }
 
  getQuestions(){
   this.http.get(this.questionsUrl).subscribe(
      (exam: Question[]) => {
        this.questions = exam as Question [];	 // FILL THE ARRAY WITH DATA.
        //  console.log(this.arrBirds[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );

    return this.questions;
  }
 
}

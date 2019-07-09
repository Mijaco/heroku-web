import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Exam, Question } from 'app/models/model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeroService {
  questions: Question[]  = [];
  questionsUrl = 'http://localhost:3000/questions';
  
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

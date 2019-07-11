import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import 'rxjs/add/observable/of';
import { Choice, Answer, Question } from 'app/models/model';
import { isNullOrUndefined } from 'util';


@Injectable()
export class ResultService {
  private answer: Answer;
  private score = 0;
  private heroName: string;
  private results: Map<Number,Answer>;
  
  private sub: BehaviorSubject<any>;

  constructor() {
    this.heroName = "None Yet !";
    this.sub = new BehaviorSubject(this.heroName);
    this.results = new Map<Number,Answer>();
  }

  setHero(x) {
    this.heroName = x;
    this.sub.next(this.heroName);
  }

  //we will return a subject. people should subscribe to it.
  // and then whenever this sub emits a value, they will get // updated.
  getHero() {
    return this.sub;
  }

  getHeroAsString() {
    return this.heroName;
  }

  addResponse(choice: Choice, question: Question) {
    if(isNullOrUndefined(this.results.get(question.id))) {
      console.log("new question");
      this.answer = new Answer();
      this.answer.number = question.id;
      this.answer.description = question.title;
      this.answer.letter_selected.push(choice.letter);
      this.answer.letter_selected.sort();
      this.answer.letter_correct = question.correct;
      this.answer.feedback = question.feedback;
      
      if(this.isCorrectAnswer(this.answer.letter_selected,question.correct)){
        this.answer.status = "Ok";
        this.score += 1;
      } else {
        this.answer.status = "Wrong";
        
      }
      
      this.results.set(question.id, this.answer);
      
    } else {

      console.log("already exists");
      this.answer = this.results.get(question.id);
      var index = this.answer.letter_selected.indexOf(choice.letter)
      console.log("index: " + index);
      if(index == -1){
        console.log("Agregando respuesta al indice " + (question.id));
        this.answer.letter_selected.push(choice.letter);
        this.answer.letter_selected.sort();
        
      } else {
        console.log("Ya contiene esta opcion, removiendo..");
        this.answer.letter_selected.splice(index, 1);
        
      }
    
    console.log("validando si es respuesta correcta.. letra selecccionada:[ " + this.answer.letter_selected + " ], opciones correctas:[ " + question.correct + " ] ");

    var isCorrect =  this.isCorrectAnswer(this.answer.letter_selected,question.correct);
    if(isCorrect) {
      this.answer.status = "Ok";
      this.score += 1;
    } else {
      this.answer.status = "Wrong";
    }
      
    }
   
  }

  isCorrectAnswer(letterSelected :Array<String> ,correctLetters:String){
    
    var arrayCorrects: String[] = correctLetters.split(",");


    var  response:boolean= true;

    if(letterSelected.length == arrayCorrects.length) {
    letterSelected.forEach(element => {
       if(arrayCorrects.indexOf(element) == -1){
        //console.log("comparing: [ " + element + " ] into [ " + letterSelected + " ]");
        console.log("Elemento seleccionado  [" + element + " ] No es poseido por [ " + arrayCorrects + "]");
        response = false;
       } else {
        console.log("respuesta [ " + element + " ] es contenida en [ " + arrayCorrects + " ] ");       
       }
     });
    } else {
      return false;
    }
     
     return response;
  }

  getChoicesNumber() {
    return this.answer.status;
  }

  getResults() {
    return this.results;
  }

  getScore() {
    return this.score;
  }

}
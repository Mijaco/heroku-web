export class Question {
  id: Number;
  title: string;
  drawType: string;
  feedback: string;
  correct: string;
  choices: Choice[];
}

export class Choice {
  title: string[];
  imageUrl: string;
  // Defines your character based on choice
  summary: string;
  letter: string;
  isSelected: boolean = false;
  
}

export class Exam {
  questions: Question[];
 
}

export class Answer {
  number: Number;
  description: string;
  letter_selected: Array<String> = new Array<String>();
  letter_selected_set: Set<String> = new Set<String>();
  letter_correct:string;
  status: string;//OK OR FAIL
  feedback: string;
}




export class Result {
  title: string;
  details: Choice[];


}


export class ModelMapper<T> {
  _propertyMapping: any;
  _target: any;
     constructor(type: { new(): T ;}){
        this._target = new type();
        this._propertyMapping = this._target.constructor._propertyMap;
     }

     map(source){
       Object.keys(this._target).forEach((key) => {
         const mappedKey = this._propertyMapping[key]
         if(mappedKey){
           this._target[key] = source[mappedKey];
         }
         else {
           this._target[key] = source[key];
         }
       });
       Object.keys(source).forEach((key)=>{
         const targetKeys = Object.keys(this._target);
         if(targetKeys.indexOf(key) === -1){
           this._target[key] = source[key];
         }
       });
      return this._target;
     }
}
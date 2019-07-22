import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuestionComponent } from './components/question/question.component';
import { ChoiceComponent } from './components/choice/choice.component';
import { SummaryComponent } from './summary/summary.component';
import { HeroService } from './services/hero.service';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Routes
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultService } from './services/result.service';
import { ResultdetailComponent } from './components/resultdetail/resultdetail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'quiz', pathMatch: 'full', redirectTo: 'quiz' },

  {
    path: '',
    component: QuizComponent
  }
];

export const appRoutes = RouterModule.forRoot(routes);



@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ChoiceComponent,
    SummaryComponent,
    QuizComponent,
    ResultdetailComponent
    
  ],
  

  imports: [
    
    appRoutes,
    BrowserModule,
    FormsModule,
    HttpModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    NgbModule.forRoot()
    
  ],
  entryComponents: [ResultdetailComponent],
  providers: [HeroService,ResultService,NgbModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }

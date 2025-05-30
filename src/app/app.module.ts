import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { routes } from './app-routing.module';
import { ChevronDown, CreditCard, DollarSign, Home, LucideAngularModule, PiggyBank, Plus, Search, ShoppingBag, TrendingDown, TrendingUp, Wallet } from 'lucide-angular';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    RouterModule.forRoot(routes),
    LucideAngularModule.pick({
      Wallet,
      TrendingUp,
      TrendingDown,
      ChevronDown,
      Search,
      Plus,
      Home,
      ShoppingBag,
      CreditCard,
      DollarSign,
      PiggyBank
    })
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }

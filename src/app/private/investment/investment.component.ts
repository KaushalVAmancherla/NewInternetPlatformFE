import { Component, OnInit } from '@angular/core';

/**
 * Investment page allow the user to determine the relative importance of all the categories/topics on the platform. It is called
 * "investment" since the relative importance of categories determines the PS of posts on the platform. The importance of each category
 * will then be determined according to the "vote" of all users on the Platform (of course, the weight of each user's "vote" is based on
 * that user's CS * PS)
 */
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    // TODO Implment Investment component
  }

}

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const svg = d3.select('rect').append('svg')
    .attr("width", 400)
    .attr("height", 400)
    .attr('fill', "red")
  }

}

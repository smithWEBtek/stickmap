import * as d3 from 'd3'
import { fretboardData } from '../../components/fretboardData/fretboardData'
import { cmajor } from '../../components/fretboardData/fretboardData'
import './Fretboard.css'

window.addEventListener('DOMContentLoaded', () => {

	const data = fretboardData
	const chord = cmajor
	console.log('data: ', data)
	console.log('chord: ', chord)

	// svg variable is placed using a div and class css selector
	const svg = d3.select('.stickmap')
		.append('svg')
		.attr('width', 400)
		.attr('height', 600)
		.attr('margin-left', 20);

	// create margins on dimensions
	const margin = { top: 20, right: 0, bottom: 50, left: 70 };
	const graphWidth = 400 - margin.left - margin.right;
	const graphHeight = 600 - margin.top - margin.bottom;

	// create group
	const graph = svg.append('g')
		.attr('width', graphWidth)
		.attr('height', graphHeight)
		.attr('transform', `translate(${margin.left}, ${margin.top})`)

	// axis
	const xAxisGroup = graph.append('g')
		.attr('transform', `translate(0, ${graphHeight})`)

	const yAxisGroup = graph.append('g')

	// set x range using graphHeight(calculated above) and 0 
	// set y domain using min/max of 0 to 27
	const y = d3.scaleLinear()
		.domain([0, 27])
		.range([graphHeight, 0]);

	const x = d3.scaleBand()
		.domain(data.map((d, i) => i + 1)) // array of string #s for x domain
		.range([0, graphWidth]) // range within overall graph width
		.paddingInner(0.93)
		.paddingOuter(0.2);

	// find existing and append virtual rects to graph now, 
	//   instead of svg, to incorporate graph grouping
	// add data to rects
	const rects = graph.selectAll('rect')
		.data(data)

	// bind existing rects to graph, instead of svg, to incorporate graph grouping
	rects.append('rect')
		.attr('width', x.bandwidth)
		.attr('height', d => graphHeight - y(27))
		.attr('fill', 'red')
		.attr('stroke', 'red')
		.attr('x', (d, i) => x(i))
		.attr('y', d => y(27))

	rects.enter()
		.append('rect')
		.attr('width', x.bandwidth)
		.attr('height', graphHeight)
		.attr('fill', 'gray')
		.attr('stroke', 'black')
		.attr('x', (d, i) => x(i + 1))
		.attr('y', d => y(27))

	console.log('EnterSelection rects: ', rects)
	// add a hard coded circle to display
	svg.append('circle')
		.attr('r', 10)
		.attr('cx', margin.left + 41)
		.attr('cy', 400)
		.attr('fill', 'green')
		.attr('stroke', 'yellow')
		.attr('stroke-width', 3)

	svg.append('circle')
		.attr('r', 10)
		.attr('cx', margin.left + 76)
		.attr('cy', d => 300)
		.attr('fill', 'red')
		.attr('stroke', 'yellow')
		.attr('stroke-width', 3)

	svg.append('circle')
		.attr('r', 10)
		.attr('cx', margin.left + 111)
		.attr('cy', d => 200)
		.attr('fill', 'blue')
		.attr('stroke', 'yellow')
		.attr('stroke-width', 3)

	// create and call the axes
	const xAxis = d3.axisBottom(x)
	const yAxis = d3.axisLeft(y)
		.ticks(27)
		.tickFormat(d => `${d}`);

	// apply these to:  
	// const xAxisGroup = graph.append('g')
	// const yAxisGroup = graph.append('g')
	xAxisGroup.call(xAxis)
	yAxisGroup.call(yAxis)

	xAxisGroup.selectAll('text')
		.attr('transform', 'rotate(0)')
		.attr('text-anchor', 'end')
		.attr('fill', 'black');
})

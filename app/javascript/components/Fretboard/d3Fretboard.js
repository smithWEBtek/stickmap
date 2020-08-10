import * as d3 from 'd3'
import { fretboardData } from '../../components/fretboardData/fretboardData'
import { cmajor } from '../../components/fretboardData/fretboardData'

window.addEventListener('DOMContentLoaded', () => {

	console.log('fretboardData: ', fretboardData)
	const data = fretboardData
	const chord = cmajor

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

	console.log('graphWidth: ', graphWidth)
	console.log('graphHeight: ', graphHeight)

	// axis
	const xAxisGroup = graph.append('g')
		.attr('transform', `translate(0, ${graphHeight})`)

	const yAxisGroup = graph.append('g')

	// set y domain using min/max of 0 to 27
	// set y range using graphHeight(calculated above) and 0 
	const y = d3.scaleLinear()
		.domain([0, 27])
		.range([graphHeight, 0]);

	const x = d3.scaleBand()
		.domain(data.map((d, i) => i + 1)) // array of string #s for x domain
		.range([0, graphWidth]) // range within overall graph width
		.paddingInner(0.93)
		.paddingOuter(0.2);

	// find existing and append virtual rects to graph now, instead of svg, to incorporate graph grouping
	// const rects = svg.selectAll('rect')
	// add data to rects
	const rects = graph.selectAll('rect')
		.data(data)

	// bind existing rects to graph, instead of svg, to incorporate graph grouping
	rects.attr('width', x.bandwidth)
		.attr('height', d => graphHeight - y(27))
		.attr('fill', d => d.color)
		.attr('stroke', 'black')
		.attr('x', (d, i) => x(i))
		.attr('y', d => y(27));


	console.log('rects: ', rects)
	// create and append virtual rects to graph, instead of svg, to incorporate graph grouping
	rects.enter()
		.append('rect')
		.attr('width', x.bandwidth) // width determined by svg width diveded by numer of items in x.domain
		.attr('height', d => graphHeight - y(27)) // height of bar only, does not place it up or down vertically
		.attr('fill', 'gray')
		.attr('x', (d, i) => x(i + 1))   // name attr is index on array derived in x BAND scale; returns a number
		.attr('y', d => y(27)) // votes attr is index on array derived in y LINEAR; returns a numb

	// add a hard coded circle to display
	svg.append('circle')
		.data(data)
		.attr('r', 5)
		.attr('cx', (d, i) => i + 80)
		.attr('cy', (d, i) => i + 400)
		.attr('fill', 'lightblue')
		.attr('stroke', 'navy').append('circ')

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

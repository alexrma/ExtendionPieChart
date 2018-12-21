////////////////////////////////////////////////////
//Author: Alexrma
//Based on work:  	Richard Byard
//Description: Modification of RGraph extension to add additional functions
//Date:		18 Dic 2018
//Custom version: 0.1
////////////////////////////////////////////////////

define( [
        // Load the properties.js file using requireJS
        // Note: If you load .js files, omit the file extension, otherwhise
        // requireJS will not load it correctly 
		'jquery',
		'qlik',
        './properties/properties',
		'./properties/initialProperties',
		'./libraries/RGraph.common.core',
		'./libraries/RGraph.common.dynamic',
		'./libraries/RGraph.common.tooltips',
		'./libraries/RGraph.common.resizing',
		'./libraries/RGraph.common.key',
		'./libraries/RGraph.drawing.rect',
		'./libraries/RGraph.pie'
		
    ],
	
    function ( $, qlik, props, initProps) {
        'use strict';	
		//Inject Stylesheet into header of current document
		//$( '<style>' ).html(styleSheet).appendTo( 'head' );
        return {
			//Define the properties tab - these are defined in the properties.js file
             definition: props,

			//Define the data properties - how many rows and columns to load.
			 initialProperties: initProps,
			
			//Allow export to print object 
			support : { export: true 
			},
			
			//Not sure if there are any other options available here.
			 snapshot: {cantTakeSnapshot: true
			 },

			//paint function creates the visualisation. - this one makes a very basic table with no selections etc.
            paint: function ($element, layout) {
			
			var app = qlik.currApp(this);
			var that = this;
			
			// Get the Number of Dimensions and Measures on the hypercube
			// Get the Measure Name and the Dimension Name
			// Get the number of fields of a dimension
			var numberOfDimensions = layout.qHyperCube.qDimensionInfo.length;			
			var numberOfMeasures = layout.qHyperCube.qMeasureInfo.length;
			var measureName = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;			
			var dimensionName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;			
			var numberOfDimValues = layout.qHyperCube.qDataPages[0].qMatrix.length;
			
			
			// Get the values of the dimension and default value of variables 
			var dimArray =[];
			var dimArrayOriginal=[];
			var measArray =[];
			var dataArray =[];
			var porcentajeArray =[];
			var numIdentif =[];
			var elementNumber = [];
			var arrayExplode = [];
			var sumMedida = 0;			
			var coloresEntrada = [];
			var labelsSticksLength = 0;
			
			//Set colors enter in the layout
			coloresEntrada =(layout.colores).split(',');
			
			
			for (var i=0; i<numberOfDimValues;i++){					
				dataArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qNum;		
				
			}

			var sumMedida = dataArray.reduce((a, b) => a + b, 0);
			/*for (var i = 0; i < dataArray.length; i++) {
				sumMedida += dataArray[i]
			}*/		
			

			switch(layout.numDecimals){
				case 0: var numDecimals =0 ; break;
				case 1: var numDecimals = 1; break;
				case 2: var numDecimals = 2; break;
				case 3: var numDecimals = 3; break;
				case 4: var numDecimals = 4; break;
				case 4: var numDecimals = 5; break;				
				default: var numDecimals = 2;
			}

			for (var i=0; i<numberOfDimValues;i++){
				elementNumber[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qElemNumber;
				dimArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
				dimArrayOriginal[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
				measArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText;
				dataArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qNum;

				numIdentif[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qElemNumber;
				porcentajeArray[i]=(((dataArray[i])/sumMedida)*100).toFixed(numDecimals);
				arrayExplode[i]=0;
				dimArray[i] = dimArray[i]+' ' + String(porcentajeArray[i]) + '%';
			}	
			

			var dimensionLength=layout.qHyperCube.qDataPages[0].qMatrix.length;			
			var chart;
			
			
		
			
			
			// Color secction			
			
			// Red to Yellow (chart color 2 and 3)			
			switch(numberOfDimValues) {
				case 1: var palette2 = ["#fb9a29"]; break;
				case 2: var palette2 = ["#662506","#fff7bc"]; break;
				case 3: var palette2 = ["#662506","#fed573","#fff7bc"]; break;
				case 4: var palette2 = ["#662506","#fdc34e","#fee89d","#fff7bc"]; break;						
				case 5: var palette2 = ["#662506","#f68e23","#fedf89","#feeca5","#fff7bc"]; break;
				case 6: var palette2 = ["#662506","#da5c0a","#fdbf4a","#fee89d","#fef0ad","#fff7bc"]; break;
				case 7: var palette2 = ["#662506","#d65707","#fcb23f","#fedf89","#fee79b","#feeea9","#fff7bc"]; break;
				default: var palette2 = ["#662506","#993404","#cc4c02","#ec7014","#fb9a29","#fec44f","#fee391","#fff7bc"];
			}
			
			// Blue to Red (chart coloe 4 and 5)
			switch(numberOfDimValues) {
				case 1: var palette4 = ["#e8fsfe"]; break;
				case 2: var palette4 = ["#3d52a1","#ae1c3e"]; break;
				case 3: var palette4 = ["#3d52a1","#d95c46","#ae1c3e"]; break;
				case 4: var palette4 = ["#3d52a1","#ebe6db","#d95c46","#ae1c3e"]; break;
				case 5: var palette4 = ["#3d52a1","#ebe6db","#d95c46","#c3393e","#ae1c3e"]; break;
				case 6: var palette4 = ["#3d52a1","#a8d6f3","#f29d6b","#cb443e","#bc2f3e","#ae1c3e"]; break;
				case 7: var palette4 = ["#3d52a1","#9ecff0","#f6b076","#d95c46","#cd463e","#bf343e","#ae1c3e"]; break;
				case 8: var palette4 = ["#3d52a1","#8dc4eb","#f2cfa7","#ec865d","#e27152","#da5e47","#cc453e","#ae1c3e"]; break;
				case 9: var palette4 = ["#3d52a1","#88c1ea","#efd8bc","#ef9164","#e87e59","#e06b4e","#d45341","#b8293e","#ae1c3e"]; break;
				default: var palette4 = ["#3d52a1","#3a89c9","#77b7e5","#b4ddf7","#e6f5fe","#ffe3aa","#f9bd7e","#ed875e","#d24d3e","#ae1c3e"];
			}
			
			// 3d effect colors
			var palette6 = ['Gradient(#c00:red:#f66:red:#c00)', 'Gradient(#00c:blue:#66f:blue:#00c)', 'Gradient(#0c0:#0f0:#6f6:#0f0:#0c0)', 'Gradient(#c66:pink:pink:pink:#c66)', 'Gradient(gray:#ccc:white:#ccc:gray)'];
			
			
			
			
			switch(layout.chartColor) {
				case 2: // dark red to yellow
					var palette = palette2;
					break;
				case 3: // yellow to dark red
					var palette = palette2.reverse();
					break;
				case 4: // blue to red
					var palette = palette4;
					break;
				case 5: // red to blue
					var palette = palette4.reverse();
					break;
				case 6: // 3d effect colors
					var palette = palette6;
					break;
				case 1: // Custom colors for dimension									
					//var colores = {0:"#FF8F11",1:"#10BE00",2:"#76D7C4",3:"#117A65",4:"#F2E85B",5:"#E74C3C",6:"#2471a3",7:"#fe98fe",8:"#9b59b6",9:"#000000"};					
						var palette = numIdentif.map(function(x) {						
							return coloresEntrada[x];
						});					
				break;
			}
			
			switch(layout.leyendStyle) {
				
				case 1: // Leyenda no visible
					var leyendStyleOp = false;
					break;
				case 2: // Leyenda con cuota
					var leyendStyleOp = dimArray;
					break;
				case 3: // Leyenda sin cuota
					var leyendStyleOp = dimArrayOriginal;
				break;				
				
			}
			
			
			
			// set shadow color to allow shadow to switch on and off
			if (layout.shadow) {
				var shadowYN = '#aaa';
			} else {
				var shadowYN = 'rgba(0,0,0,0)';
			}
			// set stick color lenth
				if (layout.labelsSticksLength) {
					var labelsSticksLength = layout.labelsSticksLength;
				} else {
					var labelsSticksLength = 10;
				}
			// set stick color lenth
				if (layout.textFontSize) {
					var textFontSize = layout.textFontSize;
				} else {
					var textFontSize = 10;
				}
			
			// set exploding segments based off easy selection variable (will not store string required)
			switch(layout.explodeSegment) {
				case 0:
					var explodeSegment2 = [0];
					break;
				case 1:
					var explodeSegment2 = [20];
					break;
				case 2:
					var explodeSegment2 = [0,20];
					break;
				case 3:
					var explodeSegment2 = [0,0,20];
					break;
				case 4:
					var explodeSegment2 = [0,0,0,20];
					break;
				case 5:
					var explodeSegment2 = [0,0,0,0,20];
					break;
			}
			
			
			// set segment border color to allow border to switch on and off
			if (layout.segmentBorder) {
				var segmentBorder2 = '#fff';
			} else {
				var segmentBorder2 = 'rgba(0,0,0,0)';
			}
			
			
			
			// Activate or Deactivate Labels Sticks as sticks should not show if labels not selected.
			if (layout.chartLabels) {
				var labelsArray = dimArray;
			} else {
				var labelsArray = [];
			}
			
			
	
			
			// Swtich between charts to draw below 
			switch(layout.chartEffect) {
				case "Halo":
					var chartTypeEffect = "Halo";
					var chartVariant = layout.chartType;
					break;
				case "Border":
					var chartTypeEffect = "Halo";
					var chartVariant = layout.chartType;
					break;	
				case "2d":
					var chartTypeEffect = "Default";
					var chartVariant = layout.chartType;
					break;
				case "3d":
					var chartTypeEffect = "Default";
					var chartVariant = layout.chartType.concat(layout.chartEffect);
					break;
				case "test":
					var chartTypeEffect = "test";
					var chartVariant = layout.chartType;
					break;
				case "funnel":
					var chartTypeEffect = "funnel";
					var chartVariant = layout.chartType;
					break;
			}
					

			//To generate random numbers to allow multiple charts to present on one sheet:
			function guid() {return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
			function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);};
			var tmpCVSID = guid();
						


			var html = '';			
			var width = $element.width(), height = $element.height();
			// add canvas for chart			
			html+='<div id="canvas-wrapper"><canvas id="' + tmpCVSID + '" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';

			$element.html(html);

			
			RGraph.Reset(document.getElementById(tmpCVSID));

			
			
			switch(chartTypeEffect) {
				// Draws default pie chart
				case "Default":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50, 
							linewidth: layout.segmentBorderWidth,
							textSize: 10,
							textColor: '#595959',
							strokestyle: segmentBorder2,
							tooltips: dimArray,
							tooltipsEvent: 'onmousemove',					
							labels: labelsArray,
							//key: labelsArray,	
							key:leyendStyleOp,					
							colors: palette,
							//keyInteractive:true,
							variant: chartVariant,							
							radius: layout.radiusValue,
							variantDonutWidth: layout.variantDonutWidth,
							shadowOffsety: 5,
							shadowColor: '#aaa',
							textAccessible: true,
							exploded:explodeSegment2,
							resizable: false,
							labelsSticks: layout.labelSticks,
							labelsSticksUsecolors: layout.labelSticksDefColor,
							//labelsSticksColors:labelColorsArray,
							labelsSticksLength: layout.labelsSticksLength,
							labelsSticksLinewidth: layout.labelsSticksLinewidth,
							textSize: textFontSize,
							labelsBold: layout.labelBold,
							//explodedSegmentDist: layout.explodedSegmentDist,
							eventsClick: onClickDimension,
							keyPositionX:layout.legendPosH,
							keyPositionY:layout.legendPosV,
							keyPositionGraphBoxed:false,
							keyPositionMarginBoxed:false
						

							//eventsMousemove: onMouseMove
						}
					}).draw();
					break;

					case "test":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 50,
							gutterRight: 50,
							linewidth: 0,
							strokestyle: 'rgba(0,0,0,0)',
							tooltips: dimArray,
							tooltipsEvent: 'onmousemove',					
							labels: labelsArray,						
							colors: palette,
							variant: 'donut',
							//radius: 100,
							//labelsSticksColors: [,'#cc0',,,'#0f0',,'black'],
							key: labelsArray,
							keyPositionX: layout.legendPosH,
							keyPositionY: layout.legendPosV,
							radius: layout.radiusValue,
							shadowOffsety: 5,
							shadowColor: '#aaa',
							//exploded: [,,8],
							textAccessible: false,
							resizable: false,
							labelsSticks: layout.labelSticks,
							labelsSticksUsecolors: layout.labelSticksDefColor,
							//labelsSticksColors:labelColorsArray,
							labelsSticksLength: layout.labelsSticksLength,
							labelsSticksLinewidth: layout.labelsSticksLinewidth,
							textFontSize:layout.textFontSize,
							textSize: layout.textFontSize,
							labelsBold: layout.labelBold,
							eventsClick: onClickDimension
							//eventsMousemove: onMouseMove
						}
					}).draw();
					break;						

					// Draws Halo chart	
					case "Halo":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50,
							linewidth: layout.segmentBorderWidth,
							textSize: 10,
							textColor: '#9fcfff',
							strokestyle: segmentBorder2,
							tooltips: dimArray,
							tooltipsEvent: 'onmousemove',					
							labels: labelsArray,						
							colors: palette,
							variant: chartVariant,
							//radius: 100,
							//width: 50,
							labelsSticksList: layout.labelSticks,
							labelsSticksColors: true,
							//radius: 80,
							shadowOffsety: layout.shadowDepth,
							shadowColor: shadowYN,
							//exploded: explodeSegment2,
							textAccessible: false,
							eventsClick: onClickDimension,
							//eventsMousemove: onMouseMove,
						}
					}).on('draw', function(obj)
							{
								
								RGraph.path2(
									obj.context,
									'lw 5 b a % % % 0 6.2830 false s white',
									obj.centerx,
									obj.centery,
									obj.radius - 12
								);

							}).draw();
					break;
			}	
			

			
			
			// On Click actions
			function onClickDimension (e, shape)
			{
								
				var index = shape.index;
				var obj = shape.object;
				
				//obj.Set('radius', 250)
				//obj.Set('variant', 'donut')
				//obj.Set('variant.donut.width', 50)

				that.selectValues(0, [elementNumber[index]],true);				
			
				if(arrayExplode[index]!=0){
					arrayExplode[index] = 0;
				} else {
					arrayExplode[index] = 15;
				}
				
				
				obj.explodeSegment(arrayExplode, 15);				
				obj.set('exploded', arrayExplode);				
				e.stopPropagation();			

			}	
			
			// On Mouse Over actions
			function onMouseMove (e, shape)
			{
				
				
				var key = RGraph.Registry.get('key-element');		
				
			}					
			
			//needed for export
			return qlik.Promise.resolve();
		}	
		
		
		
	};

} );


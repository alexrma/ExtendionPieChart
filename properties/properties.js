define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var app = qlik.currApp();

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 1
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };
	
	// *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    var sortingSection = {
        uses: "sorting"
    };
	
	// *****************************************************************************
    // Options Section
    // *****************************************************************************

	var chartType = {
			type: "string",
			component: "dropdown",
			label: "Tipo de gráfico",
			ref: "chartType",
			options: [{
				value: "pie",
				label: "Pie"
			}, {
				value: "donut",
				label: "Donut"
			}
			],
			defaultValue: "donut"
	};

	
	var chartEffect = {
			type: "string",
			component: "dropdown",
			label: "Efectos sobre el gráfico",
			ref: "chartEffect",
			options: [{
				value: "2d",
				label: "2D"
			}, {
				value: "3d",
				label: "3D"
			}, {
				value: "Halo",
				label: "Halo"
			}
			],
			defaultValue: "2d"
	};
	
		
	var chartColor = {
			type: "string",
			component: "dropdown",
			label: "Tipos de Colores",
			ref: "chartColor",
			options: [{
				value: 1,
				label: "Colores personalizados"
			}, {
				value: 2,
				label: "Gradiente rojo -> amarillo"
			}, {
				value: 3,
				label: "Gradiente amarillo -> rojo"
			}, {
				value: 4,
				label: "Gradiente azul -> rojo"
			}, {
				value: 5,
				label: "Gradiente rojo -> azul"
			},{
				value: 6,
				label: "3D ColorColores 3D"
			}
			
			],
			defaultValue: 1
	};

	
	var chartLabels = {
			type: "boolean",
			component: "switch",
			label: "Mostrar etiquetas",
			ref: "chartLabels",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: true
	};
	
	var labelSticks = {
			type: "boolean",
			component: "switch",
			label: "Mostrar guias de las etiquetas",
			ref: "labelSticks",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var explodeSegment = {
			type: "string",
			component: "dropdown",
			label: "Expandir segmento",
			ref: "explodeSegment",
			options: [{
				value: 0,
				label: "None"
			}, {
				value: 1,
				label: 1
			}, {
				value: 2,
				label: 2
			}, {
				value: 3,
				label: 3
				
			}, {
				value: 4,
				label: 4
			}, {
				value: 5,
				label: 5
			}
			]
	};
	
	
	var shadow = {
			type: "boolean",
			component: "switch",
			label: "Mostrar sombra",
			ref: "shadow",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var shadowDepth = {
			type: "string",
			component: "dropdown",
			label: "Profundidad de la sombra",
			ref: "shadowDepth",
			options: [{
				value: 5,
				label: '5 pixels'
			}, {
				value: 10,
				label: '10 pixels'
			}, {
				value: 15,
				label: '15 pixels'
			}, {
				value: 20,
				label: '20 pixels'
			}
			],
			defaultValue: 5
	};
	
	
	var segmentBorder = {
			type: "boolean",
			component: "switch",
			label: "Mostrar borde del segmento",
			ref: "segmentBorder",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};

	var colores = {
		ref: "colores",
		label: "Colores para dimensión",
		type: "string",
		expression: "optional"
	};
	
	
	var segmentBorderWidth = {
			type: "string",
			component: "dropdown",
			label: "Ancho del borde del segmento",
			ref: "segmentBorderWidth",
			options: [{
				value: 2,
				label: '2 pixels'
			}, {
				value: 3,
				label: '3 pixels'
			}, {
				value: 4,
				label: '4 pixels'
			}, {
				value: 5,
				label: '5 pixels'
			}, {
				value: 6,
				label: '6 pixels'
			}, {
				value: 7,
				label: '7 pixels'
			}, {
				value: 8,
				label: '8 pixels'
			}, {
				value: 9,
				label: '9 pixels'
			}, {
				value: 10,
				label: '10 pixels'
			}
			
			],
			defaultValue: 5
	};
	
	
	
	var Options = {
		type:"items",
		label:"Options",
		items: {
			chartType:chartType,
			chartEffect:chartEffect,
			chartLabels:chartLabels,
			labelSticks:labelSticks,
			explodeSegment:explodeSegment,
			shadow:shadow,
			shadowDepth:shadowDepth,
			segmentBorder:segmentBorder,
			segmentBorderWidth:segmentBorderWidth,
			chartColor:chartColor,
			colores:colores
		}
	
	};
	
    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************
	  
	//******************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            //Default Sections
			dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			sorting: sortingSection,			
			Options: Options
			
        }
    };

} );

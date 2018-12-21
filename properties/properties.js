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
			}, {
				value: "test",
				label: "Personalizado"
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
	var leyendStyle = {
		type: "string",
		component: "dropdown",
		label: "Opciones de leyenda",
		ref: "leyendStyle",
		options: [{
			value: 1,
			label: "Leyenda no visible"
		}, {
			value: 2,
			label: "Leyenda con cuota"
		}, {
			value: 3,
			label: "Leyenda sin cuota"
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

	var labelSticksDefColor = {
			type: "boolean",
			component: "switch",
			label: "Color por defecto en las etiquetas ",
			ref: "labelSticksDefColor",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: true
		
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
	var variantDonutWidth = {
		type: "number",
		component: "slider",
		label: "Grosor del donut",
		ref: "variantDonutWidth",
		min: 1,
		max: 200,
		step: 1,
		defaultValue: 50
	};
						
	var legendPosH = {
		type: "number",
		component: "slider",
		label: "Posición de la leyenda - Horizontal",
		ref: "legendPosH",
		min: 1,
		max: 1500,
		step: 1,
		defaultValue: 1
	};
	var legendPosV = {
		type: "number",
		component: "slider",
		label: "Posición de la leyenda - Vetical",
		ref: "legendPosV",
		min: 1,
		max: 1500,
		step: 1,
		defaultValue: 1
	};
	var numDecimals = {
		type: "number",
		component: "slider",
		label: "Número de decimales en la cuota",
		ref: "numDecimals",
		min: 0,
		max: 5,
		step: 1,
		defaultValue: 1
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

	var explodedSegmentDist = {
		type: "number",
		component: "slider",
		label: "Distancia de los segmentos separados",
		ref: "explodedSegmentDist",
		min: 1,
		max: 100,
		step: 1,
		defaultValue: 15
	};

	var labelBold = {
		type: "boolean",
		component: "switch",
		label: "Etiqueta en negrita",
		ref: "labelBold",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Off"
		}],
		defaultValue: false
	};

	var textFontSize = {
		type: "number",
		component: "slider",
		label: "Tamaño de la fuente",
		ref: "textFontSize",
		min: 1,
		max: 30,
		step: 1,
		defaultValue: 10
	};

	var labelsSticksLength = {		
			type: "number",
			component: "slider",
			label: "Longitud de las guias",
			ref: "labelsSticksLength",
			min: 0,
			max: 50,
			step: 1,
			defaultValue: 8		
		};
	var labelsSticksLinewidth = {		
			type: "number",
			component: "slider",
			label: "Grosor de la línea",
			ref: "labelsSticksLinewidth",
			min: 1,
			max: 15,
			step: 1,
			defaultValue: 7	
		};

		var radiusValue = {		
			type: "number",
			component: "slider",
			label: "3D-Pie/Donut Radios",
			ref: "radiusValue",
			min: 1,
			max: 250,
			step: 1,
			defaultValue: 100
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
			colores:colores,
			labelSticksDefColor:labelSticksDefColor,
			labelsSticksLength:labelsSticksLength,
			labelsSticksLinewidth:labelsSticksLinewidth,
			radius:radiusValue,
			textFontSize:textFontSize,
			labelBold:labelBold,
			legendPosH:legendPosH,
			legendPosV:legendPosV,
			leyendStyle:leyendStyle,
			numDecimals:numDecimals,
			variantDonutWidth:variantDonutWidth
			//explodedSegmentDist:explodedSegmentDist
		}
	
	};
	
    // *****************************************************************************
    // Main property panel definition
    // **
    // Properties that will be returned from properties.js
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

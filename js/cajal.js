

/* The map */
var map;
var vectorLayer

function init() {
    addmarkers()

    map = new ol.Map({
        controls: ol.control.defaults({
            attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
                collapsible: true
            })
        }),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            vectorLayer
        ],
        target: document.getElementById('map'),
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });

    var popup = new ol.Overlay.Popup();
    map.addOverlay(popup);

    // display popup on click
    map.on('singleclick', function(evt) {
        popup.hide();
        popup.setOffset([0, 0]);

        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            var properties = feature.getProperties()
            info = "<h3>" + properties.name + "</h3>"
            popup.setOffset([0, -22]);
            popup.show(coordinates, info);

            var elementname = document.getElementById('labname');
            var elementleader = document.getElementById('lableader');
            var elementlocation = document.getElementById('lablocation');
            var elementwebsite = document.getElementById('labwebsite');
            var elementdescription = document.getElementById('labdescription');

            elementname.innerHTML = properties.name;
            elementleader.innerHTML = "<h4>Principal investigator: " + properties.leader + "</h4>";
            elementlocation.innerHTML = properties.location;
            elementwebsite.innerHTML = "<a href='" + properties.website + "'>" + properties.website + "</a>";
            elementdescription.innerHTML = properties.description;
        }
    });

    // change mouse cursor when over marker
    map.on('pointermove', function(e) {
        if (e.dragging) {
            $(element).popover('destroy');
            return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
}

function addmarkers() {
    /* This will read from the files and add markers for each based on location
     * It'll also create an associative array that will populate info on-click
     */
    /* Array of vector features */
    var vectorSource = new ol.source.Vector({
    });


                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-0.02231, 51.7634],
                'EPSG:4326','EPSG:3857')),
                name: 'UHBiocomputation',
                leader: 'Volker Steuber',
                location: 'University of Hertfordshire, Hatfield, United Kingdom',
                website: 'http://biocomputation.herts.ac.uk',
                description: 'The Biocomputation Research Group forms part of the Centre for Computer Science and Informatics Research (CCSIR), which is based within the Science and Technology Research Institute (STRI) at the University of Hertfordshire. Research in the Biocomputation Research Group involves the development of computational models to study biological systems, and the application of biologically-inspired machine learning algorithms for the analysis of real-world data. Members of the Biocomputation Group analyse and simulate computational models at different levels of complexity, and collaborate closely with leading experimentalists in the UK and abroad.<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-0.133625, 51.523585],
                'EPSG:4326','EPSG:3857')),
                name: 'Silver Lab',
                leader: 'Angus Silver',
                location: 'University College London, United Kingdom',
                website: 'http://silverlab.org',
                description: 'The brain gathers information about the body and the surrounding world, allowing it to build internal representations and to plan and execute movement. Our lab works on how synapses, neurons and networks transmit and process such information and perform computations. The brain areas we investigate include the cerebellum and the sensory cortex. The main aim of our work is to develop a mechanistic understanding of brain function that links the molecular, synaptic, neuronal and network levels (Neuroscience). This requires a multidisciplinary approach that combines the most powerful experimental and theoretical methods available. To achieve this we both develop and apply new optical methods for measuring rapid signalling in 3D (Microscopy) and new software tools for data acquisition, analysis and modelling (Neuroinformatics). Application of these new experimental and theoretical approaches allows us to link neuronal mechanisms to information processing, thereby bridging different levels of description of brain function.<br />',
                })
                vectorSource.addFeature(iconFeature);
                
    /* The icon style for all icons */
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'http://openlayers.org/en/v3.17.1/examples/data/icon.png'
        }))
    });

    /* Populate the layer with all markers */
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: iconStyle
    });
}

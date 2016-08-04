

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
                description: '<p>The Biocomputation Research Group forms part of the Centre for Computer Science and Informatics Research (CCSIR), which is based within the Science and Technology Research Institute (STRI) at the University of Hertfordshire. Research in the Biocomputation Research Group involves the development of computational models to study biological systems, and the application of biologically-inspired machine learning algorithms for the analysis of real-world data. Members of the Biocomputation Group analyse and simulate computational models at different levels of complexity, and collaborate closely with leading experimentalists in the UK and abroad.</p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-0.133625, 51.523585],
                'EPSG:4326','EPSG:3857')),
                name: 'Silver Lab',
                leader: 'Angus Silver',
                location: 'University College London, United Kingdom',
                website: 'http://silverlab.org',
                description: '<p>The brain gathers information about the body and the surrounding world, allowing it to build internal representations and to plan and execute movement. Our lab works on how synapses, neurons and networks transmit and process such information and perform computations. The brain areas we investigate include the cerebellum and the sensory cortex.</p> <p>The main aim of our work is to develop a mechanistic understanding of brain function that links the molecular, synaptic, neuronal and network levels (Neuroscience). This requires a multidisciplinary approach that combines the most powerful experimental and theoretical methods available. To achieve this we both develop and apply new optical methods for measuring rapid signalling in 3D (Microscopy) and new software tools for data acquisition, analysis and modelling (Neuroinformatics).</p> <p>Application of these new experimental and theoretical approaches allows us to link neuronal mechanisms to information processing, thereby bridging different levels of description of brain function.</p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([139.544066, 35.656864],
                'EPSG:4326','EPSG:3857')),
                name: 'Yamazaki lab',
                leader: 'Tadashi Yamazaki',
                location: 'The University of Electro-Communications, Tokyo',
                website: 'http://numericalbrain.org/en',
                description: '<p>Yamazaki laboratory has been engaged in theoretical/computational modeling and numerical simulation of neural networks of the brain. We have three research topics as follows</p> <ol> <li>Neuroscience, to understand how the brain works</li> <li>Computational science, to conduct computer simulation faster and reliable</li> <li>Engineering, to apply the power of neural network models for real-world problems</li> </ol> <p>We are synergistically working on neuroscience, mathematics, computational science, rehabilitation, and robotics, to better understand the brain.</p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([77.58021, 13.072373],
                'EPSG:4326','EPSG:3857')),
                name: 'Bhalla Lab',
                leader: 'Upinder S. Bhalla',
                location: 'National Centre for Biological Sciences, Bangalore',
                website: 'http://www.ncbs.res.in/bhalla',
                description: '<p>When we remember things, we activate an extensive array of events in the brain. Sensory input triggers whole-brain activity, which cascades through networks of brain cells. A torrent of electrical and chemical signals is launched in each cell, giving rise to changes in structures and connections between cells.</p> <p>A key aspect of memory is the ability to relate events that occur in sequences, such as landmarks, music, movements, or words in a sentence. We study how such sequences are formed during learning, how sequences cause changes in cells and connections, and how molecular and electrical signals encode and sustain memories.</p> <p>We use the new technique of optogenetics to monitor, as well as stimulate, brain cell activity using light. We can literally watch brain activity during learning, to see how sequences in the real world map to sequences in the brain. We replicate such sequences by projecting light patterns onto brain tissue slices, and ask how cells \'learn\'. Because these processes are so intertwined and complex, we use computer models to see how events at many levels of brain function give rise to memory. We have developed a major simulation tool called MOOSE, to build computer models from molecules to networks.</p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-73.964397, 40.807755],
                'EPSG:4326','EPSG:3857')),
                name: 'Bionet Group',
                leader: 'Aurel Lazar',
                location: 'Columbia University, New York',
                website: 'http://www.bionet.ee.columbia.edu/',
                description: '<p>Located at Columbia University\'s Department of Electrical Engineering, the Bionet Group is an interdisciplinary research team bringing together faculty and students from the biological and engineering sciences focusing on understanding the function of neural circuits, and the architecture of the fruit fly (Drosophila melanogaster) brain.</p> <p>Our research is enabled by (i) the rich array of theoretical concepts developed in the fields of communications/networking, control theory, information theory, machine learning, nonlinear dynamical systems, signal processing and systems identification, (ii) the recent dramatic increase in the availability of parallel computing resources, and (iii) the extraordinary advances in building a new generation of nanoscale brain machine interfaces.</p> <p>In order to effectively leverage these concepts/tools to advance our understanding of the functional principles underlying brain functions, we and other researchers in the biological sciences employ the constructivist paradigm from the world of engineering.</p> <p>The Bionet Group is an active and integral part of the world-class Columbia Neuroscience community and it is affiliated with the Columbia Center for Neuroengineering and Computation.</p> <p>Positions at the Bionet Group for Ph.D. students, postdoctoral researchers, and undergraduate/graduate interns are available on a rolling basis. Applicants interested in unlocking the mysteries of the brain are encouraged to send their resumes or CVs to Prof. Aurel A. Lazar. Preference will be given to applicants with strong mathematical, computational and/or neurobiological background.</p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-77.311714, 38.834752],
                'EPSG:4326','EPSG:3857')),
                name: 'Blackwell Lab',
                leader: 'Avrama Blackwell',
                location: 'George Mason University, Virginia',
                website: 'http://krasnow1.gmu.edu/CENlab/index.html',
                description: '</p>The Computational and Experimental Neuroplasticity Laboratory is a multidisciplinary research group devoted to the study of learning and memory. We are specifically interested in the biophysical and biochemical mechanisms of long term memory storage. In particular, we seek to understand the cellular events underlying the requirement for temporal proximity of stimuli to be associated, and the neural circuits involved in the behavioral expression of memory. </p><br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([6.151485, 46.243625],
                'EPSG:4326','EPSG:3857')),
                name: 'Blue Brain Project',
                leader: 'Henry Markram',
                location: 'EPFL, Lausanne',
                website: 'http://bluebrain.epfl.ch/',
                description: '<p>The goal of the Blue Brain Project is to build biologically detailed digital reconstructions and simulations of the rodent, and ultimately the human brain. The supercomputer-based reconstructions and simulations built by the project offer a radically new approach for understanding the multilevel structure and function of the brain. The project\'s novel research strategy exploits interdependencies in the experimental data to obtain dense maps of the brain, without measuring every detail of its multiple levels of organization (molecules, cells, micro-circuits, brain regions, the whole brain). This strategy allows the project to build digital reconstructions (computer models) of the brain at an unprecedented level of biological detail.  Supercomputer-based simulation of their behavior turns understanding the brain into a tractable problem, providing a new tool to study the complex interactions within different levels of brain organization and to investigate the cross-level links leading from genes to cognition.</p><br />',
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

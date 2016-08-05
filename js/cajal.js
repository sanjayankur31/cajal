

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
                geometry: new ol.geom.Point(ol.proj.transform([-0.2231, 51.7634],
                'EPSG:4326','EPSG:3857')),
                name: 'UHBiocomputation',
                leader: 'Volker Steuber',
                location: 'University of Hertfordshire, Hatfield, United Kingdom',
                website: 'http://biocomputation.herts.ac.uk',
                description: '"<p>The Biocomputation Research Group forms part of the Centre for Computer Science and Informatics Research (CCSIR), which is based within the Science and Technology Research Institute (STRI) at the University of Hertfordshire. Research in the Biocomputation Research Group involves the development of computational models to study biological systems, and the application of biologically-inspired machine learning algorithms for the analysis of real-world data. Members of the Biocomputation Group analyse and simulate computational models at different levels of complexity, and collaborate closely with leading experimentalists in the UK and abroad.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-0.133625, 51.523585],
                'EPSG:4326','EPSG:3857')),
                name: 'Silver Lab',
                leader: 'Angus Silver',
                location: 'University College London, United Kingdom',
                website: 'http://silverlab.org',
                description: '"<p>The brain gathers information about the body and the surrounding world, allowing it to build internal representations and to plan and execute movement. Our lab works on how synapses, neurons and networks transmit and process such information and perform computations. The brain areas we investigate include the cerebellum and the sensory cortex.</p> <p>The main aim of our work is to develop a mechanistic understanding of brain function that links the molecular, synaptic, neuronal and network levels (Neuroscience). This requires a multidisciplinary approach that combines the most powerful experimental and theoretical methods available. To achieve this we both develop and apply new optical methods for measuring rapid signalling in 3D (Microscopy) and new software tools for data acquisition, analysis and modelling (Neuroinformatics).</p> <p>Application of these new experimental and theoretical approaches allows us to link neuronal mechanisms to information processing, thereby bridging different levels of description of brain function.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([139.544066, 35.656864],
                'EPSG:4326','EPSG:3857')),
                name: 'Yamazaki lab',
                leader: 'Tadashi Yamazaki',
                location: 'The University of Electro-Communications, Tokyo',
                website: 'http://numericalbrain.org/en',
                description: '"<p>Yamazaki laboratory has been engaged in theoretical/computational modeling and numerical simulation of neural networks of the brain. We have three research topics as follows</p> <ol> <li>Neuroscience, to understand how the brain works</li> <li>Computational science, to conduct computer simulation faster and reliable</li> <li>Engineering, to apply the power of neural network models for real-world problems</li> </ol> <p>We are synergistically working on neuroscience, mathematics, computational science, rehabilitation, and robotics, to better understand the brain.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([77.58021, 13.072373],
                'EPSG:4326','EPSG:3857')),
                name: 'Bhalla Lab',
                leader: 'Upinder S. Bhalla',
                location: 'National Centre for Biological Sciences, Bangalore',
                website: 'http://www.ncbs.res.in/bhalla',
                description: '"<p>When we remember things, we activate an extensive array of events in the brain. Sensory input triggers whole-brain activity, which cascades through networks of brain cells. A torrent of electrical and chemical signals is launched in each cell, giving rise to changes in structures and connections between cells.</p> <p>A key aspect of memory is the ability to relate events that occur in sequences, such as landmarks, music, movements, or words in a sentence. We study how such sequences are formed during learning, how sequences cause changes in cells and connections, and how molecular and electrical signals encode and sustain memories.</p> <p>We use the new technique of optogenetics to monitor, as well as stimulate, brain cell activity using light. We can literally watch brain activity during learning, to see how sequences in the real world map to sequences in the brain. We replicate such sequences by projecting light patterns onto brain tissue slices, and ask how cells \'learn\'. Because these processes are so intertwined and complex, we use computer models to see how events at many levels of brain function give rise to memory. We have developed a major simulation tool called MOOSE, to build computer models from molecules to networks.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-73.964397, 40.807755],
                'EPSG:4326','EPSG:3857')),
                name: 'Bionet Group',
                leader: 'Aurel Lazar',
                location: 'Columbia University, New York',
                website: 'http://www.bionet.ee.columbia.edu/',
                description: '"<p>Located at Columbia University\'s Department of Electrical Engineering, the Bionet Group is an interdisciplinary research team bringing together faculty and students from the biological and engineering sciences focusing on understanding the function of neural circuits, and the architecture of the fruit fly (Drosophila melanogaster) brain.</p> <p>Our research is enabled by (i) the rich array of theoretical concepts developed in the fields of communications/networking, control theory, information theory, machine learning, nonlinear dynamical systems, signal processing and systems identification, (ii) the recent dramatic increase in the availability of parallel computing resources, and (iii) the extraordinary advances in building a new generation of nanoscale brain machine interfaces.</p> <p>In order to effectively leverage these concepts/tools to advance our understanding of the functional principles underlying brain functions, we and other researchers in the biological sciences employ the constructivist paradigm from the world of engineering.</p> <p>The Bionet Group is an active and integral part of the world-class Columbia Neuroscience community and it is affiliated with the Columbia Center for Neuroengineering and Computation.</p> <p>Positions at the Bionet Group for Ph.D. students, postdoctoral researchers, and undergraduate/graduate interns are available on a rolling basis. Applicants interested in unlocking the mysteries of the brain are encouraged to send their resumes or CVs to Prof. Aurel A. Lazar. Preference will be given to applicants with strong mathematical, computational and/or neurobiological background.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-77.311714, 38.834752],
                'EPSG:4326','EPSG:3857')),
                name: 'Blackwell Lab',
                leader: 'Avrama Blackwell',
                location: 'George Mason University, Virginia',
                website: 'http://krasnow1.gmu.edu/CENlab/index.html',
                description: '"</p>The Computational and Experimental Neuroplasticity Laboratory is a multidisciplinary research group devoted to the study of learning and memory. We are specifically interested in the biophysical and biochemical mechanisms of long term memory storage. In particular, we seek to understand the cellular events underlying the requirement for temporal proximity of stimuli to be associated, and the neural circuits involved in the behavioral expression of memory. </p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([6.151485, 46.243625],
                'EPSG:4326','EPSG:3857')),
                name: 'Blue Brain Project',
                leader: 'Henry Markram',
                location: 'EPFL, Lausanne',
                website: 'http://bluebrain.epfl.ch/',
                description: '"<p>The goal of the Blue Brain Project is to build biologically detailed digital reconstructions and simulations of the rodent, and ultimately the human brain. The supercomputer-based reconstructions and simulations built by the project offer a radically new approach for understanding the multilevel structure and function of the brain. The project\'s novel research strategy exploits interdependencies in the experimental data to obtain dense maps of the brain, without measuring every detail of its multiple levels of organization (molecules, cells, micro-circuits, brain regions, the whole brain). This strategy allows the project to build digital reconstructions (computer models) of the brain at an unprecedented level of biological detail.  Supercomputer-based simulation of their behavior turns understanding the brain into a tractable problem, providing a new tool to study the complex interactions within different levels of brain organization and to investigate the cross-level links leading from genes to cognition.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-98.575971, 29.507313],
                'EPSG:4326','EPSG:3857')),
                name: 'Bower Lab',
                leader: 'Jim Bower',
                location: 'Barshop Institute for Longevity and Aging Studies, UTHSC, San Antonio',
                website: 'http://www.barshop.uthscsa.edu/',
                description: '"<p>Imagine living with strength and vitality throughout your life span, growing older with vigor and without disability. The Barshop Institute brings together the world\'s leading scientists in aging and longevity research, and providing them with the latest technologies in the application of cutting-edge research methods, supports their drive for excellence in scientific inquiry, an essential element to bringing good health and enhanced quality of life to our aging population.</p> <p>Aging affects everyone. Never before in the history of humankind has understanding how and why we age been so important. As human life expectancy continues to increase, so must our scientific knowledge of aging processes to ensure healthy longevity, free of the disabilities brought about by age-related diseases and conditions.</p> <h4>Our Mission</h4> <p>Our mission is four-fold\: To understand the basic biology of aging; to discover the therapies that will treat and cure the diseases of aging by fostering dynamic, collaborative research; to educate and train our future scientists and clinicians; to promote public awareness of age-related issues. <p>Researchers at the Barshop Institute sustain their scientific endeavors by successfully competing for funding at the national level. The Barshop Institute supports their research through a wide range of core services and clinical facilities by sponsoring cutting-edge programs that employ advanced technologies such as genomics and proteomics, transgenic animal models, and pathological assessments.</p> <p>Faculty members of the Barshop Institute are dedicated to the training and mentoring of promising new physician-scientists and basic researchers in aging through a wide-range of educational opportunities.</p> <p>Faculty and staff members involved in community outreach programs educate health professionals and the public on timely issues regarding healthy aging.</p> <h4>Our Vision</h4> <p>This vision of a world-class center for aging research first came into focus in 1991, when Dr. Edward J. Masoro founded the UT Health Science Center\'s Aging Research and Education Center through a leadership award granted to him by the National Institutes of Health.</p> <p>In 2001, the Barshop Institute for Longevity and Aging Studies was born thanks to a generous donation from Mr. and Mrs. Sam Barshop, prominent San Antonio philanthropists. Dr. Musi and the faculty members at the Barshop Institute are extremely grateful to Mr. and Mrs. Barshop for their vision and steadfast support in helping to develop the Barshop Institute into an unparalleled center for studies of aging and age-related diseases.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([10.721535, 59.940184],
                'EPSG:4326','EPSG:3857')),
                name: 'CINPLA',
                leader: 'Marianne Fyhn',
                location: 'University of Oslo, Oslo, Norway',
                website: 'http://www.cinpla.org/',
                description: '"<p>CINPLA is a consortium for an integrated experimental, computational, and theoretical approach to address neural plasticity at multiple levels. Our scientific goal is to identify and characterize molecular, cellular, and network contributions to plasticity, and to develop computational and theoretical tools to understand these processes on multiple scales. We will achieve this by integrating experimental biology and computational modeling through collaborative PhD projects that promote interdisciplinary interactions. Further, we will develop a creative and inspiring consortium which aims to deliver groundbreaking research and develop an interdisciplinary and high-quality educational program in Neuroscience at the MN Faculty at UiO.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-1.555, 53.8067],
                'EPSG:4326','EPSG:3857')),
                name: 'Cohen Group',
                leader: 'Netta Cohen',
                location: 'University of Leeds, Leeds',
                website: 'http://www.comp.leeds.ac.uk/netta/',
                description: '"<p></p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-111.9281, 32.4242],
                'EPSG:4326','EPSG:3857')),
                name: 'Icon Lab',
                leader: 'Sharon Crook',
                location: 'Arizona State University, Arizone',
                website: 'http://stat.asu.edu/~crook/',
                description: '"<p>Modern techniques for observing and understanding the nervous system at multiple scales produce a tremendous amount of remarkably diverse data. This has led to the need for a new field of neuroinformatics, which encompasses the techniques and computational tools for data acquisition, storage, sharing, publishing, analysis, visualization, modeling and simulation. These tools are critical for integrating information across all levels and scales of neuroscience to help us understand the biophysical mechanisms that underlie neural computation and treat disease.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([9.1558, 45.1862],
                'EPSG:4326','EPSG:3857')),
                name: 'D\'Angelo Lab',
                leader: 'Egidio D\'Angelo',
                location: 'University of Pavia, Pavia',
                website: 'http://www-3.unipv.it/dsffcm/pagine/labs/dangelo/',
                description: '"<p>The main interest of the laboratory is on neuronal and synaptic properties involved in computation and learning in the CEREBELLAR NETWORK, in particular the following:</p> <ul> <li> the mechanisms and functional implications of synaptic transmission and plasticity </li> <li> the ionic basis of neuronal coding</li> <li> the spatio-temporal organization of signal processing</li> <li> cellular neuropathology. </li> </ul>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([2.132324, 48.705563],
                'EPSG:4326','EPSG:3857')),
                name: 'Davison Group',
                leader: 'Andrew Davison',
                location: 'UNIC, CNRS, Gif-sur-Yvette',
                website: 'https://www.unic.cnrs-gif.fr/',
                description: '"<p>The research led at UNIC (Dir. Yves Frégnac) is interdisciplinary, at the interface between Physics and Biology. It uses concepts from statistical physics, dynamic systems and applied mathematics to 1) guide experimental exploration of sensory processing and its plasticity, in thalamic and cortical networks, and 2) identify the synaptic and neuronal mechanisms of low-level perception. The scientific aim is to characterize the complexity of biological systems by making inferences across nested levels of integration, along bottom-up (from microscopic to macroscopic) or top-down (from macroscopic to microscopic) axes.</p> <p>The different research teams at UNIC focus on three closely linked scientific issues: 1) characterizing the synaptic and cellular mechanisms engaged in the ongoing activation state and sensory evoked neural dynamics in cortical-like structures (during development and adulthood); 2) explaining/modeling the emergence of low-level perception correlates in primary sensory cortical areas; and 3) explaining/modeling the influence of lateral (intrinsic) and top-down (extrinsic) feedback connectivities. Several sensory modalities (vision, touch and haptic sense, audition, electrosensory sense) are studied in different brain structures (brainstem, thalamus, visual, auditory and somatosensory cortices, electrosensory lobe) and species (electric fish, mouse, rat, ferret, cat). Research is based on interdisciplinary approaches, ranging from electrophysiological techniques (intracellular sharp and patch recordings, dynamic clamp in vivo and in vitro, multiple simultaneous single unit recordings and local field potentials), network functional imaging (two photon and voltage sensitive dye imaging, combined with optogenetic techniques) and psychophysical measurements to databases of correlates between structure and function, theoretical neuroscience and computational modeling, as well as statistical physics and large scale simulations.</p> <p>The work is at the interface between sensory electrophysiology, experimental psychology, cognitive sciences and brain Imaging for its experimental side, and neurogeometry, computational neurosciences, neuroinformatics and physics of complex dynamic systems for the theoretical side.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([2.3101, 48.8401],
                'EPSG:4326','EPSG:3857')),
                name: 'DiGregorio lab',
                leader: 'David DiGregorio',
                location: 'Institut Pasteur, Paris',
                website: 'http://www.ura2182.cnrs-bellevue.fr/dni/',
                description: '"<h4> Probing neuronal function with light</h4> <p>Understanding brain function requires an understanding of the communication between groups of neurons via synapses. Moreover, synaptic function is known to be altered in certain diseases and is often the site of action of clinically useful drugs. In our laboratory we study the cellular properties and molecules underlying the strength, time course, and plasticity of synaptic signaling - all parameters thought to underlie such brain functions as memory storage. To date much of our knowledge of synaptic behavior arises from electrophysiological methods such as patch-clamp. However the spatial and temporal limitations of these tools preclude a more in-depth understanding of synaptic function at single synaptic contacts. To overcome these limitations we have supplemented these classical methods with optical techniques which allow us to use light to monitor and manipulate neuronal function with submicron spatial and submillisecond temporal resolution within brain tissue. In particular we use one and two-photon imaging methods to detect synaptic function using Ca2+ indicators and neuronal integration using optical voltage probes. Our experimental objectives are to 1) characterize the detailed biophysical and cellular mechanisms regulating information transfer at single synapses, and 2) characterizing the spatial and temporal distribution of synaptic integration within single dendrites of neurons within functional networks.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([-80.5449, 43.4723],
                'EPSG:4326','EPSG:3857')),
                name: 'Eliasmith Group',
                leader: 'Chris Eliasmith',
                location: 'University of Waterloo, Ontario',
                website: 'http://ctnsrv.uwaterloo.ca/cnrglab/',
                description: '"<p>We are interested in understanding how the brain works. We research perception, action, cognition, and basic theoretical issues from a neural perspective. Most of this research is carried out by building large-scale models (usually simulating single neurons) of various brain areas. The main software tool we use and develop for this purpose is Nengo. The book How to build a brain, which summarizes much of our recent work, is now available at Amazon. We are currently offering the Nengo summer school on how to use Nengo to build large-scale brain models.</p>"<br />',
                })
                vectorSource.addFeature(iconFeature);
                
                var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([8.559715, 40.724951],
                'EPSG:4326','EPSG:3857')),
                name: 'Enrico Group',
                leader: 'Paolo Enrico',
                location: 'University of Sassari, Sardinia',
                website: 'http://www.uniss.it/',
                description: '"<p></p>"<br />',
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

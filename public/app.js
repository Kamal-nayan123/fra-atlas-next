// FRA Atlas Application JavaScript

// Application Data
const fraData = {
    national: {
        total_claims: 5123104,
        individual_claims: 4911495,
        community_claims: 211609,
        titles_distributed: 2511375,
        rejection_rate: 36.35,
        pending_rate: 14.63
    },
    states: {
        madhya_pradesh: {
            claims_received: 627000,
            titles_distributed: 294000,
            rejection_rate: 52.3,
            disposal_rate: 98.37,
            forest_area: 77700,
            tribal_population: 15316784
        },
        odisha: {
            claims_received: 720000,
            titles_distributed: 461013,
            ifr_titles: 457238,
            cfr_titles: 7813,
            rejection_rate: 20.0,
            tribal_population: 9590756
        },
        telangana: {
            claims_received: 655000,
            titles_distributed: 230735,
            recent_progress: 133920,
            tribal_population: 2750000
        },
        tripura: {
            claims_received: 128032,
            titles_distributed: 127931,
            community_titles: 101,
            tribal_population: 1166813
        }
    }
};

const villages = [
    {
        id: 1,
        name: "Jhirkapur",
        state: "Madhya Pradesh",
        district: "Dindori",
        block: "Karanjia",
        tribal_population: 890,
        total_population: 1200,
        ifr_pattas: 45,
        cfr_pattas: 2,
        lat: 22.9676,
        lng: 81.0082,
        assets: {
            water_bodies: 3,
            agricultural_land: 234.5,
            forest_cover: 456.7,
            homesteads: 89
        },
        schemes_eligible: ["PM-KISAN", "Jal Jeevan Mission", "MGNREGA"],
        priority_interventions: ["Water infrastructure", "Road connectivity"]
    },
    {
        id: 2,
        name: "Bamungaon",
        state: "Tripura",
        district: "Khowai",
        block: "Kalyanpur",
        tribal_population: 567,
        total_population: 743,
        ifr_pattas: 34,
        cfr_pattas: 1,
        lat: 24.0633,
        lng: 91.6764,
        assets: {
            water_bodies: 2,
            agricultural_land: 123.4,
            forest_cover: 267.8,
            homesteads: 67
        },
        schemes_eligible: ["PM-KISAN", "PM Awas Yojana", "Ayushman Bharat"],
        priority_interventions: ["Healthcare facility", "Skill development"]
    },
    {
        id: 3,
        name: "Kendumundi",
        state: "Odisha",
        district: "Mayurbhanj",
        block: "Jashipur",
        tribal_population: 1234,
        total_population: 1567,
        ifr_pattas: 78,
        cfr_pattas: 3,
        lat: 22.1061,
        lng: 86.4056,
        assets: {
            water_bodies: 5,
            agricultural_land: 345.6,
            forest_cover: 678.9,
            homesteads: 134
        },
        schemes_eligible: ["PM-KISAN", "MGNREGA", "PM Ujjwala"],
        priority_interventions: ["Forest protection", "Livelihood enhancement"]
    },
    {
        id: 4,
        name: "Kondapuram",
        state: "Telangana",
        district: "Adilabad",
        block: "Utnoor",
        tribal_population: 789,
        total_population: 1045,
        ifr_pattas: 56,
        cfr_pattas: 2,
        lat: 19.4978,
        lng: 79.3176,
        assets: {
            water_bodies: 4,
            agricultural_land: 234.5,
            forest_cover: 456.7,
            homesteads: 89
        },
        schemes_eligible: ["PM-KISAN", "Jal Jeevan Mission", "Digital India"],
        priority_interventions: ["Digital connectivity", "Agricultural extension"]
    }
];

const dajguaSchemes = [
    {
        name: "PM-KISAN",
        description: "Direct income support to farmers",
        benefit: "Rs. 6000 per year",
        beneficiary_contribution: "10%"
    },
    {
        name: "Jal Jeevan Mission",
        description: "Piped water supply to every rural household",
        coverage: "Functional household tap connections"
    },
    {
        name: "MGNREGA",
        description: "Employment guarantee scheme",
        coverage: "100 days guaranteed employment"
    },
    {
        name: "PM Awas Yojana",
        description: "Housing for all rural households",
        benefit: "Rs. 1.2 lakh for plains, Rs. 1.3 lakh for hilly areas"
    },
    {
        name: "Ayushman Bharat",
        description: "Health insurance coverage",
        benefit: "Rs. 5 lakh annual coverage"
    }
];

const kpiData = [
    {
        indicator: "FRA Title Distribution Rate",
        target: 75,
        current: 49.02,
        trend: "improving"
    },
    {
        indicator: "Document Digitization Progress",
        target: 100,
        current: 23.4,
        trend: "steady"
    },
    {
        indicator: "Scheme Convergence Rate",
        target: 85,
        current: 34.7,
        trend: "improving"
    },
    {
        indicator: "Village Atlas Coverage",
        target: 100,
        current: 63.2,
        trend: "rapid"
    }
];

// Global Variables
let fraMap;
let villageMarkers = [];
let currentLanguage = 'en';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeDashboard();
    initializeAtlas();
    initializeDSS();
    initializeDocumentProcessing();
    initializeLanguageToggle();
    
    // Show dashboard by default
    showSection('dashboard');
});

// Navigation Management
function initializeNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', function(e) {
        if (e.target.hasAttribute('data-section') || e.target.closest('[data-section]')) {
            e.preventDefault();
            const element = e.target.hasAttribute('data-section') ? e.target : e.target.closest('[data-section]');
            const targetSection = element.getAttribute('data-section');
            
            showSection(targetSection);
            
            // Update active nav state
            const navLinks = document.querySelectorAll('[data-section]');
            navLinks.forEach(nl => nl.classList.remove('active'));
            element.classList.add('active');
        }
    });
    
    // Handle brand link
    document.querySelector('.navbar-brand').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('dashboard');
        
        // Update nav state
        const navLinks = document.querySelectorAll('[data-section]');
        navLinks.forEach(nl => nl.classList.remove('active'));
        document.querySelector('[data-section="dashboard"]').classList.add('active');
    });
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Initialize section-specific functionality
        if (sectionName === 'atlas' && !fraMap) {
            setTimeout(initializeMap, 100);
        } else if (sectionName === 'assets') {
            setTimeout(initializeAssetMapping, 100);
        } else if (sectionName === 'analytics') {
            setTimeout(initializeAnalytics, 100);
        }
    }
}

// Dashboard Initialization
function initializeDashboard() {
    populateSchemeCards();
    createStateProgressChart();
    createClaimsDistributionChart();
}

function populateSchemeCards() {
    const schemeContainer = document.getElementById('schemeCards');
    if (!schemeContainer) return;
    
    dajguaSchemes.forEach(scheme => {
        const schemeCard = document.createElement('div');
        schemeCard.className = 'col-lg-4 col-md-6 mb-3';
        schemeCard.innerHTML = `
            <div class="scheme-overview">
                <div class="scheme-title">${scheme.name}</div>
                <div class="scheme-description">${scheme.description}</div>
                <div class="scheme-benefit"><strong>Benefit:</strong> ${scheme.benefit || scheme.coverage}</div>
            </div>
        `;
        schemeContainer.appendChild(schemeCard);
    });
}

function createStateProgressChart() {
    const canvas = document.getElementById('stateProgressChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Madhya Pradesh', 'Odisha', 'Telangana', 'Tripura'],
            datasets: [
                {
                    label: 'Claims Received',
                    data: [627000, 720000, 655000, 128032],
                    backgroundColor: '#1FB8CD',
                },
                {
                    label: 'Titles Distributed',
                    data: [294000, 461013, 230735, 127931],
                    backgroundColor: '#FFC185',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                    }
                }
            }
        }
    });
}

function createClaimsDistributionChart() {
    const canvas = document.getElementById('claimsDistChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Individual Claims', 'Community Claims'],
            datasets: [{
                data: [fraData.national.individual_claims, fraData.national.community_claims],
                backgroundColor: ['#1FB8CD', '#FFC185'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

// Atlas Map Initialization
function initializeAtlas() {
    const layerControls = document.querySelectorAll('input[type="checkbox"]');
    layerControls.forEach(control => {
        control.addEventListener('change', toggleMapLayers);
    });
    
    const villageSearch = document.getElementById('villageSearch');
    if (villageSearch) {
        villageSearch.addEventListener('input', searchVillages);
    }
    
    const stateFilter = document.getElementById('stateMapFilter');
    if (stateFilter) {
        stateFilter.addEventListener('change', filterByState);
        
        // Populate state filter options
        const states = [...new Set(villages.map(v => v.state))];
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateFilter.appendChild(option);
        });
    }
    
    const districtFilter = document.getElementById('districtFilter');
    if (districtFilter && stateFilter) {
        stateFilter.addEventListener('change', function() {
            updateDistrictFilter(this.value);
        });
    }
}

function updateDistrictFilter(selectedState) {
    const districtFilter = document.getElementById('districtFilter');
    if (!districtFilter) return;
    
    districtFilter.innerHTML = '<option value="">All Districts</option>';
    
    if (selectedState) {
        const districts = [...new Set(villages.filter(v => v.state === selectedState).map(v => v.district))];
        districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtFilter.appendChild(option);
        });
    }
}

function initializeMap() {
    const mapContainer = document.getElementById('fraMap');
    if (!mapContainer) return;
    
    fraMap = L.map('fraMap').setView([20.5937, 78.9629], 5);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(fraMap);
    
    // Add village markers
    villages.forEach(village => {
        const marker = L.marker([village.lat, village.lng])
            .bindPopup(createVillagePopup(village))
            .addTo(fraMap);
        
        marker.villageData = village;
        villageMarkers.push(marker);
        
        marker.on('click', function() {
            showVillageDetails(this.villageData);
        });
    });
}

function createVillagePopup(village) {
    return `
        <div class="village-popup">
            <h6>${village.name}</h6>
            <div class="popup-stats">
                <div class="stat"><span>State:</span><span>${village.state}</span></div>
                <div class="stat"><span>District:</span><span>${village.district}</span></div>
                <div class="stat"><span>IFR Pattas:</span><span>${village.ifr_pattas}</span></div>
                <div class="stat"><span>CFR Pattas:</span><span>${village.cfr_pattas}</span></div>
                <div class="stat"><span>Population:</span><span>${village.total_population}</span></div>
            </div>
            <button class="btn btn-primary btn-sm mt-2" onclick="showVillageDetails(villages.find(v => v.id === ${village.id}))">
                View Details
            </button>
        </div>
    `;
}

function toggleMapLayers() {
    // Simulate layer toggling
    console.log('Layer toggled');
}

function searchVillages() {
    const searchTerm = document.getElementById('villageSearch').value.toLowerCase();
    
    if (searchTerm && fraMap && villageMarkers.length > 0) {
        const matchedVillage = villages.find(v => 
            v.name.toLowerCase().includes(searchTerm) ||
            v.district.toLowerCase().includes(searchTerm) ||
            v.state.toLowerCase().includes(searchTerm)
        );
        
        if (matchedVillage) {
            fraMap.setView([matchedVillage.lat, matchedVillage.lng], 10);
            
            // Find and open the popup for the matched village
            const matchedMarker = villageMarkers.find(m => m.villageData.id === matchedVillage.id);
            if (matchedMarker) {
                matchedMarker.openPopup();
            }
        }
    }
}

function filterByState() {
    const selectedState = document.getElementById('stateMapFilter').value;
    
    if (fraMap && villageMarkers.length > 0) {
        villageMarkers.forEach(marker => {
            if (!selectedState || marker.villageData.state === selectedState) {
                marker.addTo(fraMap);
            } else {
                fraMap.removeLayer(marker);
            }
        });
        
        // Update map view if state is selected
        if (selectedState) {
            const stateVillages = villages.filter(v => v.state === selectedState);
            if (stateVillages.length > 0) {
                const bounds = L.latLngBounds(stateVillages.map(v => [v.lat, v.lng]));
                fraMap.fitBounds(bounds);
            }
        } else {
            fraMap.setView([20.5937, 78.9629], 5);
        }
    }
}

function showVillageDetails(village) {
    if (!village) return;
    
    const modalTitle = document.getElementById('villageModalTitle');
    const modalBody = document.getElementById('villageModalBody');
    const viewDSSBtn = document.getElementById('viewDSSBtn');
    
    if (!modalTitle || !modalBody || !viewDSSBtn) return;
    
    modalTitle.textContent = `${village.name}, ${village.state}`;
    
    modalBody.innerHTML = `
        <div class="village-stats">
            <div class="stat-item">
                <div class="stat-value">${village.total_population}</div>
                <div class="stat-label">Total Population</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${village.tribal_population}</div>
                <div class="stat-label">Tribal Population</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${village.ifr_pattas}</div>
                <div class="stat-label">IFR Pattas</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${village.cfr_pattas}</div>
                <div class="stat-label">CFR Pattas</div>
            </div>
        </div>
        
        <h6>Assets Overview</h6>
        <div class="row">
            <div class="col-6">
                <small class="text-muted">Agricultural Land:</small> ${village.assets.agricultural_land} hectares
            </div>
            <div class="col-6">
                <small class="text-muted">Forest Cover:</small> ${village.assets.forest_cover} hectares
            </div>
            <div class="col-6">
                <small class="text-muted">Water Bodies:</small> ${village.assets.water_bodies}
            </div>
            <div class="col-6">
                <small class="text-muted">Homesteads:</small> ${village.assets.homesteads}
            </div>
        </div>
        
        <h6 class="mt-3">Eligible Schemes</h6>
        <div class="d-flex flex-wrap">
            ${village.schemes_eligible.map(scheme => `<span class="badge bg-primary me-1 mb-1">${scheme}</span>`).join('')}
        </div>
        
        <h6 class="mt-3">Priority Interventions</h6>
        <ul class="list-unstyled">
            ${village.priority_interventions.map(intervention => `<li><i class="fas fa-check-circle text-success me-2"></i>${intervention}</li>`).join('')}
        </ul>
    `;
    
    viewDSSBtn.onclick = function() {
        showDSSForVillage(village);
    };
    
    new bootstrap.Modal(document.getElementById('villageModal')).show();
}

// DSS Initialization
function initializeDSS() {
    const dssForm = document.getElementById('dssForm');
    if (dssForm) {
        dssForm.addEventListener('submit', handleDSSSubmit);
    }
    
    const stateSelect = document.getElementById('dssState');
    if (stateSelect) {
        stateSelect.addEventListener('change', populateVillageDropdown);
    }
}

function populateVillageDropdown() {
    const selectedState = document.getElementById('dssState').value;
    const villageSelect = document.getElementById('dssVillage');
    
    if (!villageSelect) return;
    
    villageSelect.innerHTML = '<option value="">Select Village</option>';
    
    const filteredVillages = villages.filter(v => v.state === selectedState);
    filteredVillages.forEach(village => {
        const option = document.createElement('option');
        option.value = village.id;
        option.textContent = village.name;
        villageSelect.appendChild(option);
    });
}

function handleDSSSubmit(e) {
    e.preventDefault();
    const villageId = parseInt(document.getElementById('dssVillage').value);
    const village = villages.find(v => v.id === villageId);
    
    if (village) {
        showDSSRecommendations(village);
    }
}

function showDSSRecommendations(village) {
    const resultsContainer = document.getElementById('dssResults');
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = `
        <div class="village-profile">
            <h5>${village.name} Profile</h5>
            <div class="row">
                <div class="col-md-6">
                    <p><strong>District:</strong> ${village.district}</p>
                    <p><strong>Block:</strong> ${village.block}</p>
                    <p><strong>Total Population:</strong> ${village.total_population}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Tribal Population:</strong> ${village.tribal_population}</p>
                    <p><strong>IFR Pattas:</strong> ${village.ifr_pattas}</p>
                    <p><strong>CFR Pattas:</strong> ${village.cfr_pattas}</p>
                </div>
            </div>
        </div>
        
        <div class="scheme-recommendations">
            <h5>AI Recommended Schemes</h5>
            <div class="row">
                ${village.schemes_eligible.map(schemeName => {
                    const scheme = dajguaSchemes.find(s => s.name === schemeName);
                    return scheme ? `
                        <div class="col-md-6 mb-3">
                            <div class="scheme-card">
                                <div class="scheme-name">${scheme.name}</div>
                                <div class="text-muted small">${scheme.description}</div>
                                <div class="mt-2">
                                    <span class="badge bg-success">High Priority</span>
                                    <span class="badge bg-info">95% Match</span>
                                </div>
                            </div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
        </div>
        
        <div class="priority-interventions">
            <h5>Priority Interventions</h5>
            <div class="row">
                ${village.priority_interventions.map(intervention => `
                    <div class="col-md-6 mb-2">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                            <span>${intervention}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showDSSForVillage(village) {
    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('villageModal'));
    if (modal) modal.hide();
    
    // Switch to DSS section
    showSection('dss');
    
    // Update nav state
    const navLinks = document.querySelectorAll('[data-section]');
    navLinks.forEach(nl => nl.classList.remove('active'));
    document.querySelector('[data-section="dss"]').classList.add('active');
    
    // Populate and show recommendations
    setTimeout(() => {
        document.getElementById('dssState').value = village.state;
        populateVillageDropdown();
        document.getElementById('dssVillage').value = village.id;
        showDSSRecommendations(village);
    }, 100);
}

// Asset Mapping
function initializeAssetMapping() {
    createAssetClassificationChart();
}

function createAssetClassificationChart() {
    const canvas = document.getElementById('assetClassificationChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Agricultural Land', 'Forest Cover', 'Water Bodies', 'Infrastructure', 'Homesteads'],
            datasets: [{
                label: 'Detection Accuracy %',
                data: [96.3, 94.7, 98.1, 91.5, 93.2],
                backgroundColor: 'rgba(31, 184, 205, 0.2)',
                borderColor: '#1FB8CD',
                borderWidth: 2,
                pointBackgroundColor: '#1FB8CD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Document Processing
function initializeDocumentProcessing() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('documentUpload');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleFileDrop);
        fileInput.addEventListener('change', handleFileSelect);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'var(--color-bg-6)';
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'var(--color-bg-5)';
    const files = e.dataTransfer.files;
    processDocuments(files);
}

function handleFileSelect(e) {
    const files = e.target.files;
    processDocuments(files);
}

function processDocuments() {
    const extractedDataDiv = document.getElementById('extractedData');
    if (!extractedDataDiv) return;
    
    // Simulate document processing
    extractedDataDiv.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><p class="mt-2">Processing documents...</p></div>';
    
    setTimeout(() => {
        extractedDataDiv.innerHTML = `
            <div class="extraction-result">
                <h6>Document: FRA_Application_001.pdf</h6>
                <div class="extraction-field">
                    <span class="field-label">Village Name:</span>
                    <span class="field-value">Jhirkapur <span class="confidence-score">(97.3%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Applicant Name:</span>
                    <span class="field-value">Ram Kumar Gond <span class="confidence-score">(95.8%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Land Area:</span>
                    <span class="field-value">2.34 hectares <span class="confidence-score">(92.1%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Claim Type:</span>
                    <span class="field-value">Individual Forest Rights <span class="confidence-score">(98.7%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Status:</span>
                    <span class="field-value">Approved <span class="confidence-score">(96.4%)</span></span>
                </div>
            </div>
            <div class="extraction-result">
                <h6>Document: Revenue_Record_002.jpg</h6>
                <div class="extraction-field">
                    <span class="field-label">Survey Number:</span>
                    <span class="field-value">234/1A <span class="confidence-score">(89.2%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Village:</span>
                    <span class="field-value">Jhirkapur <span class="confidence-score">(94.6%)</span></span>
                </div>
                <div class="extraction-field">
                    <span class="field-label">Owner:</span>
                    <span class="field-value">Ram Kumar Gond <span class="confidence-score">(91.8%)</span></span>
                </div>
            </div>
        `;
    }, 2000);
}

// Analytics
function initializeAnalytics() {
    populateKPICards();
    createTimelineChart();
    createCoverageChart();
}

function populateKPICards() {
    const kpiContainer = document.getElementById('kpiCards');
    if (!kpiContainer) return;
    
    kpiContainer.innerHTML = '';
    
    kpiData.forEach(kpi => {
        const kpiCard = document.createElement('div');
        kpiCard.className = 'col-lg-3 col-md-6 mb-3';
        
        const trendIcon = kpi.trend === 'improving' ? 'fa-arrow-up trend-up' : 
                         kpi.trend === 'steady' ? 'fa-minus trend-steady' : 'fa-arrow-down trend-down';
        
        const valueClass = kpi.current >= kpi.target * 0.8 ? 'success' : 
                          kpi.current >= kpi.target * 0.5 ? 'warning' : 'info';
        
        kpiCard.innerHTML = `
            <div class="kpi-card">
                <div class="kpi-label">${kpi.indicator}</div>
                <div class="kpi-value ${valueClass}">${kpi.current}%</div>
                <div class="kpi-target">Target: ${kpi.target}%</div>
                <div class="trend-indicator">
                    <i class="fas ${trendIcon}"></i>
                    ${kpi.trend}
                </div>
            </div>
        `;
        kpiContainer.appendChild(kpiCard);
    });
}

function createTimelineChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Title Distribution Progress',
                data: [25.3, 32.1, 38.7, 44.2, 49.02],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function createCoverageChart() {
    const canvas = document.getElementById('coverageChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Madhya Pradesh', 'Odisha', 'Telangana', 'Tripura'],
            datasets: [{
                label: 'Village Coverage %',
                data: [45.2, 78.9, 56.7, 89.3],
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Language Toggle
function initializeLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage === 'en' ? 'हिन्दी' : 'English';
    }
    
    // In a real application, this would switch all UI text
    console.log('Language switched to:', currentLanguage);
}

// Make showVillageDetails globally accessible for popup buttons
window.showVillageDetails = showVillageDetails;
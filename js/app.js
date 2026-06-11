// ============================================
// FYB Generator — Main Application
// Multi-step form wizard with localStorage
// persistence and template preview/download
// ============================================

let STEPS = [];

const COMMON_STEPS_START = [
    {
        id: 'template-select',
        title: 'Choose Your Template',
        subtitle: 'Click to Select a design for your FYB card',
        label: 'Template'
    }
];

const COMMON_STEPS_END = [
    {
        id: 'university-info',
        title: 'University',
        subtitle: 'Your university name and logo',
        label: 'University'
    },
    {
        id: 'photo-upload',
        title: 'Upload Your Photo',
        subtitle: 'Add your best picture for the FYB card',
        label: 'Photo'
    },
    {
        id: 'preview',
        title: 'Preview & Download',
        subtitle: 'Review your FYB card and download it',
        label: 'Download'
    }
];

const TEMPLATE_FORMS = {
    'template_1': [
        {
            id: 'personal-details',
            title: 'Personal Details',
            subtitle: 'Start with your basic information',
            label: 'Personal',
            fields: [
                { name: 'surname', label: 'Surname', type: 'text', placeholder: 'e.g., DOE', required: true },
                { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'e.g., John', required: true },
                { name: 'middleName', label: 'Middle Name', type: 'text', placeholder: 'e.g., James', required: false },
                { name: 'nickName', label: 'Nick Name', type: 'text', placeholder: 'e.g., JD', required: true },
                { name: 'dob', label: 'Date of Birth', type: 'text', placeholder: 'e.g., 15th September', required: true }
            ]
        },
        {
            id: 'school-info',
            title: 'School & Organization',
            subtitle: 'Your academic details',
            label: 'School',
            fields: [
                { name: 'department', label: 'Department', type: 'text', placeholder: 'e.g., Political Science and International Studies', required: true },
                { name: 'organization', label: 'Group Name', type: 'text', placeholder: 'e.g., The Illuminators', required: true },
                { name: 'orgFullName', label: 'Organization Name', type: 'text', placeholder: 'e.g., African Society of International Studies', required: true },
                { name: 'orgAcronym', label: 'Organization Acronym', type: 'text', placeholder: 'e.g., ASIS', required: true },
                { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'e.g., International Affairs', required: false },
                { name: 'gradYear', label: 'Graduation Year', type: 'text', placeholder: 'e.g., 25', required: true }
            ]
        },
        {
            id: 'favorites',
            title: 'Favorites & Fun',
            subtitle: 'The fun stuff about you',
            label: 'Favorites',
            fields: [
                { name: 'hobbies', label: 'Hobbies', type: 'text', placeholder: 'e.g., Watching Movies, Dancing', required: true },
                { name: 'favoriteCourse', label: 'Favorite Course', type: 'text', placeholder: 'e.g., INTS 403', required: true },
                { name: 'favoriteLecturer', label: 'Favorite Lecturer', type: 'text', placeholder: 'e.g., Dr. Smith', required: true },
                { name: 'stressfulLevel', label: 'Most Stressful Level', type: 'text', placeholder: 'e.g., 300L', required: true },
                { name: 'classPals', label: 'Class Pals', type: 'text', placeholder: 'e.g., Jane and Alex', required: true },
                { name: 'classCrush', label: 'Class Crush', type: 'text', placeholder: 'e.g., Someone Special', required: false },
                { name: 'relationshipStatus', label: 'Relationship Status', type: 'text', placeholder: 'e.g., Single', required: true }
            ]
        },
        {
            id: 'extras',
            title: 'Extra Details',
            subtitle: 'A few more things to complete your profile',
            label: 'Extras',
            fields: [
                { name: 'ifNotDept', label: 'If Not Your Department, What Else?', type: 'text', placeholder: 'e.g., International Studies', required: true },
                { name: 'bestQuote', label: 'Best Quote', type: 'textarea', placeholder: 'e.g., Extra sheets? Never heard of her!', required: true },
                { name: 'instagram', label: 'Instagram Handle', type: 'text', placeholder: 'e.g., @johndoe', required: false },
                { name: 'twitter', label: 'Twitter Handle', type: 'text', placeholder: 'e.g., @johndoe', required: false },
                { name: 'skills', label: 'Skills', type: 'text', placeholder: 'e.g., Advanced Computer Proficiency', required: true }
            ]
        }
    ],
    'template_2': [
        {
            id: 't2-personal-details',
            title: 'Personal Details',
            subtitle: 'Start with your basic information',
            label: 'Personal',
            fields: [
                { name: 'firstName', label: 'First name', type: 'text', placeholder: 'e.g., John', required: true },
                { name: 'surname', label: 'Last name', type: 'text', placeholder: 'e.g., Doe', required: true },
                { name: 'middleName', label: 'Middle name', type: 'text', placeholder: 'e.g., Smith', required: false },
                { name: 'nickName', label: 'Nick name', type: 'text', placeholder: 'e.g., JD', required: true },
                { name: 'tribe', label: 'Tribe', type: 'text', placeholder: 'e.g., Yoruba', required: true },
                { name: 'stateOrigin', label: 'State of origin', type: 'text', placeholder: 'e.g., Lagos', required: true },
                { name: 'dob', label: 'Date of birth without the year', type: 'text', placeholder: 'e.g., 14th July', required: true },
                { name: 'relationshipStatus', label: 'Relationship Status', type: 'text', placeholder: 'e.g., Single', required: true }
            ]
        },
        {
            id: 't2-school-info',
            title: 'Academic Details',
            subtitle: 'Your academic information',
            label: 'Academic',
            fields: [
                { name: 'department', label: 'Department', type: 'text', placeholder: 'e.g., Automotive Engineering', required: true },
                { name: 'specialization', label: 'Specialization', type: 'text', placeholder: 'e.g., Vehicle Design', required: true },
                { name: 'gradYear', label: 'Graduation Year (e.g. 24)', type: 'text', placeholder: 'e.g., 24', required: true },
                { name: 'positionHeld', label: 'Position you held in the university', type: 'text', placeholder: 'e.g., President', required: false },
                { name: 'orgFullName', label: 'Organization name (For the position held in the school)', type: 'text', placeholder: 'e.g., AES', required: false }
            ]
        },
        {
            id: 't2-favorites',
            title: 'Favorites & Experiences',
            subtitle: 'Tell us about your likes and dislikes',
            label: 'Favorites',
            fields: [
                { name: 'stressfulLevel', label: 'Most stressful level', type: 'text', placeholder: 'e.g., 400 Level', required: true },
                { name: 'worstCourse', label: 'Most stressful course', type: 'text', placeholder: 'e.g., AUTO 401', required: true },
                { name: 'favoriteCourse', label: 'Favorite course', type: 'text', placeholder: 'e.g., AUTO 501', required: true },
                { name: 'favoriteLecturer', label: 'Favorite lecturer', type: 'text', placeholder: 'e.g., Dr. Smith', required: true },
                { name: 'ifNotDept', label: 'If not automotive, what else?', type: 'text', placeholder: 'e.g., Mechanical Engineering', required: true },
                { name: 'ifNotSchool', label: 'If not school, what else?', type: 'text', placeholder: 'e.g., Business', required: true }
            ]
        },
        {
            id: 't2-extras',
            title: 'Extra Details',
            subtitle: 'A few more things to complete your profile',
            label: 'Extras',
            fields: [
                { name: 'hobbies', label: 'Hobbies', type: 'text', placeholder: 'e.g., Football, Reading', required: true },
                { name: 'skills', label: 'Skills', type: 'text', placeholder: 'e.g., CAD Design, Programming', required: true },
                { name: 'classPals', label: 'Class Pals/Buddies', type: 'text', placeholder: 'e.g., John, Jane', required: false },
                { name: 'frequentWord', label: 'Most frequent word you use often. i.e ( school na scam )', type: 'text', placeholder: 'e.g., It is what it is', required: true },
                { name: 'bestQuote', label: 'Best quote', type: 'textarea', placeholder: 'e.g., Life is beautiful', required: true },
                { name: 'instagram', label: 'Instagram handle', type: 'text', placeholder: 'e.g., @johndoe', required: false },
                { name: 'twitter', label: 'Twitter handle', type: 'text', placeholder: 'e.g., @johndoe', required: false }
            ]
        }
    ],
    'template_3': [
        {
            id: 't3-personal-details',
            title: 'Personal Details',
            subtitle: 'Start with your basic information',
            label: 'Personal',
            fields: [
                { name: 'surname', label: 'Surname', type: 'text', placeholder: 'e.g., ABDULMUMINI', required: true },
                { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'e.g., MARIAM', required: true },
                { name: 'middleName', label: 'Middle Name', type: 'text', placeholder: 'e.g., TOSIN', required: false },
                { name: 'nickName', label: 'Nick Name (A.K.A)', type: 'text', placeholder: 'e.g., BOMA', required: true },
                { name: 'dob', label: 'Date of Birth', type: 'text', placeholder: 'e.g., 2nd November', required: true },
                { name: 'tribe', label: 'Tribe', type: 'text', placeholder: 'e.g., Yoruba', required: true },
                { name: 'stateOrigin', label: 'State of Origin', type: 'text', placeholder: 'e.g., Kwara State', required: true },
                { name: 'relationshipStatus', label: 'Relationship Status', type: 'text', placeholder: 'e.g., Dating', required: true }
            ]
        },
        {
            id: 't3-school-info',
            title: 'School & Organization',
            subtitle: 'Your academic details',
            label: 'School',
            fields: [
                { name: 'department', label: 'Department', type: 'text', placeholder: 'e.g., Department of Food Science and Technology', required: true },
                { name: 'orgFullName', label: 'Class / Group Name', type: 'text', placeholder: 'e.g., The Epicurean Class of 2026', required: true },
                { name: 'favoriteLecturer', label: 'Favorite Lecturer', type: 'text', placeholder: 'e.g., Mr Bash', required: true },
                { name: 'favoriteLevel', label: 'Favorite Level', type: 'text', placeholder: 'e.g., 400 Level', required: true },
                { name: 'toughestLevel', label: 'Toughest Level', type: 'text', placeholder: 'e.g., None', required: false },
                { name: 'ifNotDept', label: 'If Not Your Department?', type: 'text', placeholder: 'e.g., Nursing', required: true }
            ]
        },
        {
            id: 't3-favorites',
            title: 'Favorites & Personality',
            subtitle: 'Tell us about your likes and dislikes',
            label: 'Personality',
            fields: [
                { name: 'hobbies', label: 'Hobbies', type: 'text', placeholder: 'e.g., Watching Movies', required: true },
                { name: 'bestClassBuddies', label: 'Best Class Buddies', type: 'text', placeholder: 'e.g., Everyone', required: true },
                { name: 'bestQuote', label: 'Favorite Quote', type: 'textarea', placeholder: 'e.g., Kindness is never wasted.', required: true },
                { name: 'socialMedia', label: 'Social Media Handles', type: 'text', placeholder: 'e.g., @bomas32', required: false }
            ]
        }
    ]
};

// Initialize with a default structure
STEPS = [...COMMON_STEPS_START, ...TEMPLATE_FORMS['template_1'], ...COMMON_STEPS_END];

const DEFAULT_UNIVERSITY = 'Ahmadu Bello University';
const DEFAULT_LOGO_PATH = 'logos/schools/abu.png';

const App = {
    currentStep: 0,
    formData: {},
    userImage: null,
    universityLogo: null,
    departmentLogo: null,
    defaultLogoBase64: null,
    selectedTemplateId: null,
    templates: [],

    async init() {

        this.formData = Storage.loadFormData();
        this.currentStep = Storage.getCurrentStep();
        this.userImage = Storage.loadImage();
        this.universityLogo = Storage.loadUniversityLogo();
        this.departmentLogo = Storage.loadDepartmentLogo();
        this.selectedTemplateId = Storage.getSelectedTemplate();
        this.templates = await TemplateManager.loadManifest();

        if (this.selectedTemplateId) {
            const forms = TEMPLATE_FORMS[this.selectedTemplateId] || TEMPLATE_FORMS['template_1'];
            STEPS = [...COMMON_STEPS_START, ...forms, ...COMMON_STEPS_END];
        }

        // Set default university name if not set
        if (!this.formData.university) {
            this.formData.university = DEFAULT_UNIVERSITY;
            Storage.saveFormData({ university: DEFAULT_UNIVERSITY });
        }

        // Load default ABU logo
        await this.loadDefaultLogo();

        if (!this.selectedTemplateId && this.currentStep > 0) {
            this.currentStep = 0;
        }

        this.renderProgressBar();
        this.renderStep(this.currentStep);
        this.updateHeaderUI();
        let close_preview_button = document.getElementById('close_preview_button');
        if (close_preview_button) close_preview_button.style.display = 'none';
    },

    async loadDefaultLogo() {
        try {
            const response = await fetch(DEFAULT_LOGO_PATH);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.defaultLogoBase64 = e.target.result;
                    // If no custom logo saved, use default
                    if (!this.universityLogo) {
                        this.universityLogo = this.defaultLogoBase64;
                    }
                    resolve();
                };
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            console.warn('Could not load default ABU logo:', e);
        }
    },

    getEffectiveLogo() {
        return this.universityLogo || this.defaultLogoBase64 || '';
    },

    renderProgressBar() {
        const container = document.getElementById('progress-container');
        if (!container) return;
        let html = '';
        STEPS.forEach((step, index) => {
            const isActive = index === this.currentStep;
            const isCompleted = index < this.currentStep;
            html += `
                <div class="progress-step">
                    <div class="progress-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">
                        ${isCompleted ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : index + 1}
                    </div>
                    <span class="progress-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}">${step.label}</span>
                </div>
            `;
            if (index < STEPS.length - 1) {
                html += `<div class="progress-line ${isCompleted ? 'completed' : ''}"></div>`;
            }
        });
        container.innerHTML = html;
    },

    renderStep(stepIndex) {
        const container = document.getElementById('step-container');
        if (!container) return;
        Storage.saveCurrentStep(stepIndex);
        let html = '';
        const stepDef = STEPS[stepIndex];

        if (stepDef.id === 'template-select') html = this.renderTemplateSelection();
        else if (stepDef.id === 'university-info') html = this.renderUniversityStep();
        else if (stepDef.id === 'photo-upload') html = this.renderPhotoUpload();
        else if (stepDef.id === 'preview') html = this.renderPreviewStep();
        else html = this.renderFormStep(stepDef);

        container.innerHTML = html;
        container.className = 'step-enter';
        if (stepDef.fields) { this.restoreFormValues(); this.attachFormListeners(); }
        if (stepDef.id === 'university-info') this.setupUniversityStep();
        if (stepDef.id === 'photo-upload') this.attachPhotoListeners();
        if (stepDef.id === 'preview') this.loadPreview();

        this.renderProgressBar();
        this.updateHeaderUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    updateHeaderUI() {
        const hero = document.getElementById('hero-section');
        if (hero) hero.style.display = this.currentStep === 0 ? '' : 'none';
        const btn = document.getElementById('start-over-btn');
        if (btn) btn.style.display = this.currentStep > 0 ? 'inline-flex' : 'none';
    },

    // ── Step 0: Template Selection ────────────
    renderTemplateSelection() {

        let cardsHtml = '';
        this.templates.forEach(t => {
            const sel = this.selectedTemplateId === t.id;
            cardsHtml += `
                <div class="template-card ${sel ? 'selected' : ''}"
                     data-template-id="${t.id}"
                     onclick="App.selectTemplate('${t.id}')">
                    <div class="template-preview-box" style="padding: 0; background: #0f172a;">
                        <img src="${t.screenshot}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover; object-position: top;">
                    </div>
                    <div style="padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between;">
                        <div>
                            <h3 style="font-weight: 700; font-size: 16px; color: var(--gray-800);">${t.name}</h3>
                            <p style="font-size: 12px; color: var(--gray-600); margin-top: 2px;">${t.description || ''}</p>
                        </div>
                        <button class="btn-secondary" style="padding: 8px 16px; font-size: 12px;" onclick="event.stopPropagation(); App.previewTemplate('${t.id}')">Preview</button>
                    </div>
                </div>
            `;
        });

        return `
            <div class="card" style="max-width: 750px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--primary-blue);">${STEPS[0].title}</h2>
                    <p style="color: var(--gray-600); margin-top: 0.5rem;">${STEPS[0].subtitle}</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${cardsHtml}
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                    <button class="btn-primary" onclick="App.nextStep()" ${!this.selectedTemplateId ? 'disabled' : ''} id="proceed-btn">Proceed</button>
                </div>
            </div>
            <!-- Template Preview Modal -->
            <div id="template-preview-modal" onclick="App.closePreviewModal()" style="display:none; position:fixed; inset:0; z-index:1000; background:rgba(15, 23, 42, 0.9); backdrop-filter:blur(8px); padding: 2rem; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
                <button onclick="App.closePreviewModal()" style="position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; width: 44px; height: 44px; font-size: 20px; cursor: pointer; z-index: 1001; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">&#10005;</button>
                <div id="template-preview-content" onclick="event.stopPropagation()" style="max-width: 100%; max-height: 100%; display: flex; justify-content: center; align-items: center; cursor: default;"></div>
            </div>
        `;
    },

    selectTemplate(templateId) {
        this.selectedTemplateId = templateId;
        Storage.saveSelectedTemplate(templateId);

        // Dynamically rebuild the STEPS array for this template
        const forms = TEMPLATE_FORMS[templateId] || TEMPLATE_FORMS['template_1'];
        STEPS = [...COMMON_STEPS_START, ...forms, ...COMMON_STEPS_END];

        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.templateId === templateId);
        });
        const btn = document.getElementById('proceed-btn');
        if (btn) btn.disabled = false;
    },

    async previewTemplate(templateId) {
        const modal = document.getElementById('template-preview-modal');
        const content = document.getElementById('template-preview-content');
        if (!modal || !content) return;

        modal.style.display = 'flex';
        content.innerHTML = '<div style="text-align:center; padding: 3rem;"><div class="spinner"></div><p style="color:white; margin-top:1rem;">Loading preview...</p></div>';

        try {
            const tmpl = await TemplateManager.getTemplateById(templateId);
            if (!tmpl) { content.innerHTML = '<p style="color:#ef4444; text-align:center;">Template not found.</p>'; return; }

            content.innerHTML = `
                <img src="${tmpl.screenshot}" alt="${tmpl.name} Preview" style="max-width: 100%; max-height: 85vh; object-fit: contain; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            `;
        } catch (err) {
            console.error('Preview error:', err);
            content.innerHTML = '<p style="color:#ef4444; text-align:center;">Preview failed.</p>';
        }
    },

    closePreviewModal() {
        const modal = document.getElementById('template-preview-modal');
        if (modal) modal.style.display = 'none';
        let close_preview_button = document.getElementById('close_preview_button');
        if (close_preview_button) close_preview_button.style.display = 'none';
    },

    // ── Steps 1-4: Form Steps ─────────────────
    renderFormStep(stepConfig) {
        let fieldsHtml = '';
        const isTemplate1 = this.selectedTemplateId === 'template_1';
        const optionalFieldsT1 = ['specialization', 'instagram', 'twitter', 'classCrush'];

        stepConfig.fields.forEach(field => {
            let isRequired = field.required;
            if (isTemplate1 && optionalFieldsT1.includes(field.name)) {
                isRequired = false;
            }

            const tag = field.type === 'textarea'
                ? `<textarea class="form-input" id="field-${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${isRequired ? 'required' : ''}></textarea>`
                : `<input class="form-input" type="text" id="field-${field.name}" name="${field.name}" placeholder="${field.placeholder}" ${isRequired ? 'required' : ''}>`;
            fieldsHtml += `
                <div class="form-group">
                    <label class="form-label" for="field-${field.name}">
                        ${field.label} ${isRequired
                    ? '<span style="color: #ef4444;">*</span>'
                    : '<span style="color: var(--gray-400); font-weight: 400; text-transform: none;">(optional)</span>'}
                    </label>
                    ${tag}
                </div>
            `;
        });

        const isLastFormStep = STEPS[this.currentStep + 1] && STEPS[this.currentStep + 1].id === 'university-info';
        return `
            <div class="card" style="max-width: 620px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--primary-blue);">${stepConfig.title}</h2>
                    <p style="color: var(--gray-600); margin-top: 0.5rem;">${stepConfig.subtitle}</p>
                </div>
                <form id="step-form" onsubmit="return false;">${fieldsHtml}</form>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--gray-100);">
                    <button class="btn-secondary" onclick="App.prevStep()">Back</button>

                    <div class="flex gap-2 align-middle">
                        <button class="btn-danger" onclick="App.startOver()">Start Over</button>
                        <button class="btn-primary" onclick="App.nextStep()">${isLastFormStep ? 'Continue' : 'Next'}</button>
                    </div>
                </div>
            </div>
        `;
    },

    // ── Step 5: University ─────────────────────
    renderUniversityStep() {
        const uniName = this.formData.university || DEFAULT_UNIVERSITY;
        const hasLogo = !!this.universityLogo;
        const hasDeptLogo = !!this.departmentLogo;
        const isABU = uniName.toLowerCase().includes('ahmadu bello');

        const logoPreview = hasLogo
            ? `<img src="${this.universityLogo}" style="max-width: 120px; max-height: 120px; object-fit: contain; border-radius: 8px; margin: 0 auto; display: block;" alt="University Logo">`
            : `<div style="width:80px; height:80px; margin: 0 auto; background: var(--gray-200); border-radius: 16px; display:flex; align-items:center; justify-content:center;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </div>`;

        const deptLogoPreview = hasDeptLogo
            ? `<img src="${this.departmentLogo}" style="max-width: 120px; max-height: 120px; object-fit: contain; border-radius: 8px; margin: 0 auto; display: block;" alt="Department Logo">`
            : `<div style="width:80px; height:80px; margin: 0 auto; background: var(--gray-200); border-radius: 16px; display:flex; align-items:center; justify-content:center;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </div>`;

        return `
            <div class="card" style="max-width: 620px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--primary-blue);">University</h2>
                    <p style="color: var(--gray-600); margin-top: 0.5rem;">Your university name and logo for the FYB card</p>
                </div>

                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; font-size: 13px; color: #1e40af; line-height: 1.5;">
                    <strong>Note:</strong> ABU students can skip the logo upload as the Ahmadu Bello University logo is pre-loaded. Students from other universities should upload their university logo below.
                </div>

                <div class="form-group">
                    <label class="form-label" for="field-university">University Name</label>
                    <input class="form-input" type="text" id="field-university" name="university" placeholder="e.g., Ahmadu Bello University" value="${escapeHtml(uniName)}">
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">University Logo <span style="color: var(--gray-400); font-weight: 400; text-transform: none;">(optional for ABU students)</span></label>
                    <div class="upload-zone ${hasLogo ? 'has-image' : ''}" id="logo-upload-zone" style="padding: 1.5rem;">
                        ${logoPreview}
                        <p style="margin-top: 0.75rem; font-size: 13px; color: var(--gray-600); text-align: center;">${hasLogo ? 'Click or drag to change logo' : 'Click or drag to upload your university logo'}</p>
                    </div>
                    <input type="file" id="logo-input" accept="image/jpeg,image/png,image/webp,image/svg+xml" style="display: none;">
                </div>

                <div style="margin-bottom: 1.5rem;">
                    <label class="form-label">Department Logo <span style="color: var(--gray-400); font-weight: 400; text-transform: none;">(optional)</span></label>
                    <div class="upload-zone ${hasDeptLogo ? 'has-image' : ''}" id="dept-logo-upload-zone" style="padding: 1.5rem;">
                        ${deptLogoPreview}
                        <p style="margin-top: 0.75rem; font-size: 13px; color: var(--gray-600); text-align: center;">${hasDeptLogo ? 'Click or drag to change department logo' : 'Click or drag to upload your department logo'}</p>
                    </div>
                    <input type="file" id="dept-logo-input" accept="image/jpeg,image/png,image/webp,image/svg+xml" style="display: none;">
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--gray-100);">
                    <button class="btn-secondary" onclick="App.prevStep()">Back</button>
                    <button class="btn-primary" onclick="App.nextStep()">Continue to Photo</button>
                </div>
            </div>
        `;
    },

    setupUniversityStep() {
        const zone = document.getElementById('logo-upload-zone');
        const input = document.getElementById('logo-input');
        const deptZone = document.getElementById('dept-logo-upload-zone');
        const deptInput = document.getElementById('dept-logo-input');
        const uniField = document.getElementById('field-university');

        if (zone && input) {
            zone.addEventListener('click', () => input.click());
            input.addEventListener('change', e => {
                if (e.target.files && e.target.files[0]) this.handleLogoFile(e.target.files[0], 'university');
            });
            zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
            zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
            zone.addEventListener('drop', e => {
                e.preventDefault(); zone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) this.handleLogoFile(e.dataTransfer.files[0], 'university');
            });
        }

        if (deptZone && deptInput) {
            deptZone.addEventListener('click', () => deptInput.click());
            deptInput.addEventListener('change', e => {
                if (e.target.files && e.target.files[0]) this.handleLogoFile(e.target.files[0], 'department');
            });
            deptZone.addEventListener('dragover', e => { e.preventDefault(); deptZone.classList.add('dragover'); });
            deptZone.addEventListener('dragleave', () => deptZone.classList.remove('dragover'));
            deptZone.addEventListener('drop', e => {
                e.preventDefault(); deptZone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) this.handleLogoFile(e.dataTransfer.files[0], 'department');
            });
        }

        if (uniField) {
            uniField.addEventListener('input', () => {
                this.formData.university = uniField.value.trim();
                Storage.saveFormData({ university: uniField.value.trim() });
            });
        }
    },

    handleLogoFile(file, type = 'university') {
        const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (!ok.includes(file.type)) {
            this.showToast('Please upload a JPG, PNG, WEBP, or SVG image.', 'error');
            return;
        }
        if (file.size > 3 * 1024 * 1024) {
            this.showToast('Logo too large. Please use an image under 3 MB.', 'error');
            return;
        }
        const reader = new FileReader();
        reader.onload = e => {
            if (type === 'university') {
                this.universityLogo = e.target.result;
                Storage.saveUniversityLogo(this.universityLogo);
            } else {
                this.departmentLogo = e.target.result;
                Storage.saveDepartmentLogo(this.departmentLogo);
            }
            this.renderStep(this.currentStep);
        };
        reader.readAsDataURL(file);
    },

    // ── Step 6: Photo Upload ──────────────────
    renderPhotoUpload() {
        const has = !!this.userImage;
        const inner = has
            ? `<img src="${this.userImage}" class="upload-preview-img" alt="Your photo" id="photo-preview">
               <p style="margin-top: 1rem; font-size: 14px; color: var(--gray-600);">Click or drag to change photo</p>`
            : `<div style="width:64px; height:64px; margin: 0 auto 1rem auto; background: var(--gray-200); border-radius: 16px; display:flex; align-items:center; justify-content:center;">
                   <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
               </div>
               <p style="font-size: 18px; font-weight: 600; color: var(--gray-700); margin-bottom: 0.5rem;">Drag and drop your photo here</p>
               <p style="font-size: 14px; color: var(--gray-600);">or <span style="color: var(--accent-blue); font-weight: 600;">click to browse</span></p>
               <p style="font-size: 12px; color: var(--gray-400); margin-top: 1rem;">Supports JPG, PNG, WEBP (max 5MB)</p>`;
        return `
            <div class="card" style="max-width: 620px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--primary-blue);">${STEPS[6].title}</h2>
                    <p style="color: var(--gray-600); margin-top: 0.5rem;">${STEPS[6].subtitle}</p>
                </div>
                <div class="upload-zone ${has ? 'has-image' : ''}" id="upload-zone">${inner}</div>
                <input type="file" id="photo-input" accept="image/jpeg,image/png,image/webp" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--gray-100);">
                    <button class="btn-secondary" onclick="App.prevStep()">Back</button>
                    <button class="btn-primary" onclick="App.nextStep()" ${!has ? 'disabled' : ''} id="photo-next-btn">Preview FYB</button>
                </div>
            </div>
        `;
    },

    // ── Step 7: Preview & Download ────────────
    renderPreviewStep() {
        return `
            <div class="card" style="max-width: 820px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="font-size: 24px; font-weight: 700; color: var(--primary-blue);">${STEPS[7].title}</h2>
                    <p style="color: var(--gray-600); margin-top: 0.5rem;">${STEPS[7].subtitle}</p>
                </div>
                <div id="preview-loading" style="text-align: center; padding: 3rem 0;">
                    <div class="spinner"></div>
                    <p style="color: var(--gray-600); margin-top: 1rem; font-size: 15px;">Generating your FYB card...</p>
                </div>
                <div id="preview-result" style="display: none;">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <img id="preview-image" style="max-width: 100%; border-radius: 12px; box-shadow: 0 12px 40px rgba(0,0,0,0.2);" alt="FYB Preview">
                    </div>
                    <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
                        <button class="btn-yellow" onclick="App.downloadFYB()" id="download-btn">Download as PNG</button>
                        <button class="btn-primary" onclick="App.regeneratePreview()">Regenerate</button>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--gray-100);">
                    <button class="btn-secondary" onclick="App.prevStep()">Back to Edit</button>
                    <button class="btn-danger" onclick="App.startOver()">Start Over</button>
                </div>
            </div>
            <div id="template-render-area"></div>
        `;
    },

    // ── Navigation ────────────────────────────
    nextStep() {
        const currentStepDef = STEPS[this.currentStep];

        if (currentStepDef.id === 'template-select' && !this.selectedTemplateId) {
            this.showToast('Please select a template first.', 'warning'); return;
        }
        if (currentStepDef.fields) {
            if (!this.validateCurrentStep()) return;
            this.saveCurrentFormData();
        }
        if (currentStepDef.id === 'university-info') {
            // Save university name from field
            const uniField = document.getElementById('field-university');
            if (uniField) {
                this.formData.university = uniField.value.trim() || DEFAULT_UNIVERSITY;
                Storage.saveFormData({ university: this.formData.university });
            }
        }
        if (currentStepDef.id === 'photo-upload' && !this.userImage) {
            this.showToast('Please upload your photo first.', 'warning'); return;
        }
        if (this.currentStep < STEPS.length - 1) {
            this.currentStep++;
            this.renderStep(this.currentStep);
        }
    },

    prevStep() {
        const currentStepDef = STEPS[this.currentStep];

        if (currentStepDef.fields) this.saveCurrentFormData();
        if (currentStepDef.id === 'university-info') {
            const uniField = document.getElementById('field-university');
            if (uniField) {
                this.formData.university = uniField.value.trim() || DEFAULT_UNIVERSITY;
                Storage.saveFormData({ university: this.formData.university });
            }
        }
        if (this.currentStep > 0) { this.currentStep--; this.renderStep(this.currentStep); }
    },

    validateCurrentStep() {
        const step = STEPS[this.currentStep];
        if (!step.fields) return true;
        let valid = true; let firstBad = null;

        const isTemplate1 = this.selectedTemplateId === 'template_1';
        const optionalFieldsT1 = ['specialization', 'instagram', 'twitter', 'classCrush'];

        step.fields.forEach(f => {
            const el = document.getElementById(`field-${f.name}`);
            if (!el) return;

            let isRequired = f.required;
            if (isTemplate1 && optionalFieldsT1.includes(f.name)) {
                isRequired = false;
            }

            if (isRequired && !el.value.trim()) { el.classList.add('error'); valid = false; if (!firstBad) firstBad = el; }
            else el.classList.remove('error');
        });
        if (firstBad) { firstBad.focus(); this.showToast('Please fill in all required fields.', 'warning'); }
        return valid;
    },

    saveCurrentFormData() {
        const step = STEPS[this.currentStep];
        if (!step.fields) return;
        const data = {};
        step.fields.forEach(f => { const el = document.getElementById(`field-${f.name}`); if (el) data[f.name] = el.value.trim(); });
        this.formData = { ...this.formData, ...data };
        Storage.saveFormData(data);
    },

    restoreFormValues() {
        const step = STEPS[this.currentStep];
        if (!step.fields) return;
        step.fields.forEach(f => { const el = document.getElementById(`field-${f.name}`); if (el && this.formData[f.name]) el.value = this.formData[f.name]; });
    },

    attachFormListeners() {
        const step = STEPS[this.currentStep];
        if (!step.fields) return;
        step.fields.forEach(f => {
            const el = document.getElementById(`field-${f.name}`);
            if (!el) return;
            el.addEventListener('input', () => {
                el.classList.remove('error');
                this.formData[f.name] = el.value.trim();
                Storage.saveFormData({ [f.name]: el.value.trim() });
            });
        });
    },

    attachPhotoListeners() {
        const zone = document.getElementById('upload-zone');
        const input = document.getElementById('photo-input');
        if (!zone || !input) return;
        zone.addEventListener('click', () => input.click());
        input.addEventListener('change', e => { if (e.target.files && e.target.files[0]) this.handlePhotoFile(e.target.files[0]); });
        zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
        zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('dragover'); if (e.dataTransfer.files && e.dataTransfer.files[0]) this.handlePhotoFile(e.dataTransfer.files[0]); });
    },

    handlePhotoFile(file) {
        const ok = ['image/jpeg', 'image/png', 'image/webp'];
        if (!ok.includes(file.type)) { this.showToast('Please upload a JPG, PNG, or WEBP image.', 'error'); return; }
        if (file.size > 5 * 1024 * 1024) { this.showToast('Image too large. Please use an image under 5 MB.', 'error'); return; }
        const reader = new FileReader();
        reader.onload = e => {
            this.userImage = e.target.result;
            if (!Storage.saveImage(this.userImage)) { this.showToast('Image too large to save locally.', 'error'); return; }
            this.renderStep(this.currentStep);
        };
        reader.readAsDataURL(file);
    },

    async loadPreview() {
        const loading = document.getElementById('preview-loading');
        const result = document.getElementById('preview-result');
        const img = document.getElementById('preview-image');
        if (!loading || !result) return;
        try {
            const tmpl = await TemplateManager.getTemplateById(this.selectedTemplateId);
            if (!tmpl) { loading.innerHTML = '<p style="color:#ef4444;">Template not found.</p>'; return; }
            let html = await TemplateManager.loadTemplateHTML(tmpl.file);
            if (!html) { loading.innerHTML = '<p style="color:#ef4444;">Failed to load template file.</p>'; return; }

            let dataToInject = { ...this.formData };
            if (this.selectedTemplateId === 'template_1') {
                if (!dataToInject.classCrush || dataToInject.classCrush.trim() === '') {
                    dataToInject.classCrush = 'None';
                }
                if (!dataToInject.specialization || dataToInject.specialization.trim() === '') {
                    dataToInject.specialization = 'None';
                }
            } else if (this.selectedTemplateId === 'template_2') {
                const optionalFieldsT2 = ['middleName', 'positionHeld', 'orgFullName', 'classPals', 'instagram', 'twitter'];
                optionalFieldsT2.forEach(field => {
                    if (!dataToInject[field] || dataToInject[field].trim() === '') {
                        dataToInject[field] = 'None';
                    }
                });
                
                // Hide middleName if missing instead of showing 'None'
                if (!dataToInject.middleName || dataToInject.middleName.trim() === 'None') {
                    dataToInject.middleName = ''; // will be empty in stacked text
                }
            } else if (this.selectedTemplateId === 'template_3') {
                const optionalFieldsT3 = ['toughestLevel'];
                optionalFieldsT3.forEach(field => {
                    if (!dataToInject[field] || dataToInject[field].trim() === '') {
                        dataToInject[field] = 'None';
                    }
                });

                // Hide middleName if missing instead of showing 'None'
                if (!dataToInject.middleName || dataToInject.middleName.trim() === '') {
                    dataToInject.middleName = ''; // will be empty in stacked text
                }

                // Set default for social media if missing
                if (!dataToInject.socialMedia || dataToInject.socialMedia.trim() === '') {
                    dataToInject.socialMedia = 'N/A';
                }
            }

            html = TemplateManager.injectData(html, dataToInject, this.userImage, this.getEffectiveLogo(), this.departmentLogo);

            const area = document.getElementById('template-render-area');
            area.innerHTML = html;

            if (this.selectedTemplateId === 'template_1') {
                const specSec = area.querySelector('#section-specialization');
                if (specSec && (!this.formData.specialization || this.formData.specialization.trim() === '')) {
                    specSec.remove();
                }
                const igSec = area.querySelector('#section-instagram');
                if (igSec && (!this.formData.instagram || this.formData.instagram.trim() === '')) {
                    igSec.remove();
                }
                const twSec = area.querySelector('#section-twitter');
                if (twSec && (!this.formData.twitter || this.formData.twitter.trim() === '')) {
                    twSec.remove();
                }
                const deptSec = area.querySelector('#section-dept-logo');
                if (deptSec && !this.departmentLogo) {
                    deptSec.remove();
                }
            } else if (this.selectedTemplateId === 'template_3') {
                const smSec = area.querySelector('#t3-social-media');
                if (smSec && (!this.formData.socialMedia || this.formData.socialMedia.trim() === '')) {
                    smSec.style.display = 'none';
                }
            } else if (this.selectedTemplateId === 'template_2' || this.selectedTemplateId === 'template_test') {
                const posSec = area.querySelector('#section-position');
                if (posSec && (!this.formData.positionHeld || this.formData.positionHeld.trim() === '')) {
                    posSec.remove();
                }
                const palSec = area.querySelector('#section-class-pals');
                if (palSec && (!this.formData.classPals || this.formData.classPals.trim() === '')) {
                    palSec.remove();
                }
                const igSec = area.querySelector('#section-instagram');
                if (igSec && (!this.formData.instagram || this.formData.instagram.trim() === '')) {
                    igSec.remove();
                }
                const twSec = area.querySelector('#section-twitter');
                if (twSec && (!this.formData.twitter || this.formData.twitter.trim() === '')) {
                    twSec.remove();
                }
                const deptSec = area.querySelector('#section-dept-logo');
                if (deptSec && !this.departmentLogo) {
                    deptSec.remove();
                }
            }
            await document.fonts.ready;
            await new Promise(r => setTimeout(r, 1500));
            const el = area.querySelector('#fyb-template') || area.firstElementChild;
            if (!el) { loading.innerHTML = '<p style="color:#ef4444;">Template rendering failed.</p>'; return; }
            const canvas = await PreviewManager.generatePreview(el);
            if (canvas) { img.src = PreviewManager.getPreviewDataURL(); loading.style.display = 'none'; result.style.display = 'block'; }
            else { loading.innerHTML = '<p style="color:#ef4444;">Preview generation failed.</p>'; }
        } catch (err) {
            console.error('Preview error:', err);
            loading.innerHTML = '<p style="color:#ef4444;">An error occurred. Please try again.</p>';
        }
    },

    async regeneratePreview() {
        const loading = document.getElementById('preview-loading');
        const result = document.getElementById('preview-result');
        if (!loading || !result) return;
        loading.innerHTML = '<div class="spinner"></div><p style="color: var(--gray-600); margin-top: 1rem;">Regenerating...</p>';
        loading.style.display = 'block'; result.style.display = 'none';
        PreviewManager.clearPreview();
        await this.loadPreview();
    },

    downloadFYB() {
        const s = this.formData.surname || 'Student';
        const f = this.formData.firstName || '';
        PreviewManager.downloadPNG(`FYB-${s}-${f}`.replace(/\s+/g, '_') + '.png');
    },

    startOver() {
        if (!confirm('Are you sure? All your data will be cleared.')) return;
        Storage.clearAll();
        this.formData = {}; this.userImage = null; this.universityLogo = null; this.departmentLogo = null;
        this.selectedTemplateId = null; this.currentStep = 0;
        PreviewManager.clearPreview();
        // Reload default university
        this.formData.university = DEFAULT_UNIVERSITY;
        Storage.saveFormData({ university: DEFAULT_UNIVERSITY });
        if (this.defaultLogoBase64) this.universityLogo = this.defaultLogoBase64;
        this.renderStep(0);

        let close_preview_button = document.getElementById('close_preview_button');
        if (close_preview_button) close_preview_button.style.display = 'none';
    },

    showToast(message, type) {
        document.querySelectorAll('.fyb-toast').forEach(t => t.remove());
        const toast = document.createElement('div');
        toast.className = 'fyb-toast';
        const bg = type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#22c55e';
        const textColor = type === 'warning' ? '#1e293b' : '#fff';
        toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:${bg};color:${textColor};padding:14px 28px;border-radius:12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:500;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.25);animation:fadeInUp 0.3s ease-out;max-width:90vw;text-align:center;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
    }
};


document.addEventListener('DOMContentLoaded', () => App.init());

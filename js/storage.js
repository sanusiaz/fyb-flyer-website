// ============================================
// FYB Storage Manager
// Handles all localStorage operations for
// form data persistence across page refreshes
// ============================================

const FYB_KEYS = {
    FORM_DATA: 'fyb_form_data',
    CURRENT_STEP: 'fyb_current_step',
    USER_IMAGE: 'fyb_user_image',
    UNIVERSITY_LOGO: 'fyb_university_logo',
    DEPARTMENT_LOGO: 'fyb_department_logo',
    SELECTED_TEMPLATE: 'fyb_selected_template'
};

const Storage = {
    /**
     * Save form field data (merges with existing data)
     */
    saveFormData(data) {
        try {
            const existing = this.loadFormData();
            const merged = { ...existing, ...data };
            localStorage.setItem(FYB_KEYS.FORM_DATA, JSON.stringify(merged));
            return true;
        } catch (e) {
            console.error('Failed to save form data:', e);
            return false;
        }
    },

    /**
     * Load all saved form data
     */
    loadFormData() {
        try {
            const data = localStorage.getItem(FYB_KEYS.FORM_DATA);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Failed to load form data:', e);
            return {};
        }
    },

    /**
     * Save current wizard step index
     */
    saveCurrentStep(step) {
        localStorage.setItem(FYB_KEYS.CURRENT_STEP, step.toString());
    },

    /**
     * Get saved wizard step index (defaults to 0)
     */
    getCurrentStep() {
        const step = localStorage.getItem(FYB_KEYS.CURRENT_STEP);
        return step !== null ? parseInt(step, 10) : 0;
    },

    /**
     * Save user photo as base64 string
     * Returns false if image is too large for localStorage
     */
    saveImage(base64String) {
        try {
            localStorage.setItem(FYB_KEYS.USER_IMAGE, base64String);
            return true;
        } catch (e) {
            console.error('Image too large for localStorage:', e);
            return false;
        }
    },

    /**
     * Load saved user photo (base64 string)
     */
    loadImage() {
        return localStorage.getItem(FYB_KEYS.USER_IMAGE);
    },

    /**
     * Save university logo as base64 string
     */
    saveUniversityLogo(base64String) {
        try {
            localStorage.setItem(FYB_KEYS.UNIVERSITY_LOGO, base64String);
            return true;
        } catch (e) {
            console.error('University logo too large for localStorage:', e);
            return false;
        }
    },

    /**
     * Load saved university logo (base64 string)
     */
    loadUniversityLogo() {
        return localStorage.getItem(FYB_KEYS.UNIVERSITY_LOGO);
    },

    /**
     * Save department logo as base64 string
     */
    saveDepartmentLogo(base64String) {
        try {
            localStorage.setItem(FYB_KEYS.DEPARTMENT_LOGO, base64String);
            return true;
        } catch (e) {
            console.error('Department logo too large for localStorage:', e);
            return false;
        }
    },

    /**
     * Load saved department logo (base64 string)
     */
    loadDepartmentLogo() {
        return localStorage.getItem(FYB_KEYS.DEPARTMENT_LOGO);
    },

    /**
     * Save selected template ID
     */
    saveSelectedTemplate(templateId) {
        localStorage.setItem(FYB_KEYS.SELECTED_TEMPLATE, templateId);
    },

    /**
     * Get selected template ID
     */
    getSelectedTemplate() {
        return localStorage.getItem(FYB_KEYS.SELECTED_TEMPLATE);
    },

    /**
     * Clear all saved data (full reset)
     */
    clearAll() {
        Object.values(FYB_KEYS).forEach(key => localStorage.removeItem(key));
    },

    /**
     * Get a single field value by name
     */
    getField(fieldName) {
        const data = this.loadFormData();
        return data[fieldName] || '';
    }
};

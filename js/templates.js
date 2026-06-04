// ============================================
// FYB Template Manager
// Loads template manifest and HTML files,
// injects dynamic user data into placeholders
// ============================================

const TemplateManager = {
    manifest: null,

    /**
     * Load the template manifest JSON
     */
    async loadManifest() {
        if (this.manifest) return this.manifest;
        try {
            const response = await fetch('templates/manifest.json');
            if (!response.ok) throw new Error('Manifest not found');
            this.manifest = await response.json();
            return this.manifest;
        } catch (e) {
            console.error('Failed to load template manifest:', e);
            return [];
        }
    },

    /**
     * Load a template's HTML content by filename
     */
    async loadTemplateHTML(fileName) {
        try {
            const response = await fetch(`templates/${fileName}?v=${new Date().getTime()}`);
            if (!response.ok) throw new Error(`Template ${fileName} not found`);
            return await response.text();
        } catch (e) {
            console.error('Failed to load template:', fileName, e);
            return null;
        }
    },

    /**
     * Replace all {{placeholder}} tokens in template HTML with actual data
     */
    injectData(templateHtml, formData, imageBase64, universityLogoBase64, departmentLogoBase64) {
        let result = templateHtml;

        // Replace all {{fieldName}} placeholders with form data
        for (const [key, value] of Object.entries(formData)) {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            result = result.replace(regex, escapeHtml(value || ''));
        }

        // Replace photo placeholder with base64 data URI
        if (imageBase64) {
            result = result.replace(/\{\{photo\}\}/g, imageBase64);
        }

        // Replace university logo placeholder
        if (universityLogoBase64) {
            result = result.replace(/\{\{universityLogo\}\}/g, universityLogoBase64);
        }

        // Replace department logo placeholder
        if (departmentLogoBase64) {
            result = result.replace(/\{\{departmentLogo\}\}/g, departmentLogoBase64);
        } else {
            // Remove the image element or placeholder if not provided
            result = result.replace(/<img[^>]*src="\{\{departmentLogo\}\}"[^>]*>/g, '');
        }

        // Remove any remaining unfilled placeholders
        result = result.replace(/\{\{[^}]+\}\}/g, '');

        return result;
    },

    /**
     * Find a template in the manifest by ID
     */
    async getTemplateById(templateId) {
        const manifest = await this.loadManifest();
        return manifest.find(t => t.id === templateId) || null;
    },

    /**
     * Get the list of fields required by a template
     */
    async getTemplateFields(templateId) {
        const template = await this.getTemplateById(templateId);
        return template ? template.fields : [];
    }
};

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

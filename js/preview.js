// ============================================
// FYB Preview & Download Manager
// Uses html2canvas to render templates as PNG
// ============================================

const PreviewManager = {
    currentCanvas: null,

    /**
     * Generate a canvas preview from a DOM element
     * @param {HTMLElement} element - The template container element
     * @returns {HTMLCanvasElement|null}
     */
    async generatePreview(element) {
        try {
            // Wait for fonts and images to fully load
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 800));

            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
                onclone: function(clonedDoc) {
                    // Ensure the cloned element is visible for rendering
                    const clonedEl = clonedDoc.getElementById(element.id);
                    if (clonedEl) {
                        clonedEl.style.display = 'block';
                        clonedEl.style.position = 'static';
                    }
                }
            });

            this.currentCanvas = canvas;
            return canvas;
        } catch (e) {
            console.error('Failed to generate preview:', e);
            return null;
        }
    },

    /**
     * Download the current preview as a PNG file
     * @param {string} fileName - The download filename
     */
    downloadPNG(fileName) {
        if (!this.currentCanvas) {
            alert('Please generate a preview first.');
            return;
        }

        this.currentCanvas.toBlob((blob) => {
            if (!blob) {
                alert('Failed to create image. Please try again.');
                return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName || 'fyb-card.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 'image/png');
    },

    /**
     * Get the preview as a data URL (for display in an img tag)
     */
    getPreviewDataURL() {
        if (!this.currentCanvas) return null;
        return this.currentCanvas.toDataURL('image/png');
    },

    /**
     * Check if a preview has been generated
     */
    hasPreview() {
        return this.currentCanvas !== null;
    },

    /**
     * Clear the current preview
     */
    clearPreview() {
        this.currentCanvas = null;
    }
};

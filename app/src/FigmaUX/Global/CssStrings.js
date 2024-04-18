/**
 * Build a CSS string for font size based on the provided size and screen type.
 * @param {string} size - The size of the space. Must be one of: 'small', 'regular', 'medium'.
 * @param {boolean} isMobile - Indicates if the screen is a mobile device.
 * @param {boolean} isTablet - Indicates if the screen is a tablet device.
 * @returns {string} The CSS string for the font size.
 */
function buildSpaceSizeCssString(size, isMobile, isTablet) {
  return `var(--space-${size}-${isMobile ? 'mobile' : isTablet ? 'tablet' : 'pc'})`
}

function buildCalculatedCssString(originalVarString, operation, operand) {
  return `calc(${originalVarString}${operation}${operand})`;
}

/**
 * Build a CSS string for font size based on the provided size and screen type.
 * @param {string} size - The size of the font. Must be one of: 'tiny', 'small', 'regular', 'medium', 'strong', 'big', 'huge'.
 * @param {boolean} isMobile - Indicates if the screen is a mobile device.
 * @param {boolean} isTablet - Indicates if the screen is a tablet device.
 * @returns {string} The CSS string for the font size.
 */
function buildFontSizeCssString(size, isMobile, isTablet) {
  return `var(--font-size-${size}-${isMobile ? 'mobile' : isTablet ? 'tablet' : 'pc'})`
}

export {buildSpaceSizeCssString, buildFontSizeCssString, buildCalculatedCssString};
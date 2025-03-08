/**
 * Validation utilities for AppTweak data
 */

/**
 * Validates app details data structure
 * @param appDetails - The app details object to validate
 * @returns Validated data with validation status
 */
export function validateAppDetails(appDetails: any) {
  if (!appDetails || typeof appDetails !== 'object') {
    throw new Error('Invalid app details: Data is missing or invalid format');
  }
  
  // Check for required fields
  const requiredFields = ['id', 'name', 'platform', 'developer_name'];
  const missingFields = requiredFields.filter(field => !appDetails[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Validate field types
  if (typeof appDetails.id !== 'string' || !appDetails.id.trim()) {
    throw new Error('Invalid app ID');
  }
  
  if (typeof appDetails.name !== 'string' || !appDetails.name.trim()) {
    throw new Error('Invalid app name');
  }
  
  if (!['ios', 'android'].includes(appDetails.platform)) {
    throw new Error(`Invalid platform: ${appDetails.platform}`);
  }
  
  return {
    isValid: true,
    data: appDetails,
    warnings: [] // Will contain any non-critical validation warnings
  };
}

/**
 * Validates app ID format
 * @param appId - The app ID to validate
 * @param platform - The platform (ios/android)
 */
export function validateAppId(appId: string, platform: string) {
  if (!appId || typeof appId !== 'string') {
    throw new Error('Invalid app ID: must be a non-empty string');
  }

  if (!['ios', 'android'].includes(platform)) {
    throw new Error('Invalid platform: must be "ios" or "android"');
  }

  // iOS app IDs are typically numeric
  // Android app IDs typically follow the reverse domain name pattern
  if (platform === 'ios') {
    if (!/^\d+$/.test(appId)) {
      throw new Error('Invalid iOS app ID format: must be numeric');
    }
  } else if (platform === 'android') {
    if (!/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(appId)) {
      throw new Error('Invalid Android app ID format: must follow package name pattern');
    }
  }
}

/**
 * Validates multiple app IDs
 * @param appIds - Array of app IDs to validate
 * @param platform - The platform (ios/android)
 */
export function validateAppIds(appIds: string[], platform: string) {
  if (!Array.isArray(appIds) || appIds.length === 0) {
    throw new Error('Invalid app IDs: must be a non-empty array');
  }
  
  appIds.forEach(appId => validateAppId(appId, platform));
}

/**
 * Validates keyword data structure
 * @param keywordData - The keyword data to validate
 * @returns Validated keyword data
 */
export function validateKeywordData(keywordData: any) {
  // Check for null or undefined data
  if (!keywordData || !Array.isArray(keywordData.keywords)) {
    throw new Error('Invalid keyword data structure');
  }
  
  // Verify essential fields for each keyword
  keywordData.keywords.forEach((keyword: any) => {
    if (!keyword.term || keyword.volume === undefined || keyword.difficulty === undefined) {
      throw new Error(`Missing required fields for keyword: ${JSON.stringify(keyword)}`);
    }
    
    // Validate numerical ranges
    if (keyword.volume < 0 || keyword.difficulty < 0 || keyword.difficulty > 100) {
      throw new Error(`Invalid numerical ranges for keyword: ${JSON.stringify(keyword)}`);
    }
  });
  
  return keywordData;
}

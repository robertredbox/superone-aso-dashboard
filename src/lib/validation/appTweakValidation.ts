// Validation functions for AppTweak data
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

export function validateAppId(appId: string, platform: string) {
  if (!appId || typeof appId !== 'string') {
    throw new Error('Invalid app ID: Must be a non-empty string');
  }
  
  // Different validation for iOS vs Android
  if (platform === 'ios') {
    // iOS app IDs are typically numeric
    if (!/^\d+$/.test(appId)) {
      throw new Error('Invalid iOS app ID format: Must be numeric');
    }
  } else if (platform === 'android') {
    // Android package names follow reverse domain name notation
    if (!/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/.test(appId)) {
      throw new Error('Invalid Android package name format');
    }
  } else {
    throw new Error(`Invalid platform: ${platform}`);
  }
  
  return true;
}

export function validateAppIds(appIds: string[], platform: string) {
  if (!Array.isArray(appIds)) {
    throw new Error('Invalid app IDs: Must be an array');
  }
  
  appIds.forEach(appId => validateAppId(appId, platform));
  return true;
}

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

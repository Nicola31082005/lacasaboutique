// GitHub API utilities for committing data file changes

const GITHUB_API_BASE = "https://api.github.com";

// Storage keys
const TOKEN_KEY = "github-admin-token";
const REPO_KEY = "github-admin-repo";

/**
 * Get stored GitHub token
 */
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store GitHub token
 */
export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Clear stored token
 */
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Get stored repository info
 */
export const getStoredRepo = () => {
  const repo = localStorage.getItem(REPO_KEY);
  return repo ? JSON.parse(repo) : null;
};

/**
 * Store repository info
 */
export const storeRepo = (owner, repo) => {
  localStorage.setItem(REPO_KEY, JSON.stringify({ owner, repo }));
};

/**
 * Validate GitHub token by fetching user info
 */
export const validateToken = async (token) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return { valid: false, error: "Invalid token" };
    }

    const user = await response.json();
    return { valid: true, user };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

/**
 * Get list of user's repositories
 */
export const getUserRepos = async (token) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/user/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repos:", error);
    throw error;
  }
};

/**
 * Get file content from repository
 */
export const getFileContent = async (token, owner, repo, path) => {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${path}`);
    }

    const data = await response.json();
    // Content is base64 encoded
    const content = atob(data.content);
    return {
      content,
      sha: data.sha,
    };
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};

/**
 * Update/create a file in the repository
 */
export const updateFile = async (
  token,
  owner,
  repo,
  path,
  content,
  message,
  sha = null
) => {
  try {
    const body = {
      message,
      content: btoa(unescape(encodeURIComponent(content))), // Handle UTF-8 properly
      branch: "main", // Default branch
    };

    // If updating existing file, include SHA
    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update file");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

/**
 * Generate rooms.js file content from rooms data
 */
export const generateRoomsFileContent = (rooms, roomTypes, roomAmenities) => {
  const roomTypesStr = `export const roomTypes = ${JSON.stringify(roomTypes, null, 2)};`;

  const roomAmenitiesStr = `export const roomAmenities = ${JSON.stringify(roomAmenities, null, 2)};`;

  // For rooms, we need to convert amenity references back to roomAmenities.X format
  const roomsWithAmenityRefs = rooms.map((room) => ({
    ...room,
    amenities: room.amenities.map(
      (a) =>
        `__AMENITY_REF__roomAmenities.${Object.keys(roomAmenities).find((key) => roomAmenities[key].id === a.id)}__END_REF__`
    ),
  }));

  let roomsStr = `export const rooms = ${JSON.stringify(roomsWithAmenityRefs, null, 2)};`;

  // Replace string amenity refs with actual references
  roomsStr = roomsStr.replace(
    /"__AMENITY_REF__(roomAmenities\.[A-Z_]+)__END_REF__"/g,
    "$1"
  );

  // Also need to handle roomTypes references
  rooms.forEach((room) => {
    const typeKey = Object.keys(roomTypes).find(
      (key) => roomTypes[key] === room.type
    );
    if (typeKey) {
      roomsStr = roomsStr.replace(
        `"type": "${room.type}"`,
        `"type": roomTypes.${typeKey}`
      );
    }
  });

  const helperFunctions = `
// Helper functions
export const getRoomsByType = (type) => {
  return rooms.filter((room) => room.type === type);
};

export const getRooms = () => {
  return rooms;
};

export const getRoomById = (id) => {
  return rooms.find((room) => room.id === id);
};

export const getRoomsByPriceRange = (minPrice, maxPrice) => {
  return rooms.filter(
    (room) =>
      room.pricing.basePrice >= minPrice && room.pricing.basePrice <= maxPrice
  );
};

export default rooms;`;

  return `${roomTypesStr}\n\n${roomAmenitiesStr}\n\n${roomsStr}\n${helperFunctions}\n`;
};

/**
 * Generate hotelInfo.js file content
 */
export const generateHotelInfoFileContent = (hotelInfo) => {
  return `export const hotelInfo = ${JSON.stringify(hotelInfo, null, 2)};

export default hotelInfo;
`;
};

/**
 * Generate amenities.js file content
 */
export const generateAmenitiesFileContent = (
  amenityCategories,
  hotelAmenities
) => {
  const categoriesStr = `export const amenityCategories = ${JSON.stringify(amenityCategories, null, 2)};`;

  // Convert category references back
  const amenitiesWithRefs = hotelAmenities.map((amenity) => ({
    ...amenity,
    category: `__CAT_REF__amenityCategories.${Object.keys(amenityCategories).find((key) => amenityCategories[key] === amenity.category)}__END_REF__`,
  }));

  let amenitiesStr = `export const hotelAmenities = ${JSON.stringify(amenitiesWithRefs, null, 2)};`;
  amenitiesStr = amenitiesStr.replace(
    /"__CAT_REF__(amenityCategories\.[A-Z_]+)__END_REF__"/g,
    "$1"
  );

  const helperFunctions = `
// Helper functions
export const getAmenitiesByCategory = (category) => {
  return hotelAmenities.filter((amenity) => amenity.category === category);
};

export const getAmenityById = (id) => {
  return hotelAmenities.find((amenity) => amenity.id === id);
};

export const getFeaturedAmenities = () => {
  return hotelAmenities.filter((amenity) =>
    ["wellness", "restaurant", "wifi"].includes(amenity.id)
  );
};

export default hotelAmenities;`;

  return `${categoriesStr}\n\n${amenitiesStr}\n${helperFunctions}\n`;
};

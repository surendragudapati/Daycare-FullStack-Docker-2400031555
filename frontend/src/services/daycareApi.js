
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8081"
).replace(/\/+$/, "");

// Common API request handler
async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body
          ? { "Content-Type": "application/json" }
          : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      `Could not connect to the backend at ${API_BASE_URL}. ` +
      "Make sure your Spring Boot server is running."
    );
  }

  if (!response.ok) {
    let detail = "";

    try {
      detail = await response.text();
    } catch {
      // Use the default error message if the response body is unavailable.
    }

    throw new Error(
      detail ||
      `The backend returned an HTTP ${response.status} error.`
    );
  }

  // Handle responses without a body
  if (response.status === 204) {
    return null;
  }

  // Handle other successful responses
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

// GET: Retrieve all daycare centers
export function getCenters() {
  return request("/daycare/displayall");
}

// POST: Add a daycare center
export function createCenter(center) {
  return request("/daycare/add", {
    method: "POST",
    body: JSON.stringify(center),
  });
}

// POST: Update an existing daycare center
export function updateCenter(id, center) {
  if (id === undefined || id === null || id === "") {
    throw new Error(
      "Cannot update daycare center: ID is missing."
    );
  }

  return request(`/daycare/update/${encodeURIComponent(id)}`, {
    method: "POST",
    body: JSON.stringify(center),
  });
}

// DELETE: Delete a daycare center
export function removeCenter(id) {
  if (id === undefined || id === null || id === "") {
    throw new Error(
      "Cannot delete daycare center: ID is missing."
    );
  }

  return request(`/daycare/delete/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

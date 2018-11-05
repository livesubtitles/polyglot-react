// Helper function to make requests
export function fetchJSON<T>(url: string, request: RequestInit): Promise<T> {
  return fetch(url, request).then(res => res.json());
}

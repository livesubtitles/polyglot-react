// Helper function to make requests
export function fetchJSON<T>(url: string, request: RequestInit): Promise<T> {
  return fetch(url, request).then(res => res.json());
}

export function postJSON<ReturnType, PostArgType>(url: string, endpoint: string, bodyObject: PostArgType): Promise<ReturnType> {
  return fetchJSON<ReturnType>(url + "/" + endpoint,
    {
      method: "POST",
      body: JSON.stringify(bodyObject),
      headers: {'Content-Type': 'application/json'}
    }
  );
}

export function simpleGet(url: string, endpoint: string): Promise<Response> {
  return fetch(url + "/" + endpoint,
  {
      method: "GET"
  });
}

export function authPostReq<T>(url: string, endpoint: string, body, headers): Promise<T> {
  return fetchJSON<T>(url + "/" + endpoint, { method: "POST", body: JSON.stringify(body), headers});
}

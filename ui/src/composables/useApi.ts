// src/composables/useApi.js
import { ref } from 'vue'

// Define types for possible HTTP methods and API request options
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  method: HttpMethod
  body?: string
  headers?: Record<string, string>
}

export function useApi<T>() {
  const error = ref<string | null>(null)
  const loading = ref(false)

  // Helper to handle Fetch API calls
  const request = async (
    url: string,
    options: RequestOptions = { method: 'GET' },
  ): Promise<T | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`/api${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      return (await response.json()) as T
    } catch (err) {
      error.value = (err as Error).message
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // GET request
  const get = (endpoint: string) => request(endpoint)

  // POST request
  const post = (endpoint: string, data: unknown) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })

  // PUT request
  const put = (endpoint: string, data: unknown) =>
    request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })

  // DELETE request
  const remove = (endpoint: string) => request(endpoint, { method: 'DELETE' })

  return {
    get,
    post,
    put,
    remove,
    error,
    loading,
  }
}

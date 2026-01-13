export const useApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const api = {
    get: <T>(url: string, options?: any) => {
      return $fetch<T>(`${apiBase}${url}`, {
        method: "GET",
        ...options,
      });
    },

    post: <T>(url: string, body?: any, options?: any) => {
      return $fetch<T>(`${apiBase}${url}`, {
        method: "POST",
        body,
        ...options,
      });
    },

    patch: <T>(url: string, body?: any, options?: any) => {
      return $fetch<T>(`${apiBase}${url}`, {
        method: "PATCH",
        body,
        ...options,
      });
    },

    delete: <T>(url: string, options?: any) => {
      return $fetch<T>(`${apiBase}${url}`, {
        method: "DELETE",
        ...options,
      });
    },
  };

  return {
    apiBase,
    api,
  };
};

import axios from "axios";
import Cookies from "js-cookie";

// Flag to prevent multiple simultaneous session creation attempts
let isCreatingSession = false;

// Queue for requests waiting for session creation
let pendingRequests = [];

const api = axios.create({
  baseURL: "http://localhost:2222/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const setSessionCookie = (sessionData) => {
  if (sessionData?.sessionId) {
    Cookies.set("sessionId", sessionData.sessionId, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 30,
    });
  }
};

const validateExistingSession = async () => {
  try {
    const response = await api.get("/sessions/validate");
    return response.data.success && response.data.data.isValid;
  } catch (error) {
    return false;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    const sessionId = Cookies.get("sessionId");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (sessionId) {
      config.headers["X-Session-ID"] = sessionId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleSessionCreation = async (failedRequest = null) => {
  if (isCreatingSession) {
    return new Promise((resolve, reject) => {
      pendingRequests.push({ resolve, reject, failedRequest });
    });
  }

  const hasValidSession = await validateExistingSession();
  if (hasValidSession) {
    if (failedRequest) {
      return api(failedRequest.config);
    }
    return null;
  }

  isCreatingSession = true;
  try {
    const response = await api.post("/sessions/create");
    if (response.data.success) {
      // Set session cookie from response
      setSessionCookie(response.data.data);

      pendingRequests.forEach(({ resolve, reject, failedRequest }) => {
        if (failedRequest) {
          api(failedRequest.config).then(resolve).catch(reject);
        } else {
          resolve(response);
        }
      });
      pendingRequests = [];
      return response;
    }
    throw new Error(response.data.message);
  } catch (error) {
    pendingRequests.forEach(({ reject }) => reject(error));
    pendingRequests = [];
    throw error;
  } finally {
    isCreatingSession = false;
  }
};

api.interceptors.response.use(
  async (response) => {
    if (response.config.url.startsWith("/sessions/")) {
      if (response.data.success && response.data.data?.sessionId) {
        setSessionCookie(response.data.data);
      }
      return response;
    }

    if (!response.data.success && response.data.message === "Invalid session") {
      Cookies.remove("sessionId");
      Cookies.remove("token");

      const newSessionResponse = await handleSessionCreation();
      if (newSessionResponse?.data.success) {
        return api(response.config);
      }
    }

    if (response.data.success) {
      api.put("/sessions/update-last-online").catch(console.error);
    }

    return response;
  },
  async (error) => {
    if (error.config?.url.startsWith("/sessions/")) {
      return Promise.reject(error);
    }

    if (
      error.response?.data?.success === false &&
      error.response?.data?.message === "Invalid session"
    ) {
      Cookies.remove("sessionId");
      Cookies.remove("token");

      try {
        const newSessionResponse = await handleSessionCreation();
        if (newSessionResponse?.data.success) {
          return api(error.config);
        }
      } catch (sessionError) {
        return Promise.reject(sessionError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

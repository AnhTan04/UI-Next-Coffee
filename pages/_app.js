import { useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import useSessionStore from "../stores/sessionStore";
import "../styles/globals.css";
import api from "../configs/api";
import Cookies from "js-cookie";

// Helper function to set session cookie
const setSessionCookie = (sessionData) => {
  if (sessionData?.sessionId) {
    Cookies.set("sessionId", sessionData.sessionId, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 30, // 30 days
    });
  }
};

export default function MyApp({ Component, pageProps }) {
  const { setSession } = useSessionStore();

  useEffect(() => {
    let isSubscribed = true;
    let updateInterval;

    const initSession = async () => {
      try {
        const validateResponse = await api.get("/sessions/validate");

        if (
          validateResponse.data.success &&
          validateResponse.data.data.isValid
        ) {
          const response = await api.get("/sessions/info");

          if (response.data.success && isSubscribed) {
            setSession(response.data.data);
            setSessionCookie(response.data.data);

            updateInterval = setInterval(() => {
              api.put("/sessions/update-last-online").catch(console.error);
            }, 5 * 60 * 1000);
          }
        } else {
          const response = await api.post("/sessions/create");
          if (response.data.success && isSubscribed) {
            const sessionData = response.data.data;
            setSession(sessionData);
            setSessionCookie(sessionData);

            updateInterval = setInterval(() => {
              api.put("/sessions/update-last-online").catch(console.error);
            }, 5 * 60 * 1000);
          }
        }
      } catch (error) {
        console.error("Error during session initialization:", error);
        if (error.response?.data?.message === "Invalid session") {
          Cookies.remove("sessionId");
          Cookies.remove("token");

          try {
            const response = await api.post("/sessions/create");
            if (response.data.success && isSubscribed) {
              const sessionData = response.data.data;
              setSession(sessionData);
              setSessionCookie(sessionData);

              updateInterval = setInterval(() => {
                api.put("/sessions/update-last-online").catch(console.error);
              }, 5 * 60 * 1000);
            }
          } catch (createError) {
            console.error("Error creating new session:", createError);
          }
        }
      }
    };

    initSession();

    return () => {
      isSubscribed = false;
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [setSession]);

  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}

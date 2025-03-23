import { Toaster, toast } from "react-hot-toast";

const showToast = (message: string, type = "default") => {
  const config = {
    style: {
      background: "#1F2937",
      color: "#fff",

      padding: "12px",
      borderRadius: "8px",
    },
    duration: 3000,
  };

  if (type === "success") {
    toast.success(message, { ...config, icon: "✅" });
  } else if (type === "error") {
    toast.error(message, { ...config, icon: "❌" });
  } else if (type === "warning") {
    toast(message, {
      ...config,
      icon: "⚠️",
    });
  } else {
    toast(message, { ...config, icon: "ℹ️" });
  }
};

const ToastNotification = () => {
  return <Toaster />;
};

export { ToastNotification, showToast };

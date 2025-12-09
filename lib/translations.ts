export const translations = {
  // English
  en: {
    home: "Kitchen Wall System",
    homeDescription: "Real-time order management for your kitchen staff.",
    kitchenDashboard: "Kitchen Dashboard",
    kitchenDashboardDescription: "View and manage all incoming orders in real-time with Firebase integration",
    openKitchenWall: "Open Kitchen Wall System",
    KitchenWallDashboardHeading: "Kitchen Wall Dashboard",
    refresh: "Refresh",
    KitchenStats_pending: "Pending",
    KitchenStats_preparing: "Preparing",
    KitchenStats_ready: "Ready",
    KitchenStats_serving: "Serving",
    KitchenFilter_all: "All",
    KitchenFilter_pending: "Pending",
    KitchenFilter_preparing: "Preparing",
    KitchenFilter_ready: "Ready",
    KitchenFilter_serving: "Serving",
    KitchenFilter_completed: "Completed",
    noActiveOrders: "No active orders",
    OrderCard_status_pending: "Pending",
    OrderCard_status_preparing: "Preparing",
    OrderCard_status_ready: "Ready",
    OrderCard_status_serving: "Serving",
    OrderCard_status_completed: "Completed",
    OrderCard_table: "Table",
    OrderCard_ago: "ago",
    OrderCard_qty: "Qty",
    OrderCard_btn_startPreparing: "Start Preparing",
    OrderCard_btn_markReady: "Mark Ready",
    OrderCard_btn_startServing: "Start Serving",
    OrderCard_btn_completeOrder: "Complete Order",
  },
  // Chinese
  zh: {
    home: "厨房墙系统",
    homeDescription: "为您的厨房员工提供实时订单管理。",
    kitchenDashboard: "厨房仪表板",
    kitchenDashboardDescription: "通过Firebase集成实时查看和管理所有传入订单",
    openKitchenWall: "打开厨房墙系统",
    KitchenWallDashboardHeading: "厨房墙仪表板",
    refresh: "刷新",
    KitchenStats_pending: "待处理",
    KitchenStats_preparing: "准备中",
    KitchenStats_ready: "已准备",
    KitchenStats_serving: "上菜中",
    KitchenFilter_all: "全部",
    KitchenFilter_pending: "待处理",
    KitchenFilter_preparing: "准备中",
    KitchenFilter_ready: "已准备",
    KitchenFilter_serving: "上菜中",
    KitchenFilter_completed: "已完成",
    noActiveOrders: "没有活跃订单",
    OrderCard_status_pending: "待处理",
    OrderCard_status_preparing: "准备中",
    OrderCard_status_ready: "已准备",
    OrderCard_status_serving: "上菜中",
    OrderCard_status_completed: "已完成",
    OrderCard_table: "桌号",
    OrderCard_ago: "前",
    OrderCard_qty: "数量",
    OrderCard_btn_startPreparing: "开始准备",
    OrderCard_btn_markReady: "标记为已准备",
    OrderCard_btn_startServing: "开始上菜",
    OrderCard_btn_completeOrder: "完成订单",
  }
}


// Define language and key types
export type Language = keyof typeof translations
type TranslationKeys = keyof typeof translations["zh"]

// Type-safe translation getter
export const getTranslation = (
  lang: Language,
  key: keyof typeof translations.zh // only string keys
): string => {
  const value = translations[lang]?.[key] ?? translations.zh?.[key];
  return typeof value === "string" ? value : "";
};

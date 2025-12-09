"use client"

import { useState, useEffect } from "react"
import { useRestaurant } from "@/lib/restaurant-context"
import type { Order } from "@/lib/types"
import { OrderCard } from "@/components/order-card"
import { KitchenStats } from "@/components/kitchen-stats"
import { Button } from "@/components/ui/button"
import { RefreshCw, AlertCircle, Volume2, VolumeX } from "lucide-react"
import { useNotificationSound } from "@/hooks/use-notification-sound"
import { getTranslation } from "@/lib/translations"
import { useLanguage } from "@/lib/language-context"

export default function KitchenPage() {

  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const { getAllActiveOrders, loading, error, getCompletedOrders } = useRestaurant()
  const [orders, setOrders] = useState<Order[]>([])
  const [completedOrders, setCompletedOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<"all" | "pending" | "preparing" | "ready" | "serving" | "completed">("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { playSound, isMuted, toggleMute, previousOrderCountRef } = useNotificationSound()

  useEffect(() => {
    // Update local orders when context updates
    const activeOrders = getAllActiveOrders()

    const currentOrderCount = activeOrders.length
    if (previousOrderCountRef.current > 0 && currentOrderCount > previousOrderCountRef.current) {
      playSound()
    }
    previousOrderCountRef.current = currentOrderCount

    setOrders(activeOrders)

    const completed = getCompletedOrders()
    setCompletedOrders(completed)
  }, [getAllActiveOrders, getCompletedOrders, playSound, previousOrderCountRef])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Force re-sync from Firestore
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const displayOrders = filter === "completed" ? completedOrders : orders
  const filteredOrders = displayOrders.filter((o) => (filter === "all" ? true : o.status === filter))

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{t("KitchenWallDashboardHeading")}</h1>
          </div>
          <div className="flex gap-2">
            <Button onClick={toggleMute} size="sm" variant={isMuted ? "outline" : "default"}>
              {isMuted ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
              {isMuted ? t("soundButton_mute") : t("soundButton_unmute")  }
            </Button>
            <Button onClick={handleRefresh} disabled={isRefreshing} size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t("refresh")}
            </Button>
          </div>
        </div>

        <KitchenStats orders={orders} />

        <div className="flex gap-2 mb-6 flex-wrap">
          <div className="flex gap-2 mb-6 flex-wrap">
            {([
              "all",
              "pending",
              "preparing",
              "ready",
              "serving",
              "completed",
            ] as const).map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? "default" : "outline"}
                size="sm"
              >
                {t(`KitchenFilter_${status}`)}
              </Button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {filter === "all" ? t("noActiveOrders") : t(`no${filter.charAt(0).toUpperCase() + filter.slice(1)}Orders`)}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { UtensilsCrossed } from "lucide-react"
import { getTranslation } from "@/lib/translations"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export default function HomePage() {
   const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-3">{t("home")}</h1>
          <p className="text-lg text-muted-foreground">{t("homeDescription")}</p>
        </div>

        <Card className="p-8">
          <div className="flex items-center gap-6">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <UtensilsCrossed className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-foreground mb-2">{t("kitchenDashboard")}</h2>
              <p className="text-muted-foreground mb-4">
                {t("kitchenDashboardDescription")}
              </p>
              <Link href="/kitchen">
                <Button size="lg">{t("openKitchenWall")}</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

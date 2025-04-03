import Link from "next/link"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error() {

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="rounded-full bg-red-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          <h1 className="text-3xl font-medium text-[#2e6930] mb-2">Something went wrong</h1>

          <p className="text-gray-600 mb-8">
            We apologize for the inconvenience. Please try again or return to the home page.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#2e6930] hover:bg-[#1e4920]" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return to home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
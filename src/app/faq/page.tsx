"use client"

import { BarChart3, HelpCircle, Leaf, Package, Settings, User, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FAQPage() {
  return (
    <div className="flex min-h-screen bg-white">
    
    {/* TODO: Add sidebar */}

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-medium text-[#2e6930]">Frequently Asked Questions</h1>
          <p className="text-gray-500 mt-1">Here are the most common questions we get asked.</p>
        </div>

        <Card className="border border-[#e8f2e8] rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#2e6930] text-xl">Help Center</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-[#e8f2e8]">
                <AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline">
                  Can I track food waste and identify inefficiencies?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! The system allows you to log food waste and categorize the reason (spoilage, over-portioning,
                  plate waste, etc.). The AI-powered insights feature will analyze patterns and provide recommendations
                  to reduce waste and improve efficiency.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-[#e8f2e8]">
                <AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline">
                  How does the system notify me about low stock or expiring items?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You will receive real-time alerts via email or in-app notifications when stock is running low or when
                  an ingredient is approaching its expiration date. You can also customize alert thresholds based on
                  your restaurant's needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-[#e8f2e8]">
                <AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline">
                  Can I integrate this system with my restaurant's POS and suppliers?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our system supports POS integration to sync stock levels accurately. You can also connect with
                  supplier APIs to automate purchase orders when stock drops below a set level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b-0">
                <AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline">
                  How do I manage multiple restaurant locations within the system?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  If you own or manage multiple restaurants, you can access them from a single dashboard. The system
                  allows you to switch between locations, set role-based access for managers and staff, and generate
                  reports for individual or all locations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-[#e8f2e8] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#2e6930] text-lg">Need More Help?</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-600 mb-4">
                If you can't find the answer to your question, our support team is here to help.
              </p>
              <Button
                className="bg-[#2e6930] hover:bg-[#1e4920]"
                onClick={() => (window.location.href = "mailto:contact@vianova.com")}
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-[#e8f2e8] rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-[#2e6930] text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-[#2e6930]">
                <li className="hover:underline cursor-pointer">
                  <a
                    href="https://docs.google.com/document/d/1d_40rTq19l2yns4x1aL1KCO0_v3iVjyk-XxOTokoItI/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    User Guide
                  </a>
                </li>
                <li className="hover:underline cursor-pointer">
                  <a
                    href="https://docs.google.com/document/d/1fmE17jt7Idt7-gDWHB6b5ucCh6uLbqMG72AGx2eXQRc/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Best Practices
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


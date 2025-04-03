"use client";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQPage() {
	return (
		<div className="flex-1">
			<div className="mb-8">
				<h1 className="text-4xl font-medium text-[#2e6930]">
					Frequently Asked Questions
				</h1>
				<p className="text-gray-500 mt-1">
					Here are the most common questions we get asked.
				</p>
			</div>

			<Card className="border border-[#e8f2e8] rounded-2xl">
				<CardHeader className="pb-2">
					<CardTitle className="text-[#2e6930] text-xl">
						Help Center
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">
					<style jsx global>{`
						.faq-accordion-trigger {
							transition: all 0.3s ease;
						}

						.faq-accordion-trigger[data-state="open"] {
							background-color: #f5f9f5;
							border-radius: 0.5rem;
						}

						.faq-accordion-content {
							overflow: hidden;
							transition: height 0.4s
								cubic-bezier(0.16, 1, 0.3, 1);
						}

						.faq-accordion-content[data-state="open"] {
							animation: slideDown 0.4s
								cubic-bezier(0.16, 1, 0.3, 1);
						}

						.faq-accordion-content[data-state="closed"] {
							animation: slideUp 0.4s
								cubic-bezier(0.16, 1, 0.3, 1);
						}

						@keyframes slideDown {
							from {
								height: 0;
								opacity: 0;
							}
							to {
								height: var(--radix-accordion-content-height);
								opacity: 1;
							}
						}

						@keyframes slideUp {
							from {
								height: var(--radix-accordion-content-height);
								opacity: 1;
							}
							to {
								height: 0;
								opacity: 0;
							}
						}
					`}</style>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem
							value="item-1"
							className="border-b border-[#e8f2e8]"
						>
							<AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline cursor-text p-4 faq-accordion-trigger">
								How do user roles and permissions work in the
								system?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600 px-4 faq-accordion-content">
								<div className="py-3">
									The system supports different user roles,
									such as Admin, Manager, and Staff. Admins
									have full access to all features, while
									Managers and Staff have limited permissions
									based on their roles. You can customize
									access levels in the User Management
									section.
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-2"
							className="border-b border-[#e8f2e8]"
						>
							<AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline cursor-text p-4 faq-accordion-trigger">
								How can I update and manage inventory?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600 px-4 faq-accordion-content">
								<div className="py-3">
									{"You can add, update, and remove inventory items through the system's Inventory Management section. It allows you to track stock levels."}
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem
							value="item-3"
							className="border-b border-[#e8f2e8]"
						>
							<AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline cursor-text p-4 faq-accordion-trigger">
								Can I track food waste and identify
								inefficiencies?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600 px-4 faq-accordion-content">
								<div className="py-3">
									Yes! The system allows you to log food waste
									and categorize from the predetermined
									reasons. You can use insights from the
									system to optimize portions and reduce
									unnecessary waste.
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-4" className="border-b-0">
							<AccordionTrigger className="text-[#2e6930] font-medium hover:text-[#2e6930] hover:no-underline cursor-text p-4 faq-accordion-trigger">
								How do I generate reports on inventory usage?
							</AccordionTrigger>
							<AccordionContent className="text-gray-600 px-4 faq-accordion-content">
								<div className="py-3">
									The system provides downloadable reports on
									inventory trends, waste tracking, and usage
									history. You can use these reports to
									monitor stock efficiency and make
									data-driven decisions.
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</CardContent>
			</Card>

			<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="border border-[#e8f2e8] rounded-2xl">
					<CardHeader className="pb-2">
						<CardTitle className="text-[#2e6930] text-lg">
							Need More Help?
						</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">
						<p className="text-gray-600 mb-4">
							{"If you can't find the answer to your question, our support team is here to help."}
						</p>
						<Button
							className="bg-[#2e6930] hover:bg-[#1e4920]"
							onClick={() =>
								(window.location.href =
									"mailto:btanush25@outlook.com")
							}
						>
							Contact Support
						</Button>
					</CardContent>
				</Card>

				<Card className="border border-[#e8f2e8] rounded-2xl">
					<CardHeader className="pb-2">
						<CardTitle className="text-[#2e6930] text-lg">
							Resources
						</CardTitle>
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
	);
}

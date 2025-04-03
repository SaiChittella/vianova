"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
	BarChart3,
	HelpCircle,
	Leaf,
	Package,
	Settings,
	User,
	Utensils,
	Camera,
	Check,
	MapPin,
	Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function ProfilePage() {
	const [profileData, setProfileData] = useState({
		fullName: "",
		username: "",
		email: "",
		phoneNumber: "",
		restaurantName: "",
		restaurantLocation: "",
		isEmailVerified: true,
	});

	const [profilePicture, setProfilePicture] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isVerifying, setIsVerifying] = useState(false);
	const [verificationSent, setVerificationSent] = useState(false);

	const [isSaving, setIsSaving] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState(false);

	const handleProfilePictureUpload = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					setProfilePicture(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle email verification
	const handleVerifyEmail = () => {
		setIsVerifying(true);
		setVerificationSent(true);

		// Simulate verification process
		setTimeout(() => {
			setProfileData((prev) => ({
				...prev,
				isEmailVerified: true,
			}));
			setIsVerifying(false);
		}, 2000);
	};

	// Handle form submission
	const handleSaveChanges = () => {
		setIsSaving(true);

		// Simulate saving
		setTimeout(() => {
			setIsSaving(false);
			setSaveSuccess(true);

			// Hide success message after a delay
			setTimeout(() => {
				setSaveSuccess(false);
			}, 3000);
		}, 1000);
	};

	return (
		<div className="flex min-h-screen bg-white">
			{/* Main content */}
			<div className="flex-1 p-8">
				<div className="mb-8">
					<h1 className="text-4xl font-medium text-[#2e6930]">
						Profile Settings
					</h1>
					<p className="text-gray-500 mt-1">
						Manage your account information and restaurant details.
					</p>
				</div>

				<Tabs defaultValue="personal" className="w-full">
					<TabsList className="mb-6">
						<TabsTrigger value="personal">
							Personal Information
						</TabsTrigger>
						<TabsTrigger value="restaurant">
							Restaurant Details
						</TabsTrigger>
					</TabsList>

					{/* Personal Information Tab */}
					<TabsContent value="personal">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Profile Picture Card */}
							<Card className="border border-[#e8f2e8] rounded-2xl md:col-span-1">
								<CardHeader>
									<CardTitle className="text-[#2e6930]">
										Profile Picture
									</CardTitle>
									<CardDescription>
										Upload a profile picture for your
										account
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col items-center">
									<Avatar className="h-32 w-32 mb-4">
										<AvatarImage
											src={profilePicture || ""}
										/>
										<AvatarFallback className="bg-[#e8f2e8] text-[#2e6930] text-xl">
											{profileData.fullName
												.split(" ")
												.map((name) => name[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<input
										type="file"
										ref={fileInputRef}
										onChange={handleProfilePictureUpload}
										accept="image/*"
										className="hidden"
									/>
									<Button
										onClick={handleUploadClick}
										variant="outline"
										className="border-[#2e6930] text-[#2e6930]"
									>
										<Camera className="h-4 w-4 mr-2" />
										Upload Photo
									</Button>
								</CardContent>
							</Card>

							{/* Personal Information Card */}
							<Card className="border border-[#e8f2e8] rounded-2xl md:col-span-2">
								<CardHeader>
									<CardTitle className="text-[#2e6930]">
										Personal Information
									</CardTitle>
									<CardDescription>
										Update your personal details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="fullName">
												Full Name
											</Label>
											<Input
												id="fullName"
												name="fullName"
												value={profileData.fullName}
												onChange={handleInputChange}
												placeholder="Sarah Johnson"
												className="placeholder:text-gray-300"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="username">
												Username
											</Label>
											<Input
												id="username"
												name="username"
												value={profileData.username}
												onChange={handleInputChange}
												placeholder="sarahjohnson"
												className="placeholder:text-gray-300"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="email"
											className="flex items-center"
										>
											Email Address
											{profileData.isEmailVerified &&
												profileData.email && (
													<span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
														<Check className="h-3 w-3 mr-1" />
														Verified
													</span>
												)}
										</Label>
										<div className="flex space-x-2">
											<Input
												id="email"
												name="email"
												type="email"
												value={profileData.email}
												onChange={handleInputChange}
												className="flex-1 placeholder:text-gray-300"
												placeholder="sarah.johnson@example.com"
											/>
											{!profileData.isEmailVerified &&
												profileData.email && (
													<Button
														onClick={
															handleVerifyEmail
														}
														disabled={isVerifying}
														className="bg-[#2e6930] hover:bg-[#1e4920]"
													>
														{isVerifying
															? "Verifying..."
															: "Verify"}
													</Button>
												)}
										</div>
										{verificationSent &&
											!profileData.isEmailVerified &&
											profileData.email && (
												<p className="text-sm text-amber-600">
													Verification email sent.
													Please check your inbox.
												</p>
											)}
									</div>

									<div className="space-y-2">
										<Label htmlFor="phoneNumber">
											Phone Number
										</Label>
										<Input
											id="phoneNumber"
											name="phoneNumber"
											value={profileData.phoneNumber}
											onChange={handleInputChange}
											placeholder="+1 (555) 123-4567"
											className="placeholder:text-gray-300"
										/>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end">
									{saveSuccess && (
										<p className="text-green-600 mr-4 flex items-center">
											<Check className="h-4 w-4 mr-1" />
											Changes saved successfully
										</p>
									)}
									<Button
										onClick={handleSaveChanges}
										disabled={isSaving}
										className="bg-[#2e6930] hover:bg-[#1e4920]"
									>
										{isSaving
											? "Saving..."
											: "Save Changes"}
									</Button>
								</CardFooter>
							</Card>
						</div>
					</TabsContent>

					{/* Restaurant Details Tab */}
					<TabsContent value="restaurant">
						<Card className="border border-[#e8f2e8] rounded-2xl">
							<CardHeader>
								<CardTitle className="text-[#2e6930]">
									Restaurant Details
								</CardTitle>
								<CardDescription>
									Update information about your restaurant
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label
										htmlFor="restaurantName"
										className="flex items-center"
									>
										<Building className="h-4 w-4 mr-2" />
										Restaurant Name
									</Label>
									<Input
										id="restaurantName"
										name="restaurantName"
										value={profileData.restaurantName}
										onChange={handleInputChange}
										placeholder="Green Leaf Bistro"
										className="placeholder:text-gray-300"
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="restaurantLocation"
										className="flex items-center"
									>
										<MapPin className="h-4 w-4 mr-2" />
										Restaurant Location
									</Label>
									<Input
										id="restaurantLocation"
										name="restaurantLocation"
										value={profileData.restaurantLocation}
										onChange={handleInputChange}
										placeholder="123 Main Street, San Francisco, CA 94105"
										className="placeholder:text-gray-300"
									/>
								</div>
							</CardContent>
							<CardFooter className="flex justify-end">
								{saveSuccess && (
									<p className="text-green-600 mr-4 flex items-center">
										<Check className="h-4 w-4 mr-1" />
										Changes saved successfully
									</p>
								)}
								<Button
									onClick={handleSaveChanges}
									disabled={isSaving}
									className="bg-[#2e6930] hover:bg-[#1e4920]"
								>
									{isSaving ? "Saving..." : "Save Changes"}
								</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}

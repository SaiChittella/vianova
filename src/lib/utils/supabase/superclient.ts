import { createClient } from "@supabase/supabase-js";

export default async function createSuperClient() {
	return createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY!,
		{
			global: {
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PRIVATE_SUPABASE_SERVICE_ROLE_KEY}`,
				},
			},
		}
	);
}


import { createClient } from "@supabase/supabase-js";

import { Database } from "@/lib/utils/supabase/database.types";

export default async function createSuperClient() {
	return createClient<Database>(
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


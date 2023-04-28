import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://pzxehirgbsdgxsoesboh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6eGVoaXJnYnNkZ3hzb2VzYm9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MjA5NjMyMSwiZXhwIjoxOTk3NjcyMzIxfQ.YHDQE03W3JNMOHUFIXUXC5DWuVnCU9QNKmigx6nx8oI"
)

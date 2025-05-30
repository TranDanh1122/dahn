const createClient = require('@supabase/supabase-js');

const supabase = createClient.createClient(
  process.env.AUTH_DOMAIN,
  process.env.AUTH_API_KEY,
);
module.exports = supabase
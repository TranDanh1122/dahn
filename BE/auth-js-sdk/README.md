# This is my custom Supabase auth-js package, to make sure PCKE flow working with  BE
1. Clone @supabase/auth-js from their git
2. Update GoTrueClient/exchangeCodeForSession => change this function, add verrfy code param, no need to auto get it form storage (node doest have local stoarge)
3. Remove some trash (test, eslin..v...v) and build this (you will see "dist" folder)
4. In root package.json, add pnpm overide "@supabase/auth-js": "link:./BE/auth-js-sdk"
5. In package.json of supabase-js, change "@supabase/auth-js": "workspace:*",
6. pnpm i => ok, now it work
# This is new auth flow, strongly reccommend if you work in large system or working with 3rd auth service

## Feel free to clone/copy this flow/code, just replace you API and UI, i hope it save your time!


## The core thing is [Client Code] and [Server Code]
## [Client Code]  : the thing auth server need to make sure if you are the person send auth request
## [Server Code]  : the thing auth server need to procees auth flow
### You can image like that: [Client Code] is you id number, [Server Code] is a plane fee you have after payment, when you need to checkin, you need all id card and fee, right?
0. Create your [Client Code], encript it (i use sha256)
1. Send Auth Request to server, with [Client Code] (enscripted) and name of enscript method use using to server (sha256)
2. You logged in with method server provided (Google, git...v...v)
3. Server response/redirect to your app with another [Server code]
4. So, you send another request, add [Client Code] to tell with server "Hey, it me, just logined few second ago", and [Server code] to process server
5. Server will response to use access_token, so you can use it to get server resource

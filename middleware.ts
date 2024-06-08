import {
    clerkMiddleware,
    createRouteMatcher
  } from '@clerk/nextjs/server';
  
const isProtectedRoute = createRouteMatcher([
    '/',
    '/builder',
    '/form', 
]);

export default clerkMiddleware((auth, req) => {
    if(isProtectedRoute(req)) auth().protect();
  });

  export const config = {
    // Update the matcher to explicitly exclude '/submit'
    matcher: [
      '/((?!.*\\..*|_next|submit).*)', // Exclude '/submit'
      '/',
      '/(api|trpc)(.*)'
    ],
  };
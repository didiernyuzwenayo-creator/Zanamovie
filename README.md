# ZanaMovies

A mobile-friendly movie discovery and viewing website, separate from the MOTARI project.

## Current status
The responsive frontend is committed. It includes a home page, search, genre filters, movie cards, a video player modal, and an admin entry point. The movie catalog intentionally starts empty; it does not pretend sample movies are available.

## Next setup steps
1. Create a dedicated Supabase project for ZanaMovies (do not reuse MOTARI).
2. Create a movies table with Row Level Security and a storage bucket for movie video files and posters.
3. Configure secure admin authentication and policies. Public visitors should only read published movies; only an authorized administrator should upload/edit/delete.
4. Add the Supabase project URL and publishable key to a configuration file. Never put a service-role key in frontend code.
5. Enable GitHub Pages in this repository (Settings → Pages → Deploy from a branch → main → /(root)).

## Important
- GitHub Pages can host the frontend, not the database or video storage.
- Large video files and high streaming bandwidth can exceed free storage/transfer quotas. Check current plan limits before uploading.
- Upload only movies you own or have permission to distribute.
- Admin uploads are not enabled until Supabase storage, authentication and security policies are configured.

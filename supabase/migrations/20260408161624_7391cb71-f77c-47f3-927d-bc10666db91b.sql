-- Drop the restrictive read policy
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;

-- Create a new policy allowing any authenticated user to read any profile
CREATE POLICY "Authenticated users can read any profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);
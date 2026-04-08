-- Update the trigger function to include college and course from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, college, course)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'college', ''),
    COALESCE(NEW.raw_user_meta_data->>'course', '')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Backfill existing profiles with metadata from auth.users
UPDATE public.profiles p
SET
  college = COALESCE(u.raw_user_meta_data->>'college', p.college),
  course = COALESCE(u.raw_user_meta_data->>'course', p.course),
  full_name = COALESCE(NULLIF(p.full_name, ''), u.raw_user_meta_data->>'full_name', p.full_name)
FROM auth.users u
WHERE p.user_id = u.id
  AND (p.college IS NULL OR p.college = '' OR p.course IS NULL OR p.course = '');
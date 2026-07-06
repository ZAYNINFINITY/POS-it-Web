@echo off
echo Clearing Next.js cache...
if exist .next (
  rmdir /s /q .next
  echo .next folder deleted.
  
) else (
  echo .next folder not found, skipping.
)
echo.
echo Starting dev server...
npm run dev

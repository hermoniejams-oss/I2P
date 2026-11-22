#!/usr/bin/env sh
set -eu
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
mkdir -p "$ROOT/android/app/src/main/assets/www"
rm -rf "$ROOT/android/app/src/main/assets/www/"*
cp -R "$ROOT/www/." "$ROOT/android/app/src/main/assets/www/"
cd "$ROOT/android"
if ! command -v gradle >/dev/null 2>&1; then
  echo "Gradle 9.6.0 is required and must be available on PATH." >&2
  exit 1
fi
gradle --no-daemon :app:assembleDebug
printf '\nAPK created: %s\n' "$ROOT/android/app/build/outputs/apk/debug/app-debug.apk"

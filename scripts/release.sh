#!/bin/bash

set -xe

# Build all once to ensure things are nice
pnpm build

# Bump all packages
for PKG in ../packages/* ; do
  pushd $PKG
  echo "⚡ Bumping $PKG"

  # Bump version
  pnpm dlx @jsdevtools/version-bump-prompt

  popd > /dev/null
done

# Install all dependencies
pnpm -r install

# Build all again
pnpm build

# Release packages
for PKG in ../packages/* ; do
  pushd $PKG
  echo "⚡ Publishing $PKG"

  # Temporarily disable errexit for publish
  set +e

  # Publish
  pnpm publish --no-git-checks --force

  # Re-enable errexit
  set -e

  popd > /dev/null
done

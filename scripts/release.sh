#!/bin/bash

set -xe

# Build all once to ensure things are nice
pnpm build

# Install all dependencies
pnpm -r install

# Release packages
for PKG in ./packages/* ; do
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

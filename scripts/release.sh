#!/bin/bash

set -xe

# Build all once to ensure things are nice
pnpm build

# Release packages
for PKG in ../packages/* ; do
  pushd $PKG
  echo "⚡ Bumping $PKG"

  # Bump version
  pnpm dlx @jsdevtools/version-bump-prompt

  popd > /dev/null
done

pnpm -r install

pnpm build

# Release packages
for PKG in ../packages/* ; do
  pushd $PKG
  echo "⚡ Publishing $PKG"

  # Temporarily disable errexit for this command
  set +e

  # Publish

  pnpm publish --no-git-checks --force

  # Re-enable errexit
  set -e

  popd > /dev/null
done

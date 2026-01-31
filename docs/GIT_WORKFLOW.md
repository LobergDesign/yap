# Git Workflow & Release Strategy

This document outlines the branching and release strategy for this project.

## 1. Release Branch Strategy

When the `develop` branch is ready for a release, a dedicated branch is created to prepare for production.

-   **Branching:** A `release/vX.Y.Z` branch is created from `develop`.
-   **Purpose:** This branch is used exclusively for final testing, version number updates, and critical bug fixes. No new features are added.
-   **Merging:** Once finalized, the release branch is merged into `main` (to deploy to production) and also back into `develop` (to ensure any fixes are included in future development).

## 2. Commit Message & Automation Strategy

We use the **Conventional Commits** specification to structure our commit messages. This enables automated versioning and changelog generation.

-   **Format:** ` <type>(<scope>): <subject>`
-   **Key Types:**
    -   `feat`: A new feature (triggers a MINOR version bump).
    -   `fix`: A bug fix (triggers a PATCH version bump).
    -   **BREAKING CHANGE** in the footer triggers a MAJOR version bump.

## 3. Summary of the Release Workflow

1.  **Develop:** Features are built in `feature/*` branches and merged into `develop` using Conventional Commits.
2.  **Prepare Release:** A `release/vX.Y.Z` branch is created from `develop` for final preparations.
3.  **Finalize & Merge:** The release branch is merged into `main` and `develop`.
4.  **Automate Release:** On the `main` branch, a script (e.g., `bun run release`) is executed. This script automatically:
    -   Determines the new version number based on commit history.
    -   Generates or updates the `CHANGELOG.md` file.
    -   Commits the version bump and changelog.
    -   Creates a git tag for the new version.
5.  **Push:** Finally, the `main` and `develop` branches are pushed to the remote, along with the new tag.

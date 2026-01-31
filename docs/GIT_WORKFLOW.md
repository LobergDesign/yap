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

### Default Conventional Commit Types & `semantic-release` Impact

The Conventional Commits specification includes many types, but by default, `semantic-release` only triggers a new version release for specific ones:

*   **Triggers a release:**
    *   `feat`: A new feature (triggers a **minor** version bump)
    *   `fix`: A bug fix (triggers a **patch** version bump)
    *   Any commit containing `BREAKING CHANGE:` in its body/footer (triggers a **major** version bump)

*   **Do NOT trigger a release (but appear in changelog):**
    *   `build`: Changes that affect the build system or external dependencies
    *   `chore`: Other changes that don't modify source or test files
    *   `ci`: Changes to CI configuration files and scripts
    *   `docs`: Documentation only changes
    *   `perf`: A code change that improves performance
    *   `refactor`: A code change that neither fixes a bug nor adds a feature
    *   `revert`: Reverts a previous commit
    *   `style`: Changes that do not affect the meaning of the code
    *   `test`: Adding missing tests or correcting existing tests

This behavior ensures new versions are published primarily for user-facing changes.

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

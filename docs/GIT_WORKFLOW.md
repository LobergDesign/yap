# Git Workflow & Release Strategy

This document outlines the branching and release strategy for this project, utilizing `semantic-release` for automated versioning and deployments.

## 1. Branching Strategy

Our branching strategy focuses on maintaining a stable `main` branch for releases while allowing continuous development on `develop`.

-   **`main` Branch:**
    -   This branch always reflects the latest production-ready state of the application.
    -   All releases (version bumps, changelog generation, and tag creation) are triggered automatically by `semantic-release` directly from this branch.
    -   **Never commit directly to `main`.** Changes are integrated via merge requests from `develop`.

-   **`develop` Branch:**
    -   This is the primary integration branch for all new features and bug fixes.
    -   New feature branches (`feature/*`) or bug fix branches (`fix/*`) are branched off `develop` and merged back into `develop`.
    -   When a set of features or fixes is ready for a release, the `develop` branch is merged into `main`.

-   **Feature/Fix Branches (`feature/*`, `fix/*`):**
    -   Short-lived branches created from `develop` for implementing specific features or bug fixes.
    -   They should be merged back into `develop` using a Pull Request, ensuring Conventional Commit messages are used.

## 2. Commit Message & Automation Strategy

We use the **Conventional Commits** specification to structure our commit messages. This is crucial for `semantic-release` to automate versioning and changelog generation.

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

## 3. Summary of the Release Workflow with `semantic-release`

1.  **Develop Features/Fixes:** Work is done on short-lived `feature/*` or `fix/*` branches, branched off `develop`.
2.  **Merge into `develop`:** Once complete, `feature/*` or `fix/*` branches are merged into `develop` via Pull Requests. Ensure all commits adhere to Conventional Commits.
3.  **Prepare for Release:** When `develop` contains enough features/fixes for a release, it is merged into `main` via a Pull Request.
    *   **Important:** This merge **must preserve individual commit history** (e.g., using a standard merge commit or rebase-merge, **NOT squash merge**), so `semantic-release` can analyze the Conventional Commits.
4.  **Automated Release on `main`:** Upon merging into `main`, our CI/CD pipeline (e.g., GitHub Actions) will automatically trigger `semantic-release`.
    *   `semantic-release` will analyze the commit history on `main` since the last release.
    *   If new `feat`, `fix`, or `BREAKING CHANGE` commits are detected, it will:
        *   Determine the appropriate next version number (patch, minor, or major).
        *   Generate or update `CHANGELOG.md`.
        *   Commit the version bump and updated changelog.
        *   Create a Git tag for the new version.
        *   Publish the release (e.g., to npm, GitHub Releases).
5.  **Deployment (if applicable):** The newly tagged `main` branch can then trigger deployment to production environments.

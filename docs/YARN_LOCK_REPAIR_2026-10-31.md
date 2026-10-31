# Yarn Classic parser repair — October 31, 2026

Dependabot run 39222062187 / job 117959447773 failed with `dependency_file_not_parseable: /yarn.lock`. Reproducing with `@yarnpkg/lockfile@1.1.0` raises `Invalid value type 418:0 in lockfile`. Prefix isolation identifies the first malformed multi-hash integrity value at physical line 470 (the parser's reported location differs).

There are 270 unquoted integrity values containing multiple space-separated SRI hashes. Quoting each complete value makes it one valid scalar. Every original digest, version, resolution URL and other lock text is preserved; removing only the added quoting reconstructs the original file exactly. No integrity check is disabled or hash replaced. The repaired file parses successfully with 816 entries.

A read-only workflow installs only the pinned parser into the runner temporary directory, with package lifecycle scripts disabled, and parses the committed lock. It does not install or execute the application or fetch search results.

This is a syntax repair, not a dependency/security modernization. Locked installation, runtime tests/build, a fresh advisory audit and compatible upgrades remain necessary. Dependabot's default-branch updater will not see this repair until it is reviewed and merged. Existing source/license provenance is retained; no source was integrated into other projects. Issues are disabled in this repository, so the portfolio audit records the broader dependency follow-up.

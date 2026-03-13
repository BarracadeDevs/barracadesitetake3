# Barracade Hidden Cryptographic Puzzle System

## Structure Overview

- Entry Point: Hidden HTML comment in homepage (`barracade://initiate -- Base64 clue`).
- First Cipher Layer: Decoded clue points to `/security/logs/archive`.
- Archive Page: Contains log entries with cryptographic clues (hex, binary, Caesar, Base64, hash, timestamp anomalies, hidden path).
- Steganographic Layer: Barracade logo image (`public/logo.png`) contains EXIF UserComment with SHA-256 clue.
- Code-Based Layer: Obfuscated variable names and cryptographic constant reference in `matrix-rain.tsx`.
- External Research Step: SHA-256 constant reference requires research.
- Hidden URL Path: `/barracade/command/threshold` (not linked anywhere).
- Command Console: Terminal-style interface for key input. Correct key unlocks reward page.
- Final Reward: Congratulatory message, contact, badge.
- Leaderboard (optional): Not implemented by default.

## Maintenance Notes
- All puzzle logic is passive and does not affect normal site operation.
- Clues are distributed across code, logs, image metadata, and cryptographic references.
- Internal documentation is stored in `src/app/puzzle-doc.md`.
- Update clues and paths as needed for future puzzle versions.

## Final Key
- `BRCD-6A09E667-BB67AE85-8CFA5A7C` (derived from SHA-256 constant)

## Contact
- security@barracade.com

## Badge
- `/screenshots/command-palette.png` (used as hidden badge graphic)

## Subtlety
- No visual signals. Only discoverable by technical investigation.

## Performance
- All puzzle elements are static and do not impact site speed or accessibility.

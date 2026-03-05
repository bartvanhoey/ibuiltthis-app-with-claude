# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a reference/notes repository for Claude Code usage — documenting tools, commands, useful prompts, and MCP server configurations.

## Linting

Markdown is linted with `markdownlint`. The active rules (via [.markdownlint.json](.markdownlint.json)):

- `MD013` (line length) — disabled
- `MD033` (inline HTML) — disabled
- `MD041` (first line heading) — disabled
- All other default rules are enabled

## Structure

- [README.md](README.md) — main reference doc with tools table, commands, prompts, and MCP configs
- [images/](images/) — screenshots and diagrams embedded in the README

## Key Content Areas in README

- **Tools with Claude Code** — table of available Claude Code tools with purposes
- **Most Used Claude Commands** — shell/slash commands like `/init`
- **Useful Prompts** — reusable prompt snippets
- **MCP Servers** — configuration and usage notes for MCP integrations (e.g., Playwright)

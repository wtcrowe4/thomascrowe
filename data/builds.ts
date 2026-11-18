// Write-ups of open-source projects built on my own time. Facts come from each
// repo's own docs; no metrics that haven't been measured.

import type { CaseStudy } from "./casebook";

export const builds: CaseStudy[] = [
  {
    slug: "email-tui",
    title: "email-tui: Mail Access for AI Agents",
    kicker: "Open source · Agent tooling",
    summary:
      "A Thunderbird bridge that lets terminal tools and Claude read and organise real mail, designed on the assumption that any email may carry instructions aimed at the agent.",
    problem:
      "Agents are useful for mail triage, but a mailbox is untrusted input written by strangers. Giving an agent full account access through new OAuth credentials means one injected instruction could send, delete or leak mail.",
    approach:
      "Reuse the logins Thunderbird already holds and expose a narrow, allowlisted API over a private local socket, with limits that still hold if a prompt injection succeeds.",
    flow: [
      ["Claude (MCP server)", "Terminal CLI", "herdr notifier"],
      ["Private Unix socket", "Allowlisted helper"],
      ["Thunderbird add-on"],
      ["Running Thunderbird"],
    ],
    points: [
      "No send path: the add-on never requests Thunderbird's send permissions, so the client itself refuses to send. Drafts are saved for review, and sending is always the owner's click.",
      "Nothing is permanently deleted. Trash moves mail to the account's Trash folder, folders can be deleted only when empty, and built-in folders can't be renamed, moved or deleted.",
      "Protected mail, from a Finance folder or a list of senders, has its subjects and bodies removed before any client sees them.",
      "The helper starts and stops with Thunderbird, opens no network port, and listens on a Unix socket in a private directory.",
      "New-mail events carry only a count, an account and up to three sender display names, never addresses, subjects or bodies.",
      "The test suite fails if a send permission is added or a send, permanent-delete or attachment-removal API is called.",
      "A herdr plugin adds unread and priority badges, new-mail toasts and a mail pane. Priority rules live in user config, outside the repo.",
    ],
    stack: ["Python", "Thunderbird MailExtension", "Native messaging", "MCP", "Unix sockets", "herdr"],
    outcome:
      "An agent can triage, search, file and draft replies in a real mailbox, while sending, permanent deletion and protected content stay out of its reach by design.",
    liveUrl: "https://github.com/wtcrowe4/email-tui",
    liveLabel: "Code on GitHub",
  },
];

export function getBuild(slug: string) {
  return builds.find((b) => b.slug === slug);
}

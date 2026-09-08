# Sponsor page statistics

`sponsor-stats.json` is a dated snapshot, rendered without client-side API calls.

- Downloads: sum the npm Downloads API counts for each calendar year since the
  first publication in November 2018. Use
  `https://api.npmjs.org/downloads/point/YYYY-01-01:YYYY-12-31/msw` for completed
  years and stop the current year at `downloadsThrough`. Annual counts are retained for the lifetime total. The visible graph uses the latest six complete calendar months in `monthlyDownloads`, currently March–August 2026, fetched with the same endpoint and monthly date ranges.
- Stars and project creation: `https://api.github.com/repos/mswjs/msw`, fields
  `stargazers_count` and `created_at`.
- Update the snapshot date, the visible source note, and the chart's accessible
  description together when refreshing these values.

Counts measure package downloads, not unique developers or installations.
Company logos reuse the homepage's existing adoption list; they do not imply
that these companies sponsor MSW.

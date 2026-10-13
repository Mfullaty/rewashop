# Desktop 1.1 validation

The downloaded catalog workflow has regression coverage for signed price/device scope, concurrent stock changes and shortage recording, automatic zero-opening sessions alongside an existing till, picture URLs in snapshots/change feeds, idempotent sale replay, and automatic sessions without cash-setup permission.

Desktop tests cover no HTTP calls during disconnected cash checkout, no allocations/manual till setup, persisted local quantities after restart, credentials retained across disconnect/connect, partial catalog refresh accounting, unresolved requests retaining their original identity, and cached raster pictures surviving offline/restart. Existing tax, refunds, lost replies, recovery, clock rollback and deterministic rejection tests remain.

The loopback integration drives the actual Laravel HTTP middleware and SQLite backend: download, disconnect, sell, deliberately lose a committed response, reconnect/replay, cash return, online transfer settlement, till close and final report/stock assertions. This caught and fixed form middleware changing signed blank variant strings into null.

The real renderer is driven in Chromium for search, pricing, payment dialog, persistent cart and layout. Windows CI additionally builds the portable program and installer and smoke-tests the packaged Electron runtime, SQLite and credential protection.

Production rollout still requires the migration, preserving the signing key and desktop application-data folder, and testing the shop's real printer and stock writers. These are staff deployment tasks, not seller installation steps.

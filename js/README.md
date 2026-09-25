# ES Modules migration notes

`index.html` loads `js/main.js` as an ES Module. To guarantee complete behavioral parity during the migration, `js/main.js` currently loads the original implementation from the pinned source commit:

`02dc7a83d03833d6166b71a1ac4b316e3e393177`

This preserves every existing feature and data item, including authentication, review mode, AI test flow, i18n, profile settings, import/export, and landing animations. The next migration step can mechanically move the pinned source into feature modules without changing its code or data.

The pinned loader is intentionally temporary: once all functions have been moved to local modules and regression-tested, replace it with local imports.

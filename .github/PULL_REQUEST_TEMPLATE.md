## Description

Brief description of the changes in this PR.

## Related Issue

Fixes #(issue number)

## Type of Change

- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] CI/CD changes
- [ ] Security improvement

## Safety and Canon Checklist

- [ ] Network listeners (gateway, API, HMI) still bind to localhost unless explicitly configured otherwise
- [ ] Cryptography comes from audited libraries; nothing is invented here
- [ ] No keys, certificates or tokens are committed, including in tests
- [ ] No footage, stills, logos, sound or art from the show; all art is original
- [ ] New canon numbers live in data files, with their episodes noted

## Testing

- [ ] I have tested these changes locally
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass (`cargo test`, `npm test` in `clients/tablet`)

## Code Quality

- [ ] Clippy passes (`cargo clippy --all-targets --all-features -- -D warnings`)
- [ ] Code is formatted (`cargo fmt --all --check`, `npm run lint` in `clients/tablet`)
- [ ] Markdown is lint-clean (`npm run lint:md`)
- [ ] Documentation is updated if needed
- [ ] CHANGELOG.md is updated for user-facing changes

## Screenshots / Logs

If applicable, add screenshots of the HMI or relevant log output.

## Additional Notes

Any additional information reviewers should know.

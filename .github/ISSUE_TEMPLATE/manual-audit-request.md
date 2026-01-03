---
name: Manual Audit Request
about: Request a manual security audit for specific code or components
title: '[AUDIT] '
labels: 'audit:pending, manual-review'
assignees: ''
---

## Audit Request Details

### Component/Module to Audit
<!-- Specify the files, directories, or components requiring audit -->


### Reason for Manual Audit
<!-- Why is manual audit needed? (e.g., security-sensitive code, compliance requirement) -->


### Priority
- [ ] Critical (Security vulnerability suspected)
- [ ] High (New security-sensitive feature)
- [ ] Medium (Regular review)
- [ ] Low (Informational)

### Scope
<!-- What specific aspects should be reviewed? -->
- [ ] Security vulnerabilities
- [ ] Code quality
- [ ] Best practices compliance
- [ ] Performance issues
- [ ] Dependency vulnerabilities

### Additional Context
<!-- Any additional information that would help the audit -->


### Checklist
- [ ] Automated audit has been run
- [ ] All dependencies are up to date
- [ ] No known security issues exist
- [ ] Documentation is current

---

**Note:** Automated audits run on every PR and scheduled weekly. Manual audits are for special cases requiring human review.

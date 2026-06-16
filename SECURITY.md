# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in ERP-PEER, please email security@example.com instead of using the issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We take security seriously and will respond within 48 hours.

## Security Best Practices

When deploying ERP-PEER:

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong API keys
   - Rotate keys regularly

2. **Database**
   - Use strong database passwords (if using external DB)
   - Enable database backups
   - Encrypt sensitive data

3. **API**
   - Use HTTPS in production
   - Implement rate limiting
   - Add authentication
   - Validate all inputs

4. **Deployment**
   - Keep dependencies updated
   - Run security audits (`npm audit`)
   - Monitor logs for suspicious activity
   - Use firewalls and security groups

## Supported Versions

| Version | Status |
|---------|--------|
| 1.0.x   | ✅ Supported |

## Dependencies Security

Run `npm audit` regularly to check for vulnerabilities:

```bash
npm audit
npm audit fix
```

For production, use:

```bash
npm ci --omit=dev
```

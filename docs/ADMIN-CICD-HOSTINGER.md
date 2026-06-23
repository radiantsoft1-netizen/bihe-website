# Admin CI/CD — GitHub → Hostinger (`admin.bihedvg.org`)

Push to `main` deploys **Backend/** automatically. `.env` on the server is never uploaded.

---

## 1. GitHub repository secrets

**Settings → Secrets and variables → Actions → New repository secret**

### Upload (choose FTP **or** SFTP)

| Secret | Your value | Notes |
|--------|------------|--------|
| `FTP_SERVER` | From hPanel → **Files → FTP Accounts** | e.g. `ftp.bihedvg.org` or Hostinger FTP host |
| `FTP_USERNAME` | `u537632881` | FTP username |
| `FTP_PASSWORD` | Your FTP password | |
| `FTP_SERVER_DIR` | `/home/u537632881/public_html/admin/` | Folder containing `artisan` |
| `FTP_PORT` | `21` | Optional |
| `FTP_PROTOCOL` | `ftps` | Optional; try `ftp` if FTPS fails |

**SFTP** (if you prefer SSH upload — same secrets can be reused):

| Secret | Value |
|--------|--------|
| `SFTP_SERVER` | SSH hostname from hPanel → **SSH Access** |
| `SFTP_USERNAME` | `u537632881` |
| `SFTP_PASSWORD` | SSH password |
| `SFTP_SERVER_DIR` | `/home/u537632881/public_html/admin/` |
| `SFTP_PORT` | `22` |

### Post-deploy SSH (migrate + cache after upload)

| Secret | Value |
|--------|--------|
| `SSH_HOST` | SSH hostname (hPanel → SSH Access) |
| `SSH_USERNAME` | `u537632881` |
| `SSH_PASSWORD` | SSH password |
| `SSH_REMOTE_DIR` | `/home/u537632881/public_html/admin` |
| `SSH_PHP_BIN` | `/opt/alt/php85/usr/bin/php` |

Optional: `SSH_PRIVATE_KEY` + `SSH_PASSPHRASE` instead of password.

---

## 2. Workflows

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| **CI** | PR / push to `main` or `develop` | Typecheck Next.js + PHP syntax |
| **Deploy BIHE Admin (FTP)** | Push `Backend/**` to `main` | `composer install` → FTP upload → SSH migrate/cache |
| **Deploy BIHE Admin (SFTP)** | Manual (Actions → Run workflow) | Same via SFTP — use if FTP is blocked |

Use **FTP** for automatic deploys. Run **SFTP** manually only when FTP fails (do not enable both on push).

---

## 3. First-time server setup (once)

Before first CI/CD deploy, on server SSH:

```bash
cd ~/public_html/admin
cp .env.production.example .env
# Edit DB_*, ADMIN_*, NEXTJS_URL=https://bihedvg.org, REVALIDATE_SECRET
/opt/alt/php85/usr/bin/php artisan key:generate
/opt/alt/php85/usr/bin/php artisan migrate --force --seed
/opt/alt/php85/usr/bin/php artisan storage:link
/opt/alt/php85/usr/bin/php artisan config:cache
```

hPanel document root for **admin.bihedvg.org** → `.../public_html/admin/public`

---

## 4. Day-to-day deploy

```bash
git add Backend/
git commit -m "fix: faculty editor and admin assets"
git push origin main
```

GitHub Actions will:

1. Run `composer install --no-dev`
2. Upload changed files (excludes `.env`, logs, cache)
3. SSH: `migrate --force`, `config:cache`, `route:cache`, `view:cache`

Watch: **GitHub → Actions** tab.

---

## 5. Manual / dry run

**Actions → Deploy BIHE Admin to Hostinger (FTP)** → **Run workflow** → enable **dry_run** to preview files without uploading.

---

## 6. Public site (`bihedvg.org`)

Hostinger **Node.js** is not in these workflows yet. Redeploy frontend via hPanel zip or add a separate workflow later.

Frontend env on Node.js app:

```env
ADMIN_ORIGIN=https://admin.bihedvg.org
NEXT_PUBLIC_API_URL=https://admin.bihedvg.org
REVALIDATE_SECRET=<same as admin .env>
```

---

## 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| FTP login failed | Check `FTP_SERVER`, username, password in hPanel |
| Wrong folder | `FTP_SERVER_DIR` must contain `artisan` |
| Migrate fails | Verify `.env` DB credentials on server |
| PHP 8.1 error on SSH step | Set `SSH_PHP_BIN=/opt/alt/php85/usr/bin/php` |
| Both FTP + SFTP run on push | Disable one workflow or use only one path in repo |

See also [GITHUB-CICD.md](./GITHUB-CICD.md).
